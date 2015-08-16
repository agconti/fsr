;(function(){
'use strict'


/**
 * A custom configuration of Restangular for extracting lists from FS.
 * @constructor
 * @param {object} FS_CONFIG -- foursquare
 * @param {object} store -- from angular-storage
 * @returns {object} ListsFactory
 */
function ListsRestangular (Restangular) {
  return Restangular.withConfig(function(RestangularConfigurer){
    RestangularConfigurer.setResponseExtractor(function(data) {
      return data.lists.groups
    })
  })
}


/**
 * A factory that manages lists from FS.
 * @constructor
 * @param {object} FS_CONFIG -- foursquare
 * @param {object} store -- from angular-storage
 * @returns {object} ListsFactory
 */
function ListsFactory (FS_CONFIG, store, ListsRestangular) {
  var meUrl = '/users/self'
    , myListsUrl = meUrl + '/lists'
    , myLists = ListsRestangular.all(myListsUrl)

    , venues

  function getMyLists () {
    venues = myLists.getList().$object
    return venues
  }
  return {
    'get': getMyLists
  }
 }


angular.module('lists')
.factory('ListsRestangular', ['Restangular', ListsRestangular])
.factory('listsFactory', [ 'FS_CONFIG'
                         , 'store'
                         , 'ListsRestangular'
                         , ListsFactory])
})()
