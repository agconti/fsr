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


/**
 * Allows leaflet / mapbox.js to be dependency injected. Handles
 * configuration.
 * @constructor
 * @param {object} MAPBOX_CONFIG
 * @returns {object} MapsFactory
 */
function MapFactory (MAPBOX_CONFIG) {
  var L = window.L
    , map = L.mapbox.map('map'
                        , MAPBOX_CONFIG.map_type
                        , MAPBOX_CONFIG.map_options
                        )
  map.dragging.disable()
  map.doubleClickZoom.disable()
  map.scrollWheelZoom.disable()

  function setLocation (lat, lng, venueName){
    var loc = [lat, lng]
      , zoom = 17
      , options = {
        title: venueName
      }

    map.setView(loc, zoom)

    L.marker(loc, options)
     .addTo(map)
  }
  return {
    'setLocation': setLocation
  }
}

angular.module('venues')
.factory('VenuesRestangular', [ 'Restangular', VenuesRestangular])
.factory('venuesFactory', [ 'VenuesRestangular', VenuesFactory])
.factory('mapFactory', ['MAPBOX_CONFIG', MapFactory])
})()
