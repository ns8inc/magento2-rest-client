import 'jest';
import { RestClient, OrderState, OrderData, TransactionData } from '../src';
import * as fs from 'fs';
require('dotenv').config();

const execute = async () => {

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


  if (!fs.existsSync('test/mock_data')) fs.mkdirSync('test/mock_data');
  if (!fs.existsSync('test/mock_data/orders')) fs.mkdirSync('test/mock_data/orders');
  if (!fs.existsSync('test/mock_data/transactions')) fs.mkdirSync('test/mock_data/transactions');

  allExistingOrders = await client.orders.list();
  fs.writeFileSync('test/model_data/orders/orders.json', JSON.stringify(allExistingOrders, null, 2))
  console.log('Found all orders');

  allExistingTransactions = await client.transactions.list();
  fs.writeFileSync('test/model_data/transactions/transactions.json', JSON.stringify(allExistingTransactions, null, 2))
  console.log('Found all transactions');

  const firstOrder = allExistingOrders.items[0];

  const firstOrderById = await client.orders.get(firstOrder.entity_id);
  console.log('get order by id');

  // if (firstOrderById.state == OrderState.ON_HOLD) {
  //   await client.orders.unhold(firstOrder.entity_id);
  //   console.log('Hold order');
  // } else {
  //   await client.orders.hold(firstOrder.entity_id);
  //   console.log('Hold order');
  // }

  await client.orders.postComment(firstOrder.entity_id, {
    comment: 'test comment',
    created_at: new Date(),
    status: OrderState.PAYMENT_REVIEW,
  });
  console.log('order comment added');

  const first = allExistingTransactions.items[0];
  await client.transactions.getByTransactionId(first.txn_id);
  console.log('get transaction by id');
  await client.customers.get(1);
  console.log('get customer by id');
  await client.addresses.get(1);
  console.log('get address by id');
}
execute().then(() => {
  console.log('done');
} )