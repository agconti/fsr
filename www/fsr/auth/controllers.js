;(function(){
'use strict'


/**
 * Manages loging in and loging out
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
