;(function(){
'use strict'


/**
 * A custom configuration of Restangular for extracting users tips for a venue.
 * @constructor
 * @param {object} Restangular
 * @returns {object} TipsRestangular
 */
function TipsRestangular (Restangular) {
  var params = {
      sort: 'popular'
    , limit: 3
    }

  return Restangular.withConfig(function(RestangularConfigurer){
    RestangularConfigurer
      .setResponseExtractor(function(data) { return data.tips.items })
      .setDefaultRequestParams('get', params)
  })
}

/**
 * A factory that manages tips from FS.
 * @constructor
 * @param {object} TipsRestangular
 * @returns {object} ListsFactory
 */
function TipsFactory (TipsRestangular) {
  var venues = TipsRestangular.all('venues')

  function getTips (id) {
    return TipsRestangular.one('venues', id).one('tips')
  }
  return {
    'get': getTips
  }
}


angular.module('lists')
.factory('TipsRestangular', [ 'Restangular', TipsRestangular])
.factory('tipsFactory', [ 'TipsRestangular', TipsFactory])
})()
