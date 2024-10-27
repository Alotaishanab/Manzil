// src/services/api.ts

import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import AsyncHelper from '../../helpers/asyncHelper';
import { getGuestId } from '../../helpers/guestHelper'; // Correctly import getGuestId

const QA = 'http://127.0.0.1:8000/'; // Set your QA base URL

type ApiResponse<T> = Promise<AxiosResponse<T>>;

class Api {
  private client: AxiosInstance;
  private isRefreshing: boolean;
  private failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: any) => void;
  }>;

  constructor() {
    this.client = axios.create({
      baseURL: QA,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.isRefreshing = false;
    this.failedQueue = [];
    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                if (originalRequest.headers) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                return axios(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          const refreshToken = await AsyncHelper.getRefreshToken();
          if (!refreshToken) {
            console.warn('No refresh token available.');
            this.logout();
            return Promise.reject(error);
          }

          return this.refreshToken(refreshToken)
            .then((newToken) => {
              this.client.defaults.headers.Authorization = `Bearer ${newToken}`;
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              this.processQueue(null, newToken);
              return axios(originalRequest);
            })
            .catch((err) => {
              this.processQueue(err, null);
              this.logout();
              return Promise.reject(err);
            })
            .finally(() => {
              this.isRefreshing = false;
            });
        }

        return Promise.reject(error);
      }
    );

    this.client.interceptors.request.use(
      async (config) => {
        const token = await AsyncHelper.getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        } else {
          const guestId = await getGuestId(); // Use getGuestId as a function
          if (guestId) {
            config.headers['Guest-Id'] = guestId;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  private processQueue(error: Error | null, token: string | null = null) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    this.failedQueue = [];
  }

  private async refreshToken(refreshToken: string): Promise<string> {
    try {
      const response: AxiosResponse<{ accessToken: string }> = await axios.post(
        `${QA}auth/refresh-token`, // Ensure no double slashes
        { refreshToken }
      );

      const newAccessToken = response.data.accessToken;
      if (newAccessToken) {
        await AsyncHelper.setToken(newAccessToken);
      }

      return newAccessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  private async logout(): Promise<void> {
    await AsyncHelper.removeToken();
    await AsyncHelper.removeRefreshToken();
    console.log('User logged out due to failed refresh token.');
  }

  private async addAuthToken(config: AxiosRequestConfig) {
    const token = await AsyncHelper.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  async get<T>(route: string, sendAuthToken = true): ApiResponse<T> {
    const config: AxiosRequestConfig = { headers: {} };
    if (sendAuthToken) {
      await this.addAuthToken(config);
    }
    return await this.client.get(route, config);
  }

  async post<T>(
    route: string,
    params: any,
    sendAuthToken = true,
    multipart = false
  ): ApiResponse<T> {
    const config: AxiosRequestConfig = {
      headers: multipart
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' },
    };
    if (sendAuthToken) {
      await this.addAuthToken(config);
    }
    return await this.client.post(route, params, config);
  }

  async put<T>(
    route: string,
    params: any,
    sendAuthToken = false
  ): ApiResponse<T> {
    const config: AxiosRequestConfig = {
      headers: { 'Content-Type': 'application/json' },
    };
    if (sendAuthToken) {
      await this.addAuthToken(config);
    }
    return await this.client.put(route, params, config);
  }

  async delete<T>(
    route: string,
    params: any,
    sendAuthToken = false
  ): ApiResponse<T> {
    const config: AxiosRequestConfig = {
      data: params,
      headers: {},
    };
    if (sendAuthToken) {
      await this.addAuthToken(config);
    }
    return await this.client.delete(route, config);
  }
}

export default new Api();
