import {
  Logger,
  RestClientOptions,
  Addresses,
  Attributes,
  Categories,
  Products,
  ProductMedia,
  CategoryProducts,
  ConfigurableChildren,
  ConfigurableOptions,
  StockItems,
  TaxRates,
  TaxRules,
  Customers,
  Cart,
  Transactions,
  Directory,
  Reviews,
  Orders
} from '..';

const OAuth = require('oauth-1.0a');
const request = require('request');

const MAGENTO_API_VERSION = 'V1';

export class RestClient {
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
    this.logger = new Logger();

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

  public apiCall(request_data, request_token = ''): any {
    const options = {
      url: request_data.url,
      method: request_data.method,
      headers: request_token ? {
        'Authorization': 'Bearer ' + request_token
      } : this.oauth.toHeader(this.oauth.authorize(request_data, this.token)),
      json: true,
      body: request_data.body,
    };
    const ret = new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          this.logger.error('Error occured: ' + error);
          reject(error);
          return;
        } else if (!this.httpCallSucceeded(response)) {
          let errorMessage = 'HTTP ERROR ' + response.code;
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
    ret.catch((error) => {
      this.logger.error('Error occured: ' + error);
    });
    return ret;
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

  get(resourceUrl, request_token = '') {
    const request_data = {
      url: this.createUrl(resourceUrl),
      method: 'GET'
    };
    return this.apiCall(request_data, request_token);
  }

  createUrl(resourceUrl) {
    return this.serverUrl + '/' + this.apiVersion + resourceUrl;
  }

  post(resourceUrl, data = {}, request_token = '') {
    const request_data = {
      url: this.createUrl(resourceUrl),
      method: 'POST',
      body: data
    };
    return this.apiCall(request_data, request_token);
  }

  put(resourceUrl, data = {}, request_token = '') {
    const request_data = {
      url: this.createUrl(resourceUrl),
      method: 'PUT',
      body: data
    };
    return this.apiCall(request_data, request_token);
  }

  delete(resourceUrl, request_token = '') {
    const request_data = {
      url: this.createUrl(resourceUrl),
      method: 'DELETE'
    };
    return this.apiCall(request_data, request_token);
  }
}