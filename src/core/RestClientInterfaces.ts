export interface RestClientOptions {
  accessToken: string;
  accessTokenSecret: string;
  consumerKey: string;
  consumerSecret: string;
  url: string,
}

export interface RestApiHeaders {
  Authorization: string
}

export interface RestApiOptions {
  body?: any
  headers: RestApiHeaders,
  json: boolean,
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