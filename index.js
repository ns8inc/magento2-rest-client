'use strict';

const RestClient = require('./dist/core/RestClient.js');

module.exports.Magento2Client = function (options) {
  var client = new RestClient.default(options);
  return client;
};