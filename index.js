'use strict';

const RestClient = require('./dist/core/RestClient.js').RestClient;

module.exports = require('./dist/index')

module.exports.Magento2Client = function (options) {
  var client = new RestClient(options);
  return client;
};