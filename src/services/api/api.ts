import axios, {AxiosInstance, AxiosResponse, AxiosRequestConfig} from 'axios';
// import { showToast } from '../helpers';
import AsyncHelper from '../../helpers/asyncHelper';
//import {API_URL} from '@env';

// import * as RootNavigation from '../navigation/NavigationService';
// import { QA } from './urls';

//console.log('API_URL', API_URL);
// http://127.0.0.1:8000/
// const baseURL = 'http://192.168.1.221:3000';
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
    this.client.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        const token = await AsyncHelper.getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({resolve, reject});
            })
              .then(token => {
                if (originalRequest.headers) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                return axios(originalRequest);
              })
              .catch(err => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;
          const refreshToken = '';
          // const refreshToken = await AsyncHelper.getRefreshToken();
          return this.refreshToken(refreshToken)
            .then(newToken => {
              // AsyncHelper.setToken(newToken);
              this.client.defaults.headers.Authorization = `Bearer ${newToken}`;
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
              }
              this.processQueue(null, newToken);
              return axios(originalRequest);
            })
            .catch(err => {
              this.processQueue(err, null);
              this.logout();
              // RootNavigation.resetActions('WelcomeScreen');
              return Promise.reject(err);
            })
            .finally(() => {
              this.isRefreshing = false;
            });
        }

        // showToast(error.response?.data?.message || 'An error occurred');
        return Promise.reject(error);
      },
    );
  }

  private processQueue(error: Error | null, token: string | null = null) {
    this.failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    this.failedQueue = [];
  }

  private async refreshToken(refreshToken: string): Promise<string> {
    const response: AxiosResponse<{accessToken: string}> = await axios.post(
      `${QA}/auth/refresh-token`,
      {
        refreshToken,
      },
    );
    return response.data.accessToken;
  }

  private async logout(): Promise<void> {
    await AsyncHelper.removeToken();
    // await AsyncHelper.removeRefreshToken();
    // await AsyncHelper.removeFCMToken();
    // await AsyncHelper.removeUserId();
  }

  private async addAuthToken(config: AxiosRequestConfig) {
    //const token = '';
    const token = await AsyncHelper.getToken();

    console.log('addAuthToken ', token);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  async get<T>(route: string, sendAuthToken = true): ApiResponse<T> {
    const config: AxiosRequestConfig = {headers: {}};
    if (sendAuthToken) {
      await this.addAuthToken(config);
    }
    return await this.client.get(route, config);
  }

  async post<T>(
    route: string,
    params: any,
    sendAuthToken = true,
    multipart = false,
  ): ApiResponse<T> {
    const config: AxiosRequestConfig = {
      headers: multipart
        ? {'Content-Type': 'multipart/form-data'}
        : {'Content-Type': 'application/json'},
    };
    if (sendAuthToken) {
      await this.addAuthToken(config);
    }
    return await this.client.post(route, params, config);
  }

  async put<T>(
    route: string,
    params: any,
    sendAuthToken = false,
  ): ApiResponse<T> {
    const config: AxiosRequestConfig = {
      headers: {'Content-Type': 'application/json'},
    };
    if (sendAuthToken) {
      await this.addAuthToken(config);
    }
    return await this.client.put(route, params, config);
  }

  async delete<T>(
    route: string,
    params: any,
    sendAuthToken = false,
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
