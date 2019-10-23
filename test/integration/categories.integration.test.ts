import 'jest';
import { RestClient } from '../../src';
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

describe('category integration test', () => {

  test('list categories test', (done) => {
    client.categories.list()
      .then((categories) => {
        expect(categories.parentId).toBe(1);
      })
      .then(done);
  });

  test('create category test', (done) => {
    var newCategory = {
      category: {
        parentId: 3,
        name: 'Category from integration test',
        isActive: true,
        includeInMenu: true,
      }
    };
    client.categories.create(newCategory)
      .then((result) => {
        expect(result.parentId).toBe(3);
      })
      .then(done);
  });

  test('update category test', (done) => {
    var categoryUpdate = {
      category: {
        parentId: 3,
        name: 'Podkategorija 1 updated',
        isActive: true,
        includeInMenu: true,
      }
    };
    client.categories.update(4, categoryUpdate)
      .then((result) => {
        expect(result.parentId).toBe(3);
      })
      .then(done);
  });

  test('delete category test', (done) => {
    client.categories.delete(23)
      .then((result) => {
        expect(result).toBe(true);
      })
      .then(done);
  })
});
