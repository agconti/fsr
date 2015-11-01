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
  this.login = function() { return authFactory.login() }

}



angular.module('auth')
.controller('AuthController', ['authFactory', AuthController])
})()
