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


  if (!fs.existsSync('test/model_data')) fs.mkdirSync('test/model_data');
  if (!fs.existsSync('test/model_data/orders')) fs.mkdirSync('test/model_data/orders');
  if (!fs.existsSync('test/model_data/orders/comments')) fs.mkdirSync('test/model_data/orders/comments');
  if (!fs.existsSync('test/model_data/transactions')) fs.mkdirSync('test/model_data/transactions');


  //const firstOrderById = await client.orders.get(107);
  console.log('get order by id');

  const firstOrderByIncId = await client.post('/Protect/score/118/2');
  console.log(firstOrderByIncId)
}
execute().then(() => {
  console.log('done');
} )