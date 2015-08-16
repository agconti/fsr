;(function(){
'use strict'


/**
 * Manages returning a random venue from fs lists
 * @constructor
 * @param {object} listFactory
 */
function ListController (listsFactory) {
  this.venues = listsFactory.get()
}



angular.module('lists')
.controller('ListController', ['listsFactory', ListController])
})()
