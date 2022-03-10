/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AbstractResponseDto {
  code: number;
  message: string;
  data: object;
}

export interface UserLoginResDto {
  /** 邮箱 */
  email: string;
  id: number;

  /** @format date-time */
  createAt: string;

  /** @format date-time */
  updateAt: string;

  /** @format date-time */
  deleteAt: string;

  /** 用户名 */
  username: string;

  /** 昵称 */
  nickname: string;

  /** 性别 */
  gender: 'male' | 'female';

  /** token */
  token: string;
}

export interface UserLoginReqDto {
  /** 用户名 */
  username: string;

  /** 密码 */
  password: string;
}

export interface UserInfo {
  /** 邮箱 */
  email: string;
  id: number;

  /** @format date-time */
  createAt: string;

  /** @format date-time */
  updateAt: string;

  /** @format date-time */
  deleteAt: string;

  /** 用户名 */
  username: string;

  /** 昵称 */
  nickname: string;

  /** 性别 */
  gender: 'male' | 'female';

  /** token */
  token: string;
}

export interface PaginatedDto {
  total: number;
  limit: number;
  offset: number;
  data: any[][];
}

export interface UserRegistryReqDto {
  /** 邮箱 */
  email: string;

  /** 用户名 */
  username: string;

  /** 密码 */
  password: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, ResponseType } from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      // @ts-ignore
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === 'object' && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      // @ts-ignore
      requestParams.headers.common = { Accept: '*/*' };
      // @ts-ignore
      requestParams.headers.post = {};
      // @ts-ignore
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
          ...(requestParams.headers || {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title Shuke example
 * @version 1.0
 * @contact
 *
 * The shuke API description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/`,
      method: 'GET',
      format: 'json',
      ...params,
    });

  user = {
    /**
     * No description
     *
     * @name UserControllerLogin
     * @summary 登录
     * @request POST:/user/login
     */
    userControllerLogin: (data: UserLoginReqDto, params: RequestParams = {}) =>
      this.request<AbstractResponseDto & { data?: UserLoginResDto }, any>({
        path: `/user/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerGetUserInfo
     * @summary 查询用户信息
     * @request GET:/user/info
     * @secure
     */
    userControllerGetUserInfo: (params: RequestParams = {}) =>
      this.request<AbstractResponseDto & { data?: UserInfo }, any>({
        path: `/user/info`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerGetUserList
     * @summary 查询用户列表
     * @request GET:/user/list
     * @secure
     */
    userControllerGetUserList: (params: RequestParams = {}) =>
      this.request<PaginatedDto & { data?: UserInfo[] }, any>({
        path: `/user/list`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerRegistry
     * @summary 注册
     * @request POST:/user/registry
     */
    userControllerRegistry: (data: UserRegistryReqDto, params: RequestParams = {}) =>
      this.request<AbstractResponseDto & { data?: UserInfo }, any>({
        path: `/user/registry`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
}
