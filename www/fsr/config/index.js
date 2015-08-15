;(function(){
'use-strict'


/**
 * For module level configuration.
 * @constructor
 * @param {object} $httpProvider
 */
function Config ($httpProvider) {
}

angular.module('config', [])
.config(['$httpProvider', Config])

})()
