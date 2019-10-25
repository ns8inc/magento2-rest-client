export interface RestClientOptions {
  accessToken: string;
  accessTokenSecret: string;
  consumerKey: string;
  consumerSecret: string;
  logLevel?: RestLogLevel
  url: string,
}

export interface RestApiHeaders {
  Authorization: string
}

export enum RestLogLevel {
  ERROR = 'error',
  INFO = 'info',
  NONE = 'none',
}

export interface RestApiOptions {
  body?: any
  headers: RestApiHeaders,
  json: boolean,
  logLevel?: RestLogLevel
  method: string,
  url: string,
}

export interface RestApiStackTraces {
  inner: string,
  outer: string
}

export interface RestApiError {
  apiOptions: RestApiOptions,
  message: string,
  name: string,
  outerStack: string,
  stack: string,
  statusCode: number,
  statusMessage: string,
  url: string
}