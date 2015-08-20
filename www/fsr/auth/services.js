;(function(){
'use strict'


/**
 * A factory that manages authentication with FS.
 * @constructor
 * @param {object} FS_CONFIG -- foursquare
 * @param {object} store -- from angular-storage
 * @returns {object} AuthFactory
 */
function AuthFactory (FS_CONFIG, store) {
  var tokenKey = 'token'

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
  }
 }


 /**
  * An interceptor for adding the oauth token for requests to foursquare.
  * @constructor
  * @param {object} authFactory
  * @returns {object} config
  */
 function AuthInterceptor (authFactory) {
   return {
     'request': function(config) {
       config.params = config.params || {}
       config.params.oauth_token = authFactory.getToken()
       config.params.v = '20150801'
       return config
     }
   }
 }


angular.module('auth')
.factory('authInterceptor', ['authFactory', AuthInterceptor])
.factory('authFactory', ['FS_CONFIG', 'store', AuthFactory])
})()
