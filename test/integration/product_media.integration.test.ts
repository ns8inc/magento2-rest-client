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

describe('product media test', () => {

  test('list product media test', (done) => {
    client.productMedia.list('test123')
      .then((productMedia) => {
        expect(productMedia.length > 0).toBe(true);
      })
      .then(done);
  });

  test('get product media test', (done) => {
    client.productMedia.get('test123', 15)
      .then((productMedia) => {
        expect(productMedia).toBeDefined();
      })
      .then(done);
  });

  test('create product media test', (done) => {
    var newProductMedia = {
      'entry': {
        'media_type': 'image',
        'label': 'Image',
        'position': 1,
        'disabled': false,
        'types': [
          'image',
          'small_image',
          'thumbnail'
        ],
        'file': '/m/b/mb01-blue-0.png',
        'content': {
          'base64EncodedData': 'iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWtJREFUeNpi/P//P8NgBkwMgxyMOnDUgTDAyMhIDNYF4vNA/B+IDwCxHLoakgEoFxODiQRXQUYi4e3k2gfDjMRajsP3zED8F8pmA+JvUDEYeArEMugOpFcanA/Ef6A0CPwC4uNoag5SnAjJjGI2tKhkg4rLAfFGIH4IxEuBWIjSKKYkDfZCHddLiwChVhokK8YGohwEZYy3aBmEKmDEhOCgreomo+VmZHxsMEQxIc2MAx3FO/DI3RxMmQTZkI9ALDCaSUYdOOrAIeRAPzQ+PxCHUM2FFDb5paGNBPRa5C20bUhxc4sSB4JaLnvxVHWHsbVu6OnACjyOg+HqgXKgGRD/JMKBoD6LDb0dyAPE94hwHAw/hGYcujlwEQmOg+EV9HJgLBmOg+FMWjsQVKR8psCBoDSrQqoDSSmoG6Hpj1wA6ju30LI9+BBX4UsC+Ai0T4BWVd1EIL5PgeO+APECmoXgaGtm1IE0AgABBgAJAICuV8dAUAAAAABJRU5ErkJggg==',
          'type': 'image/png',
          'name': 'new_image.png'
        }
      }
    };
    client.productMedia.create('test123', newProductMedia)
      .then((result) => {
        expect(result).toBeDefined();
      })
      .then(done);
  });

  test('update product test', (done) => {
    var productMediaUpdate = {
      'entry': {
        'id': 15,
        'label': 'Image updated',
      }
    };
    client.productMedia.update('test123', 15, productMediaUpdate)
      .then((result) => {
        expect(result).toBeDefined();
      })
      .then(done);
  });

  test('delete product test', (done) => {
    client.productMedia.delete('test123', 10)
      .then((result) => {
        expect(result).toBeTruthy();
      })
      .then(done);
  })
});
