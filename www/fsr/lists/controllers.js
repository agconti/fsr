;(function(){
'use strict'


/**
 * Manages returning a random venue from fs lists
 * @constructor
 * @param {object} $scope
 * @param {object} listFactory
 */
function ListController ($scope, listsFactory) {
  var ctr = this

  this.get = function() {
    listsFactory.get().then(function(venue){
      ctr.venue = venue
    }).finally(function() {
     $scope.$broadcast('scroll.refreshComplete')
   })
  }

  // call on initialization. preping for bable
  this.get()

  this.getImageUrl = function () {
  if (ctr.venue === undefined || ctr.venue.id === undefined) {
    return "http://placehold.it/828x628"
  }
   var host = ctr.venue.bestPhoto.prefix
     , size =  [828, 628].join("x")
     , id = ctr.venue.bestPhoto.suffix

   return [host, size, id].join("")
  }
}



angular.module('lists')
.controller('ListController', ['$scope', 'listsFactory', ListController])
})()
