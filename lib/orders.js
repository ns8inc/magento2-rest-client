var util = require('util');

module.exports = function (restClient) {
    var module = {};

    /**
     *
     * @see https://devdocs.magento.com/guides/v2.3/rest/retrieve-filtered-responses.html
     * @see salesOrderRepositoryV1: GET /V1/orders/{id}
     *
     * @param oderId
     * @returns {Promise<{increment_id: String}>}
     */
    module.incrementIdById = function (oderId) {
        return restClient.get('/orders/' + oderId + '?fields=increment_id');
    }

    module.list = function (searchCriteria) {
        var query = 'searchCriteria=' + searchCriteria;
        var endpointUrl = util.format('/orders?%s', query);
        return restClient.get(endpointUrl);
    };

    module.get = function (orderId) {
        return restClient.get(util.format('/orders/%id', orderId));
    };

    return module;
}
