;(function(){
'use strict'


/**
 * App level configuration
 * @constructor
 */
function config ($httpProvider, $stateProvider) {
  // $httpProvider.interceptors.push('authInterceptor')

  $stateProvider
    .state('auth', {
      url: '/auth'
    , templateUrl: './fsr/auth/index.html'
    , controller: "AuthController as auth"
    })
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

angular.module('auth', ['ui.router', 'angular-storage', 'ngCordovaOauth'])
.config(['$httpProvider', '$stateProvider', config])
.run(['$rootScope', '$state', 'authFactory', ForceLogin])

})()
