;(function(){
'use strict'


/**
 * A custom configuration of Restangular for extracting users venues for a venue.
 * @constructor
 * @param {object} Restangular
 * @returns {object} VenuesRestangular
 */
function VenuesRestangular (Restangular) {
  return Restangular.withConfig(function(RestangularConfigurer){
    RestangularConfigurer
      .setResponseExtractor(function(data) {
        return data.venue
      })
  })
}

/**
 * A factory that manages venues from FS.
 * @constructor
 * @param {object} VenuesRestangular
 * @returns {object} ListsFactory
 */
function VenuesFactory (VenuesRestangular) {
  var venues = VenuesRestangular.all('venues')

  function getVenues (id) {
    return venues.one(id).get()
  }
  return {
    'get': getVenues
  }
}


angular.module('lists')
.factory('VenuesRestangular', [ 'Restangular', VenuesRestangular])
.factory('venuesFactory', [ 'VenuesRestangular', VenuesFactory])
})()
