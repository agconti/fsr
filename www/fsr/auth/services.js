;(function(){
'use strict'


/**
 * A factory that manages authentication with FS.
 * @constructor
 * @param {object} store -- from ngStorage
 * @param {object} FS_CONFIG -- foursquare config
 * @returns {object} AuthFactory
 */
function AuthFactory (store, FS_CONFIG) {
  var tokenKey = 'fsr:token'

  function login () {
    var url = getLoginUrl()
    return $location.path(url).replace()
  }

  function getLoginUrl () {
    var host = FS_CONFIG.authenticateUrl
      , params= [ "client_id=" + FS_CONFIG.client_id
                , "response_type=" + FS_CONFIG.response_type
                , "redirect_uri=" + FS_CONFIG.redirect_uri
                ].join("&")

    return host + '?' + params
  }

  function getToken () {
      return store.get(tokenKey)
  }

  function saveToken (token) {
      return store.set(tokenKey, token)
  }

  function isLoggedIn () {
    return Boolean(store.get(tokenKey))
  }

  return {
    'getLoginUrl': getLoginUrl
  , 'getToken': getToken
  , 'saveToken': saveToken
  , 'isLoggedIn': isLoggedIn
  , 'login': login
  }
 }


 /**
  * An interceptor for adding the oauth token for requests to foursquare.
  * @constructor
  * @param {object} authFactory
  * @returns {object} config
  */
 function AuthInterceptor (authFactory) {
   var token = authFactory.getToken()

   return {
     'request': function(config) {
       config.params = config.params || {}
       config.params.oauth_token = token
       config.params.v = '20150801'
       return config
     }
   }
 }


angular.module('auth')
.factory('authFactory', ['store', 'FS_CONFIG', AuthFactory])
.factory('authInterceptor', ['authFactory', AuthInterceptor])
})()
