;(function(){
'use strict'

/**
 * Initializes ionic app
 * @constructor
 */
function startUp ($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
      cordova.plugins.Keyboard.disableScroll(true)

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent()
    }
  })
}


/**
 * App level configuration
 * @constructor
 */
function config ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/')

}

angular.module('fsr', ['ionic'])
.run(['$ionicPlatform', startUp])
.config(['$stateProvider', '$urlRouterProvider', config])
})()
