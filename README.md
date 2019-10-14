# Magento2 REST client

This Node.js library enables JavaScript applications to communicate with Magento2 sites using their REST API.
This module based on [magento2-rest-client](https://github.com/DivanteLtd/magento2-rest-client), which is in turn based on the `magento2-rest-client` module created by Marko Novak (2016).

This module is used by the NS8 Protect Magento extension. It is safe for production use, but **NOTE: the library is not finished yet! Only a subset of Magento2 API is currently implemented. Not all methods are fully documented, and not all return types are fully typed.**

## Installation

The library can be installed using the Npm package manager:

```shell
yarn add @ns8/magento2-rest-client
```

## Usage

The code sample below shows the usage of the library:

```typescript
import { RestClient } from '@ns8/magento2-rest-client';

const options = {
  url: 'http://www.test.com/index.php/rest',
  consumerKey: '<OAuth 1.0a consumer key>',
  consumerSecret: '<OAuth 1.0a consumer secret>',
  accessToken: '<OAuth 1.0a access token>',
  accessTokenSecret: '<OAuth 1.0a access token secret>'
};
const client = new RestClient(options);
client.categories.list().then( (categories) => {
  assert.equal(categories.parentId, 1);
});
```

TODO: Allow extending the API by adding your own modules or adding methods to the existing modules!

## Contributing

Create issues or submit PRs to extend existing API support or add new functionality. All contributions are welcome.

### usefull resources

* Magento API with Swagger: https://devdocs.magento.com/swagger/
* Admin API Documentation of Magento: https://devdocs.magento.com/redoc/2.3/admin-rest-api.html
* Filtered responses: https://devdocs.magento.com/guides/v2.3/rest/retrieve-filtered-responses.html
