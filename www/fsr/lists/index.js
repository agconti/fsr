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
    , resolve: {
        venue: ['listsFactory', function(listsFactory){
          return listsFactory.get()
        }]
      }
    , templateUrl: './fsr/lists/index.html'
    , controller: "ListController"
    , controllerAs: "list"
    })
}


angular.module('lists', ['ui.router', 'restangular'])
.config(['$stateProvider', '$urlRouterProvider', config])

})()
