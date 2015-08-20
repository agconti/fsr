;(function(){
'use strict'


/**
 * Manages returning a random venue from fs lists
 * @constructor
 * @param {object} listFactory
 */
function ListController (listsFactory) {
  var ctr = this
  listsFactory.get().then(function(venue){
    ctr.venue = venue
  })
}



angular.module('lists')
.controller('ListController', ['listsFactory', ListController])
})()
