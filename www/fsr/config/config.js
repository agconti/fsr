;(function () {
"use-strict"

angular.module('config')
.constant('FS_CONFIG', {"client_id":"YMV0WS2FQOEO30MCSL3043EXUSFPPSNCCXKLY22QLSSV3I04","host":"https://api.foursquare.com/v2","authenticateUrl":"https://foursquare.com/oauth2/authenticate","response_type":"token","redirect_uri":" http://localhost:3000/auth/callback/"})
.constant('MAPBOX_CONFIG', {"access_token":"pk.eyJ1IjoiYWdjb250aSIsImEiOiIwM2IwMzBiNGRjZTliYzRmNjE2NWUyOTUwY2JjMzlkNCJ9.VNRiqDn4uzm3UYTPEeokvg","map_type":"agconti.n80c1obe","map_options":{"zoomControl":false,"accessToken":"pk.eyJ1IjoiYWdjb250aSIsImEiOiIwM2IwMzBiNGRjZTliYzRmNjE2NWUyOTUwY2JjMzlkNCJ9.VNRiqDn4uzm3UYTPEeokvg","attributionControl":{"compact":true}}});
})()