import * as createError from 'http-errors';
import * as StackTracey from 'stacktracey';
import {
  Addresses,
  Attributes,
  Cart,
  Categories,
  CategoryProducts,
  ConfigurableChildren,
  ConfigurableOptions,
  Customers,
  Directory,
  Logger,
  Orders,
  ProductMedia,
  Products,
  RestApiError,
  RestApiOptions,
  RestApiStackTraces,
  RestClientOptions,
  RestLogLevel,
  Reviews,
  StockItems,
  TaxRates,
  TaxRules,
  Transactions
  } from '..';
import { IncomingMessage } from 'http';


const OAuth = require('oauth-1.0a');
const request = require('request');

const MAGENTO_API_VERSION = 'V1';

export class RestClient {
  private logLevel: RestLogLevel;

  public addresses: Addresses;
  public apiVersion: any;
  public attributes: Attributes;
  public cart: Cart;
  public categories: Categories;
  public categoryProducts: CategoryProducts;
  public configurableChildren: ConfigurableChildren;
  public configurableOptions: ConfigurableOptions;
  public customers: Customers;
  public directory: Directory;
  public errorMessage: any;
  public instance: any;
  public logger: Logger;
  public oauth: any;
  public orders: Orders;
  public productMedia: ProductMedia;
  public products: Products;
  public reviews: Reviews;
  public serverUrl: any;
  public stockItems: StockItems;
  public taxRates: TaxRates;
  public taxRules: TaxRules;
  public token: any;
  public transactions: Transactions;

  constructor(options: RestClientOptions) {
    this.serverUrl = options.url;
    this.apiVersion = MAGENTO_API_VERSION;
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
    this.logLevel = options.logLevel || RestLogLevel.NONE;
    this.logger = new Logger(this.logLevel);

    this.addresses = new Addresses(this);
    this.attributes = new Attributes(this);
    this.cart = new Cart(this);
    this.categories = new Categories(this);
    this.categoryProducts = new CategoryProducts(this);
    this.configurableChildren = new ConfigurableChildren(this);
    this.configurableOptions = new ConfigurableOptions(this);
    this.customers = new Customers(this);
    this.directory = new Directory(this);
    this.orders = new Orders(this);
    this.productMedia = new ProductMedia(this);
    this.products = new Products(this);
    this.reviews = new Reviews(this);
    this.stockItems = new StockItems(this);
    this.taxRates = new TaxRates(this);
    this.taxRules = new TaxRules(this);
    this.transactions = new Transactions(this);
  }

  public get(resourceUrl, request_token = '') {
    const request_data = {
      url: this.createUrl(resourceUrl),
      method: 'GET'
    };
    return this.apiCall(request_data, request_token);
  }

  public post(resourceUrl, data = {}, request_token = '') {
    const request_data = {
      url: this.createUrl(resourceUrl),
      method: 'POST',
      body: data
    };
    return this.apiCall(request_data, request_token);
  }

  public put(resourceUrl, data = {}, request_token = '') {
    const request_data = {
      url: this.createUrl(resourceUrl),
      method: 'PUT',
      body: data
    };
    return this.apiCall(request_data, request_token);
  }

  public delete(resourceUrl, request_token = '') {
    const request_data = {
      url: this.createUrl(resourceUrl),
      method: 'DELETE'
    };
    return this.apiCall(request_data, request_token);
  }

  public consumerToken(login_data) {
    return this.apiCall({
      url: this.createUrl('/integration/customer/token'),
      method: 'POST',
      body: login_data
    })
  }

  private apiCall(request_data, request_token = ''): any {
    const options: RestApiOptions = {
      url: request_data.url,
      method: request_data.method,
      headers: request_token ? {
        'Authorization': 'Bearer ' + request_token
      } : this.oauth.toHeader(this.oauth.authorize(request_data, this.token)),
      json: true,
      body: request_data.body,
    };
    const innerStack = new StackTracey().pretty;
    const ret = new Promise((resolve, reject) => {
      request(options, (error, response: IncomingMessage, body) => {
        if (error || !this.httpCallSucceeded(response)) {
          const outerStack = new StackTracey().pretty;
          const e = this.createApiError(options, response, body, { inner: innerStack, outer: outerStack }, error);
          reject(e);
          return;
        } else {
          resolve(body);
        }
      });
    });
    return ret;
  }

  private httpCallSucceeded(response: IncomingMessage): boolean {
    if (response && response.statusCode) {
      return response.statusCode >= 200 && response.statusCode < 300;
    } else {
      return false;
    }
  }

  private errorString(message, parameters): string {
    if (parameters === null) {
      return message;
    }
    if (parameters instanceof Array) {
      for (let i = 0; i < parameters.length; i++) {
        const parameterPlaceholder = '%' + (i + 1).toString();
        message = message.replace(parameterPlaceholder, parameters[i]);
      }
    } else if (parameters instanceof Object) {
      for (let key in parameters) {
        const parameterPlaceholder = '%' + key;
        message = message.replace(parameterPlaceholder, parameters[key]);
      }
    }
    return message;
  }

  private createApiError(options: RestApiOptions, response: IncomingMessage, body: any, stackTraces: RestApiStackTraces, error?: any): RestApiError {
    let errorMessage = 'MAGENTO API ERROR';
    if (error) {
      errorMessage += ': ' + error.message;
    } else {
      errorMessage += ': ' + response.statusCode;
      if (body && body.hasOwnProperty('message'))
        errorMessage += ': ' + this.errorString(body.message, body.hasOwnProperty('parameters') ? body.parameters : {});
    }
    const statusCode = response.statusCode || 400;
    const httpError = createError(statusCode, errorMessage, {
      apiOptions: options,
      outerStack: stackTraces.outer,
      stack: stackTraces.inner,
      statusCode: response.statusCode,
      statusMessage: response.statusMessage,
      url: response.url,
    });
    this.logger.error('API call failed: ' + errorMessage, httpError as Error);
    return httpError as unknown as RestApiError;
  }

  private createUrl(resourceUrl) {
    return this.serverUrl + '/' + this.apiVersion + resourceUrl;
  }
}