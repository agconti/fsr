;(function(){
'use-strict'


/**
 * For module level configuration.
 * @constructor
 */
function Config (FS_CONFIG, RestangularProvider) {
  RestangularProvider.setBaseUrl(FS_CONFIG.host)
  RestangularProvider.setResponseExtractor(function(response) {
    return response.response
  })
}

angular.module('config', ['restangular'])
.config(['FS_CONFIG', 'RestangularProvider', Config])
})()
