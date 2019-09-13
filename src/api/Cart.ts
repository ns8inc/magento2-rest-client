import { RestClient } from '..';

export class Cart {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  static isNumeric(val) {
    return Number(parseFloat(val)).toString() === val;
  }

  create(customerToken, customerId = null) {
    if (customerId) {
      return this.restClient.post('/customers/' + customerId + '/carts', {}, customerToken);
    } else {
      if (customerToken) {
        return this.restClient.post('/carts/mine', {}, customerToken);
      } else {
        return this.restClient.post('/guest-carts');
      }
    }
  }
  update(customerToken, cartId, cartItem, adminRequest = false) {
    if (adminRequest) {
      return this.restClient.post('/carts/' + cartId + '/items/', {
        cartItem: cartItem
      });
    } else {
      if (customerToken && Cart.isNumeric(cartId)) {
        return this.restClient.post('/carts/mine/items', {
          cartItem: cartItem
        }, customerToken);
      } else {
        return this.restClient.post('/guest-carts/' + cartId + '/items', {
          cartItem: cartItem
        });
      }
    }
  }

  applyCoupon(customerToken, cartId, coupon, adminRequest = false) {
    if (adminRequest) {
      return this.restClient.put('/carts/' + cartId + '/coupons/' + coupon);
    } else {
      if (customerToken && Cart.isNumeric(cartId)) {
        return this.restClient.put('/carts/mine/coupons/' + coupon, null, customerToken);
      } else {
        return this.restClient.put('/guest-carts/' + cartId + '/coupons/' + coupon);
      }
    }
  }
  deleteCoupon(customerToken, cartId, adminRequest = false) {
    if (adminRequest) {
      return this.restClient.delete('/carts/' + cartId + '/coupons');
    } else {
      if (customerToken && Cart.isNumeric(cartId)) {
        return this.restClient.delete('/carts/mine/coupons', customerToken);
      } else {
        return this.restClient.delete('/guest-carts/' + cartId + '/coupons');
      }
    }
  }
  getCoupon(customerToken, cartId, adminRequest = false) {
    if (adminRequest) {
      return this.restClient.get('/carts/' + cartId + '/coupons');
    } else {
      if (customerToken && Cart.isNumeric(cartId)) {
        return this.restClient.get('/carts/mine/coupons', customerToken);
      } else {
        return this.restClient.get('/guest-carts/' + cartId + '/coupons');
      }
    }
  }
  delete(customerToken, cartId, cartItem, adminRequest = false) {
    if (adminRequest) {
      return this.restClient.delete('/carts/' + cartId + '/items/' + cartItem.item_id);
    } else {
      if (customerToken && Cart.isNumeric(cartId)) {
        return this.restClient.delete('/carts/mine/items/' + cartItem.item_id, customerToken);
      } else {
        return this.restClient.delete('/guest-carts/' + cartId + '/items/' + cartItem.item_id);
      }
    }
  }
  pull(customerToken, cartId, params, adminRequest = false) {
    if (adminRequest) {
      return this.restClient.get('/carts/' + cartId + '/items/');
    } else {
      if (customerToken && Cart.isNumeric(cartId)) {
        return this.restClient.get('/carts/mine/items', customerToken);
      } else {
        return this.restClient.get('/guest-carts/' + cartId + '/items/');
      }
    }
  }
  totals(customerToken, cartId, params, adminRequest = false) {
    if (adminRequest) {
      return this.restClient.get('/carts/' + cartId + '/totals/');
    } else {
      if (customerToken && Cart.isNumeric(cartId)) {
        return this.restClient.get('/carts/mine/totals', customerToken);
      } else {
        return this.restClient.get('/guest-carts/' + cartId + '/totals/');
      }
    }
  }

  billingAddress(customerToken, cartId, body, adminRequest = false) {
    if (adminRequest) {
      return this.restClient.post('/carts/' + cartId + '/billing-address', body);
    } else {
      if (customerToken && Cart.isNumeric(cartId)) {
        return this.restClient.post('/carts/mine/billing-address', body, customerToken);
      } else {
        return this.restClient.post('/guest-carts/' + cartId + '/billing-address', body);
      }
    }
  }

  shippingInformation(customerToken, cartId, body, adminRequest = false) {
    if (adminRequest) {
      return this.restClient.post('/carts/' + cartId + '/shipping-information', body);
    } else {
      if (customerToken && Cart.isNumeric(cartId)) {
        return this.restClient.post('/carts/mine/shipping-information', body, customerToken);
      } else {
        return this.restClient.post('/guest-carts/' + cartId + '/shipping-information', body);
      }
    }
  }

  order(customerToken, cartId, body, adminRequest = false) {
    if (adminRequest) {
      return this.restClient.put('/carts/' + cartId + '/order', body);
    } else {
      if (customerToken && Cart.isNumeric(cartId)) {
        return this.restClient.put('/carts/mine/order', body, customerToken);
      } else {
        return this.restClient.put('/guest-carts/' + cartId + '/order', body);
      }
    }
  }

  paymentInformationAndOrder(customerToken, cartId, body, adminRequest = false) {
    if (adminRequest) {
      return this.restClient.post('/carts/' + cartId + '/payment-information', body);
    } else {
      if (customerToken && Cart.isNumeric(cartId)) {
        return this.restClient.post('/carts/mine/payment-information', body, customerToken);
      } else {
        return this.restClient.post('/guest-carts/' + cartId + '/payment-information', body);
      }
    }
  }

  assign(cartId, userId, storeId = 0) {
    return this.restClient.put('/guest-carts/' + cartId, {
      customerId: userId,
      storeId: storeId
    })
  }

  shippingMethods(customerToken, cartId, address) {
    if (customerToken && Cart.isNumeric(cartId)) {
      return this.restClient.post('/carts/mine/estimate-shipping-methods', {
        address: address
      }, customerToken)
    } else {
      return this.restClient.post('/guest-carts/' + cartId + '/estimate-shipping-methods', {
        address: address
      })
    }
  }

  paymentMethods(customerToken, cartId) {
    if (customerToken && Cart.isNumeric(cartId)) {
      return this.restClient.get('/carts/mine/payment-methods', customerToken)
    } else {
      return this.restClient.get('/guest-carts/' + cartId + '/payment-methods')
    }
  }

  collectTotals(customerToken, cartId, shippingMethod) {
    if (customerToken && Cart.isNumeric(cartId)) {
      return this.restClient.put('/carts/mine/collect-totals', shippingMethod, customerToken)
    } else {
      return this.restClient.put('/guest-carts/' + cartId + '/collect-totals', shippingMethod)
    }
  }
}