const RestClient = require('../dist/core/RestClient').RestClient;
const fs = require('fs');

const options = {
  url: 'http://url/index.php/rest',
  consumerKey: '',
  consumerSecret: '',
  accessToken: '',
  accessTokenSecret: ''
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