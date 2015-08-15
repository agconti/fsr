;(function(){
'use strict'


/**
 * App level configuration
 * @constructor
 */
function config ($httpProvider, $stateProvider, $urlRouterProvider) {
  $httpProvider.interceptors.push('authInterceptor')

  $stateProvider
    .state('auth', {
      url: '/auth'
    , templateUrl: './fsr/auth/index.html'
    , controller: "AuthController"
    , controllerAs: "auth"
    })

    $urlRouterProvider.when('/auth/callback/', ['$location', '$state', 'authFactory', function ($location, $state, authFactory) {
      var access_token = $location.hash().split("=")[1]
      authFactory.saveToken(access_token)
      $state.go('auth')
  }])
}

/**
 * Initializes the auth module. Forces redirect to login when not authed.
 * @constructor
 * @param {object} $rootScope
 * @param {object} $state
 * @param {object} authFactory
 */
function Initialize ($rootScope, $state, authFactory) {
  $rootScope.$on('$stateChangeStart', function(e, toState) {
    if (toState.name === 'auth') { return false }

    if (!authFactory.isLoggedIn()) {
      e.preventDefault()
      $state.go('auth')
    }
  })
}

angular.module('auth', ['ui.router', 'angular-storage'])
.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', config])
.run(['$rootScope', '$state', 'authFactory', Initialize])

})()
