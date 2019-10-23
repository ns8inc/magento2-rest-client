import 'jest';
import { RestClient, OrderState, OrderData, TransactionData } from '../src';
import * as fs from 'fs';
require('dotenv').config();

const options = {
  url: process.env.MAGENTO_URL || '',
  consumerKey: process.env.CONSUMER_KEY || '',
  consumerSecret: process.env.CONSUMER_SECRET || '',
  accessToken: process.env.ACCESS_TOKEN || '',
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
};
const client = new RestClient(options);
let allExistingOrders: OrderData;
let allExistingTransactions: TransactionData;

describe('functional test suite', () => {

  beforeAll(async (done) => {
    if (!fs.existsSync('test/mock_data')) fs.mkdirSync('test/mock_data');
    if (!fs.existsSync('test/mock_data/orders')) fs.mkdirSync('test/mock_data/orders');
    if (!fs.existsSync('test/mock_data/transactions')) fs.mkdirSync('test/mock_data/transactions');

    allExistingOrders = await client.orders.list();
    fs.writeFileSync('test/model_data/orders/orders.json', JSON.stringify(allExistingOrders, null, 2))
    console.log('Found all orders')

    allExistingTransactions = await client.transactions.list();
    fs.writeFileSync('test/model_data/transactions/transactions.json', JSON.stringify(allExistingTransactions, null, 2))
    console.log('Found all transactions')

    done();
  },30000);

  test('order hold test', async (done) => {
    const firstOrder = allExistingOrders.items[0];
    client.orders.hold(firstOrder.entity_id)
      .then((result) => {
        expect(result).toBeTruthy();
      })
      .then(done);
  });

  test('order comment test', async (done) => {
    const firstOrder = allExistingOrders.items[0];
    client.orders.postComment(firstOrder.entity_id, {
      comment: 'test comment',
      created_at: new Date(),
      status: OrderState.PAYMENT_REVIEW,
    }).then((result) => {
      expect(result).toBeTruthy();
    })
      .then(done);
  });

  test('order get test', (done) => {
    const firstOrder = allExistingOrders.items[0];
    client.orders.get(firstOrder.entity_id)
      .then((result) => {
        expect(result.entity_id).toBe(firstOrder.entity_id);
      })
      .then(done);
  });

  test('transaction get test', (done) => {
    const first = allExistingTransactions.items[0];
    client.transactions.getByTransactionId(first.txn_id)
      .then((result) => {
        expect(result.txn_id).toBe(first.txn_id);
      })
      .then(done);
  });

  test('customer get test', (done) => {
    client.customers.get(1)
      .then((result) => {
        expect(result.id).toBe(1);
      })
      .then(done);
  });

  test('address get test', (done) => {
    client.addresses.get(1)
      .then((result) => {
        expect(result.id).toBe(1);
      })
      .then(done);
  });

});