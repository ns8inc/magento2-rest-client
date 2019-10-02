const app = require('../dist/app');
const RestClient = app.RestClient;
const fs = require('fs');

const options = {
  url: 'http://dev-cfroehlich.ns8demos.com/index.php/rest',
  consumerKey: 'm9aj4z9q6b6z0ss708pvoxch22wkbqse',
  consumerSecret: 'c1k1l4ayzum511141ylk6w9qfkhtka7h',
  accessToken: '0xfw294s73dh8yo5ewoe3p18jofhicpf',
  accessTokenSecret: 'auroj9em9i196hy7d1uzyqini8gdtmet'
};
const client = new RestClient(options);

client.orders.list()
  .then(function (data) {
    try {
      fs.writeFileSync('test/model_data/orders/orders.json', JSON.stringify(data, null, 2))
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
  })
client.addresses.get(1)
  .then(function (data) {
    fs.writeFileSync('test/model_data/address_1.json', JSON.stringify(data, null, 2))
  })