import Logger from "./Logger";
const OAuth = require('oauth-1.0a');
const request = require('request');

export default class RestClient {
  public instance: any;
  public serverUrl: any;
  public apiVersion: any;
  public oauth: any;
  public token: any;
  public errorMessage: any;
  public logger: Logger;
  constructor(options) {
    this.instance = {};

    this.serverUrl = options.url;
    this.apiVersion = options.version;
    this.oauth = OAuth({
      consumer: {
        public: options.consumerKey,
        secret: options.consumerSecret
      },
      signature_method: 'HMAC-SHA1'
    });
    this.token = {
      public: options.accessToken,
      secret: options.accessTokenSecret
    };
    this.logger = new Logger();
  }
  apiCall(request_data, request_token = '') {
    const options = {
      url: request_data.url,
      method: request_data.method,
      headers: request_token ? {
        'Authorization': 'Bearer ' + request_token
      } : this.oauth.toHeader(this.oauth.authorize(request_data, this.token)),
      json: true,
      body: request_data.body,
    };
    console.log(options)
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          this.logger.error('Error occured: ' + error);
          reject(error);
          return;
        } else if (!this.httpCallSucceeded(response)) {
          var errorMessage = 'HTTP ERROR ' + response.code;
          if (body && body.hasOwnProperty('message'))
            errorMessage = this.errorString(body.message, body.hasOwnProperty('parameters') ? body.parameters : {});

          this.logger.error('API call failed: ' + errorMessage);
          reject({
            errorMessage,
            code: response.statusCode,
            toString: () => {
              return this.errorMessage
            }
          });
        }
        resolve(body);
      });
    });
  }

  consumerToken(login_data) {
    return this.apiCall({
      url: this.createUrl('/integration/customer/token'),
      method: 'POST',
      body: login_data
    })
  }

  httpCallSucceeded(response) {
    return response.statusCode >= 200 && response.statusCode < 300;
  }

  errorString(message, parameters) {
    if (parameters === null) {
      return message;
    }
    if (parameters instanceof Array) {
      for (var i = 0; i < parameters.length; i++) {
        var parameterPlaceholder = '%' + (i + 1).toString();
        message = message.replace(parameterPlaceholder, parameters[i]);
      }
    } else if (parameters instanceof Object) {
      for (var key in parameters) {
        var parameterPlaceholder = '%' + key;
        message = message.replace(parameterPlaceholder, parameters[key]);
      }
    }

    return message;
  }

  get(resourceUrl, request_token = '') {
    var request_data = {
      url: this.createUrl(resourceUrl),
      method: 'GET'
    };
    return this.apiCall(request_data, request_token);
  }

  createUrl(resourceUrl) {
    return this.serverUrl + '/' + this.apiVersion + resourceUrl;
  }

  post(resourceUrl, data = {}, request_token = '') {
    var request_data = {
      url: this.createUrl(resourceUrl),
      method: 'POST',
      body: data
    };
    return this.apiCall(request_data, request_token);
  }

  put(resourceUrl, data = {}, request_token = '') {
    var request_data = {
      url: this.createUrl(resourceUrl),
      method: 'PUT',
      body: data
    };
    return this.apiCall(request_data, request_token);
  }

  delete(resourceUrl, request_token = '') {
    var request_data = {
      url: this.createUrl(resourceUrl),
      method: 'DELETE'
    };
    return this.apiCall(request_data, request_token);
  }
}