;(function(){
'use strict'


/**
 * App level configuration
 * @constructor
 * @param {object} authFactory
 */
function AuthController (authFactory) {
  this.fsLoginUrl = authFactory.getLoginUrl()
  this.isLoggedIn = function(){
    return authFactory.isLoggedIn()
  }
}



angular.module('auth')
.controller('AuthController', ['authFactory', AuthController])
})()
