;(function(){
'use strict'


/**
 * Manages returning a random venue from fs lists
 * @constructor
 * @param {object} listFactory
 */
function ListController (venue, listsFactory) {
  var ctr = this

  this.venue = venue
  this.get = function() {
    listsFactory.get().then(function(venue){
      ctr.venue = venue
    })
  }

  this.getImageUrl = function () {
   var host = ctr.venue.photo.prefix
     , size =  [828, 628].join("x")
     , id = ctr.venue.photo.suffix

   return [host, size, id].join("")
  }
}



angular.module('lists')
.controller('ListController', ['venue', 'listsFactory', ListController])
})()
