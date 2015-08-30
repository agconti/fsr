;(function(){
'use strict'


/**
 * Manages returning a random venue from fs lists
 * @constructor
 * @param {object} venue -- resolved  in from route
 * @param {object} $scope
 * @param {object} listFactory
 * @param {object} mapFactory
 */
function ListController (venue, $scope, listsFactory, mapFactory) {
  var vm = this
  
  console.log(venue)
  vm.venue = venue
  mapFactory.setLocation(venue.location.lat, venue.location.lng)

  vm.get = function() {
    listsFactory.get().then(function(venue){
      vm.venue = venue
    }).finally(function() {
     $scope.$broadcast('scroll.refreshComplete')
   })
  }

  vm.getImageUrl = function () {
   var host = vm.venue.bestPhoto.prefix
     , size =  [828, 628].join("x")
     , id = vm.venue.bestPhoto.suffix

   return [host, size, id].join("")
  }
}



angular.module('lists')
.controller('ListController', [ 'venue'
                              , '$scope'
                              , 'listsFactory'
                              , 'mapFactory'
                              , ListController
                              ])
})()
