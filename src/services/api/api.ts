// src/services/api/api.ts

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import AsyncHelper from '../../helpers/asyncHelper';
import { BASE_URL } from '../utils/urls';
// We import the type for logout
import type { AuthLogoutHandler } from '../../context/AuthContext';

const QA = `${BASE_URL}/`;

/** A function pointer we store for when we must forcibly log out user. */
let authLogoutHandler: AuthLogoutHandler | null = null;

export function setAuthLogoutHandler(fn: AuthLogoutHandler) {
  authLogoutHandler = fn;
}

class Api {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: any) => void;
  }> = [];

  constructor() {
    this.client = axios.create({
      baseURL: QA,
      headers: { Accept: 'application/json' },
    });
    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    // 1) Request Interceptor
    this.client.interceptors.request.use(
      async (config) => {
        const token = await AsyncHelper.getToken();
        const guestId = await AsyncHelper.getGuestId();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else if (guestId) {
          config.headers['Guest-Id'] = guestId;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // 2) Response Interceptor
    this.client.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        const status = error?.response?.status;
        const originalRequest = error.config || {};

        // If 401 or 403 => attempt one refresh
        if ((status === 401 || status === 403) && !originalRequest._retry) {
          originalRequest._retry = true;

          // If we're already refreshing => queue up
          if (this.isRefreshing) {
            try {
              const newToken = await new Promise<string | null>((resolve, reject) => {
                this.failedQueue.push({ resolve, reject });
              });
              if (newToken) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return this.client(originalRequest);
              } else {
                throw new Error('No new token from queue');
              }
            } catch (queueErr) {
              return Promise.reject(queueErr);
            }
          }

          this.isRefreshing = true;
          try {
            const newToken = await this.handleRefresh();
            // If refresh succeeded => re-send
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              this.processQueue(null, newToken);
              return this.client(originalRequest);
            }
          } catch (refreshErr) {
            this.processQueue(refreshErr as Error, null);
            // Fall through => logout
          } finally {
            this.isRefreshing = false;
          }
          // If we get here => refresh failed => logout
          if (authLogoutHandler) {
            authLogoutHandler(); // This calls clearAuth in your context
          }
          return Promise.reject(error);
        }

        return Promise.reject(error);
      },
    );
  }

  // Where we call the refresh endpoint, once
  // Update the handleRefresh function
  private async handleRefresh(): Promise<string | null> {
    try {
      const refreshToken = await AsyncHelper.getRefreshToken();
      if (!refreshToken) {
        console.log('[Api] No refresh token available');
        return null;
      }
  
      const response = await axios.post<{ 
        access: string,
        refresh: string // Now expecting both tokens
      }>(
        `${QA}account/user/refresh-token/`,
        { refresh: refreshToken },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      // Store both tokens
      await AsyncHelper.setToken(response.data.access);
      await AsyncHelper.setRefreshToken(response.data.refresh);
  
      return response.data.access;
    } catch (error) {
      console.error('[Api] Refresh failed:', error);
      return null;
    }
  }

  private processQueue(error: Error | null, newToken: string | null) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(newToken);
      }
    });
    this.failedQueue = [];
  }

  // Example GET / POST / PUT / DELETE
  async get<T>(route: string): Promise<T> {
    return this.client.get<T>(route);
  }

  async post<T>(route: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.post<T>(route, params, config);
  }

  // -------------------------
  // Newly added .put() method
  // -------------------------
  async put<T>(route: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.put<T>(route, data, config);
  }

  // ----------------------------
  // Newly added .delete() method
  // ----------------------------
  async delete<T>(route: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete<T>(route, config);
  }
}

// Export the instance
const apiInstance = new Api();
export default apiInstance;
