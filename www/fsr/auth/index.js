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

    $urlRouterProvider.when('/auth/callback/', ['$location', '$state', function ($location, $state) {
      var access_token = $location.hash().split("=")[1]
      $state.go('auth')
  }])
}

angular.module('auth', [])
.config(['$stateProvider', '$urlRouterProvider', config])

})()
