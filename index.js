'use strict';

const RestClient = require('./dist/core/RestClient.js');
const MAGENTO_API_VERSION = 'V1';

const Attributes = require('./dist/api/Attributes');
const Categories = require('./dist/api/Categories');
const Products = require('./dist/api/Products');
const ProductMedia = require('./dist/api/ProductMedia');
const CategoryProducts = require('./dist/api/CategoryProducts');
const ConfigurableChildren = require('./dist/api/ConfigurableChildren');
const ConfigurableOptions = require('./dist/api/ConfigurableOptions');
const StockItems = require('./dist/api/StockItems');
const TaxRates = require('./dist/api/TaxRates');
const TaxRules = require('./dist/api/TaxRules');
const Customers = require('./dist/api/Customers');
const Cart = require('./dist/api/Cart');
const Transactions = require('./dist/api/Transactions');
const Directory = require('./dist/api/Directory');
const Reviews = require('./dist/api/Reviews');
const Orders = require('./dist/api/Orders');

module.exports.Magento2Client = function (options) {
  options.version = MAGENTO_API_VERSION;
  var client = new RestClient.default(options);
  client.attributes = new Attributes.default(client);
  client.categories = new Categories.default(client);
  client.products = new Products.default(client);
  client.productMedia = new ProductMedia.default(client);
  client.categoryProducts = new CategoryProducts.default(client);
  client.configurableChildren = new ConfigurableChildren.default(client);
  client.configurableOptions = new ConfigurableOptions.default(client);
  client.stockItems = new StockItems.default(client);
  client.taxRates = new TaxRates.default(client);
  client.taxRules = new TaxRules.default(client);
  client.customers = new Customers.default(client);
  client.cart = new Cart.default(client);
  client.orders = new Orders.default(client);
  client.transactions = new Transactions.default(client);
  client.directory = new Directory.default(client);
  client.reviews = new Reviews.default(client);
  return client;
};