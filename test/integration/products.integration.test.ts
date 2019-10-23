import 'jest';
import {
  RestClient
} from '../../src';
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

beforeAll(() => {
  if (!fs.existsSync('test/mock_data')) fs.mkdirSync('test/mock_data');
  if (!fs.existsSync('test/mock_data/orders')) fs.mkdirSync('test/mock_data/orders');
  if (!fs.existsSync('test/mock_data/transactions')) fs.mkdirSync('test/mock_data/transactions');
});

describe('product test', () => {

  test('list products test', (done) => {
    client.products.list('Test')
      .then((products) => {
        expect(products.totalCount > 0).toBe(true);
      })
      .then(done);
  });

  test('create product test', (done) => {
    var newProduct = {
      product: {
        'sku': 'test123',
        'name': 'Integration test product',
        'typeId': 'simple',
        'price': 12.3,
        'attributeSetId': 4,
        'status': 1,
        'visibility': 4,
      }
    };
    client.products.create(newProduct)
      .then((result) => {
        expect(result.name).toBe('Integration test product');
      })
      .then(done);
  });

  test('update product test', (done) => {
    var productUpdate = {
      product: {
        'sku': 'test123',
        'name': 'Integration test product updated',
        'typeId': 'simple',
        'price': 12.3,
        'attributeSetId': 4,
        'status': 1,
        'visibility': 4,
      }
    };
    client.products.update('test123', productUpdate)
      .then((result) => {
        expect(result.name).toBe('Integration test product updated');
      })
      .then(done);
  });

  test('delete product test', (done) => {
    client.products.delete(23)
      .then((result) => {
        expect(result).toBe(true);
      })
      .then(done);
  })
});