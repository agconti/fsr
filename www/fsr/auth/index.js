;(function(){
'use strict'


/**
 * App level configuration
 * @constructor
 */
function config ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('auth', {
      url: '/auth'
    , templateUrl: './fsr/auth/index.html'
    })

    $urlRouterProvider.when('/auth/callback/', ['$location', '$state', 'store', function ($location, $state, store) {
      var access_token = $location.hash().split("=")[1]
      store.set('token', access_token)
      $state.go('auth')
  }])
}

angular.module('auth', ['angular-storage'])
.config(['$stateProvider', '$urlRouterProvider', config])

})()
