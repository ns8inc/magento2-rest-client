export interface RestClientOptions {
  url: string,
  consumerKey: string;
  consumerSecret: string;
  accessToken: string;
  accessTokenSecret: string;
}

export interface RestApiOptions {
  url: string,
  method: string,
  headers: string,
  json: boolean,
  body?: any
}

export interface RestApiStackTraces {
  inner: string,
  outer: string
}