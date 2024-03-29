import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { stringify } from "query-string";
import { ApiError, ApiRequestConfig, ApiResponse, ErrorType } from "./types";

export const baseUrl = "http://auto-sale.force-dev.ru";

export class ApiService {
  private instance: AxiosInstance | null = null;
  private raceConditionMap: Map<string, AbortController> = new Map();

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create({
      timeout: 20000,
      withCredentials: true,
      ...config,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...config?.headers,
      },
    });

    this.instance.interceptors.response.use(
      response => ({ data: response }),
      error => {
        if (IS_DEVELOPMENT) {
          console.group("AXIOS ERROR INTERCEPT LOG");
          console.log("ERROR --> ", error);
          console.log("STRINGIFY ERROR --> ", JSON.stringify(error));
          console.groupEnd();
        }
        if (error && error?.message !== "canceled") {
          return Promise.resolve({
            data: {
              error: (error?.message ||
                error?.response?.data?.error ||
                error?.response?.data ||
                new ApiError(
                  500,
                  ErrorType.ServerErrorException,
                  error?.message,
                )) as ApiError,
            },
          });
        }

        return Promise.resolve({ data: {} });
      },
    );
  }

  public async get<R = any, P = any>(
    endpoint: string,
    params?: P,
    config?: ApiRequestConfig,
  ) {
    const query = params && stringify(params);

    const response = await this.instance!.get<ApiResponse<R>>(
      endpoint + (query ? `?${query}` : ""),
      {
        ...config,
        ...(config?.useRaceCondition ? this.raceCondition(endpoint) : {}),
        headers: {
          ...axios.defaults.headers.common,
          ...config?.headers,
        },
      },
    );

    return response.data as ApiResponse<R>;
  }

  public async post<R = any, P = any>(
    endpoint: string,
    params?: P,
    config?: ApiRequestConfig,
  ) {
    const response = await this.instance!.post<ApiResponse<R>>(
      endpoint,
      params,
      {
        ...config,
        ...(config?.useRaceCondition ? this.raceCondition(endpoint) : {}),
      },
    );

    return response.data as ApiResponse<R>;
  }

  public async patch<R = any, P = any>(
    endpoint: string,
    params?: P,
    config?: ApiRequestConfig,
  ) {
    const response = await this.instance!.patch<ApiResponse<R>>(
      endpoint,
      params,
      {
        ...config,
        ...(config?.useRaceCondition ? this.raceCondition(endpoint) : {}),
      },
    );

    return response.data as ApiResponse<R>;
  }

  public async put<R = any, P = any>(
    endpoint: string,
    params?: P,
    config?: ApiRequestConfig,
  ) {
    const response = await this.instance!.put<ApiResponse<R>>(
      endpoint,
      params,
      {
        ...config,
        ...(config?.useRaceCondition ? this.raceCondition(endpoint) : {}),
      },
    );

    return response.data as ApiResponse<R>;
  }

  public async delete<R = any>(endpoint: string, config?: ApiRequestConfig) {
    const response = await this.instance!.delete<ApiResponse<R>>(endpoint, {
      ...config,
      ...(config?.useRaceCondition ? this.raceCondition(endpoint) : {}),
    });

    return response.data as ApiResponse<R>;
  }

  private raceCondition(endpoint: string) {
    const controller = new AbortController();

    if (this.raceConditionMap.has(endpoint)) {
      this.raceConditionMap.get(endpoint)?.abort();
      this.raceConditionMap.delete(endpoint);
    }
    this.raceConditionMap.set(endpoint, controller);

    return controller;
  }
}

export const apiService = new ApiService({
  baseURL:
    IS_DEVELOPMENT && typeof window === "object" ? "/api" : `${baseUrl}/api/`,
});
