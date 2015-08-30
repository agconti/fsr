;(function(){
'use strict'


/**
 * Configures the list app's routing
 * @constructor
 */
function config ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('list', {
      url: '/lists'
    , templateUrl: './fsr/lists/index.html'
    , controller: "ListController as list"
    , resolve: {
        venue: ['listsFactory', function(listsFactory){
          return listsFactory.get()
        }]
      }
    })
}


angular.module('lists', ['ui.router', 'restangular', 'venues'])
.config(['$stateProvider', '$urlRouterProvider', config])
})()
