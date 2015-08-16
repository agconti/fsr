;(function(){
'use strict'


/**
 * Handles foursquare's oauth callback and extracts access_token
 * @constructor
 */
function oauthCallback ($location, $state, authFactory) {
  var access_token = $location.hash().split("=")[1]
  authFactory.saveToken(access_token)
  $state.go('auth')
}


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

    $urlRouterProvider.when('/auth/callback/', [ '$location'
                                               , '$state'
                                               , 'authFactory'
                                               , oauthCallback])
}

/**
 * Forces the user to login when not authenticated.
 * @constructor
 * @param {object} $rootScope
 * @param {object} $state
 * @param {object} authFactory
 */
function ForceLogin ($rootScope, $state, authFactory) {
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
.run(['$rootScope', '$state', 'authFactory', ForceLogin])

})()
