const app = require('../dist/app');
const RestClient = app.RestClient;
const fs = require('fs');
require('dotenv').config();

const options = {
    url: process.env.MAGENTO_URL || '',
    consumerKey: process.env.CONSUMER_KEY || '',
    consumerSecret: process.env.CONSUMER_SECRET || '',
    accessToken: process.env.ACCESS_TOKEN || '',
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
};
const client = new RestClient(options);

if(!fs.existsSync('test/model_data')) fs.mkdirSync('test/model_data');
if(!fs.existsSync('test/model_data/orders')) fs.mkdirSync('test/model_data/orders');
if(!fs.existsSync('test/model_data/transactions')) fs.mkdirSync('test/model_data/transactions');

client.orders.list()
  .then(function (data) {
    try {
      fs.writeFileSync('test/model_data/orders/orders.json', JSON.stringify(data, null, 2))
      console.log('Found all orders')
      data.items.forEach((item) => {
        try {
          client.orders.get(item.entity_id)
            .then(function (data) {
              fs.writeFileSync(`test/model_data/orders/order_${item.entity_id}.json`, JSON.stringify(data, null, 2))
            })
        } catch (e) {
          console.error(e);
        }
      })
    } catch (e) {
      console.error(e);
    }
  })
client.transactions.list()
  .then(function (data) {
    try {
      fs.writeFileSync('test/model_data/transactions/transactions.json', JSON.stringify(data, null, 2))
      console.log('Found all transactions')
      data.items.forEach((item) => {
        try {
          client.transactions.getByTransactionId(item.txn_id)
            .then(function (data) {
              fs.writeFileSync(`test/model_data/transactions/transaction_${item.transaction_id}.json`, JSON.stringify(data, null, 2))
            })
        } catch (e) {
          console.error(e);
        }
      })
    } catch (e) {
      console.error(e);
    }
  })
client.customers.get(1)
  .then(function (data) {
    fs.writeFileSync('test/model_data/customer_1.json', JSON.stringify(data, null, 2))
    console.log('Found customer')
  })
client.addresses.get(1)
  .then(function (data) {
    fs.writeFileSync('test/model_data/address_1.json', JSON.stringify(data, null, 2))
    console.log('Found address')
  })