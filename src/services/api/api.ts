import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncHelper from '../../helpers/asyncHelper';

const QA = 'http://127.0.0.1:8000/';

type ApiResponse<T> = Promise<AxiosResponse<T>>;

class Api {
  private client: AxiosInstance;
  private isRefreshing: boolean;
  private failedQueue: Array<{ resolve: (value: unknown) => void; reject: (reason?: any) => void }>;

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
    this.client.interceptors.request.use(
      async (config) => {
        const token = await AsyncHelper.getToken();
        const guestId = await AsyncHelper.getGuestId();

        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        } else if (guestId) {
          config.headers['Guest-Id'] = guestId;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response.data,  // Only return response.data to simplify processing in the hooks
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                return this.client(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          this.isRefreshing = true;
          const refreshToken = await AsyncHelper.getRefreshToken();
          if (!refreshToken) {
            await this.logout();
            return Promise.reject(error);
          }

          return this.refreshToken(refreshToken)
            .then((newToken) => {
              originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
              this.processQueue(null, newToken);
              return this.client(originalRequest);
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

        if (error.response?.status === 404) {
          console.error('API Endpoint not found:', originalRequest.url);
        }

        return Promise.reject(error);
      }
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
      const response = await this.client.post<{ accessToken: string }>(
        `${QA}auth/refresh-token`,
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

  private async logout() {
    await AsyncHelper.removeToken();
    await AsyncHelper.removeRefreshToken();
    await AsyncHelper.removeGuestId();
    console.log('Logged out due to failed refresh token.');
  }

  async get<T>(route: string, sendAuthToken = true): ApiResponse<T> {
    const config: AxiosRequestConfig = { headers: {} };
    if (sendAuthToken) {
      await this.addAuthToken(config);
    }
    return this.client.get(route, config);
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
    return this.client.post(route, params, config);
  }

  private async addAuthToken(config: AxiosRequestConfig) {
    const token = await AsyncHelper.getToken();
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
}

export default new Api();
