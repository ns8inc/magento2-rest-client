import { Customer, RestClient } from '..';
const util = require('util');

export class Customers {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  create(customerData) {
    return this.restClient.post('/customers', customerData);
  }

  async get(customerId: number): Promise<Customer> {
    const endpointUrl = util.format('/customers/%d', customerId);
    const order = await this.restClient.get(endpointUrl);
    return order;
  };

  token(loginData) {
    return this.restClient.consumerToken(loginData);
  }

  me(requestToken) {
    return this.restClient.get('/customers/me', requestToken);
  }
  orderHistory(requestToken) {
    return this.restClient.get('/customers/me', requestToken).then((result: any) => {
      const query = 'searchCriteria=&searchCriteria[filterGroups][0][filters][0][field]=customer_email&' +
        'searchCriteria[filterGroups][0][filters][0][value]=' + encodeURIComponent(result.email) + '&' +
        'searchCriteria[filterGroups][0][filters][0][condition_type]=eq&searchCriteria[pageSize]=20&' +
        'searchCriteria[sortOrders][0][field]=entity_id&searchCriteria[sortOrders][0][direction]=desc';
      const endpointUrl = util.format('/orders?%s', query);
      return this.restClient.get(endpointUrl);
    })
  }
  resetPassword(emailData) {
    return this.restClient.put('/customers/password', emailData)
  }

  resetPasswordUsingResetToken(resetPasswordData) {
    return this.restClient.post('/customers/resetPassword', resetPasswordData)
  }

  update(userData) {
    return this.restClient.put('/customers/me', userData.body, userData.token)
  }

  changePassword(passwordData) {
    return this.restClient.put('/customers/me/password', passwordData.body, passwordData.token)
  }
}