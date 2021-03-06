;(function(){
'use strict'



/**
 * A custom configuration of Restangular for extracting list items from FS.
 * @constructor
 * @param {object} Restangular
 * @returns {object} ListsRestangular
 */
function ListsRestangular (Restangular) {
  return Restangular.withConfig(function(RestangularConfigurer){
    RestangularConfigurer.setResponseExtractor(function(data) {
      return data.list.listItems.items
    })
  })
}


/**
 * A custom configuration of Restangular for extracting users lists from FS.
 * @constructor
 * @param {object} Restangular
 * @returns {object} UserListsRestangular
 */
function UserListsRestangular (Restangular) {
  return Restangular.withConfig(function(RestangularConfigurer){
    RestangularConfigurer.setResponseExtractor(function(data) {
      return data.lists.groups
    })
  })
}


/**
 * A factory that manages lists from FS.
 * @constructor
 * @param {object} venuesFactory
 * @param {object} ListsRestangular
 * @param {object} UserListsRestangular
 * @returns {object} ListsFactory
 */
function ListsFactory (venuesFactory, ListsRestangular, UserListsRestangular) {
  var listUrl = 'lists'
    , listsResource = ListsRestangular.all(listUrl)

    , myUrl = 'users/self'
    , myListsUrl = myUrl + '/' + listUrl
    , myListsResource = UserListsRestangular.all(myListsUrl)

  function getMyListsGroups () {
    return myListsResource.getList().$object
  }

  function getRandomItem(items){
    return items[ Math.floor(Math.random() * items.length ) ]
  }

  function getRandomListFromGroups(groups){
    var groupLength = groups.length
      , i = 0
      , group = []

    for(; i < groupLength; i++) {
      group = getRandomItem(groups)

      if (group.items.length) {
        break
      }

      groups.slice(groups.indexOf(group), 1)
    }
    return group
  }

  function chooseRandomVenueFromLists (listGroups) {
      var listGroup = getRandomListFromGroups(listGroups)
        , list = getRandomItem(listGroup.items)

      return listsResource.one(list.id)
        .get()
        .then(getRandomItem)
  }

  function getVenue (listItem) {
    return venuesFactory.get(listItem.venue.id)
  }

  function getChoice () {
    return myListsResource
      .getList()
      .then(chooseRandomVenueFromLists)
      .then(getVenue)
  }

  return {
    'getListsGroups': getMyListsGroups
  , 'get': getChoice
  }
 }


angular.module('lists')
.factory('UserListsRestangular', ['Restangular', UserListsRestangular])
.factory('ListsRestangular', ['Restangular', ListsRestangular])
.factory('listsFactory', [ 'venuesFactory'
                         , 'ListsRestangular'
                         , 'UserListsRestangular'
                         , ListsFactory
                         ])
})()
