;(function(){
'use strict'

var url = 'https://foursquare.com/oauth2/authenticate?client_id=YMV0WS2FQOEO30MCSL3043EXUSFPPSNCCXKLY22QLSSV3I04&response_type=token&redirect_uri=http://localhost:3000/auth/callback/'

/**
 * App level configuration
 * @constructor
 */
function config ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('auth', {
      url: '/auth'
    , templateUrl: './fsr/auth/index.html'
    , controller: ['$http', '$scope', function($http, $scope){
        $scope.login = function(){
          console.log('calling')
          $http.jsonp(url)
          .success(function(data){
            console.log(done)
            console.log(data)
          })
          .error(function(err){
            console.log('error')
            console.log(err)
          })
        }
      }]
    })
    // http://localhost:3000/auth/#access_token=JSBDSJ4XWGSAKTBYVCCR0APMD0YU322PEYJEJ2CBY0EXUUQD
    .state('auth.callback', {
      url: '/callback/#access_token=:token'
    , controller: ['$http','$scope', '$stateParams', function ($http, $scope, $stateParams) {

          console.log('Yoo')
          console.log($stateParams)
          alert($stateParams)
      }]
    })
}

angular.module('auth', [])
.config(['$stateProvider', '$urlRouterProvider', config])
.run(['$rootScope', function Initialize ($rootScope) {
  $rootScope.$on('$stateChangeStart', function(e, toState) {
    console.log(toState, e)
  })
}])



})()
