angular.module('amc.servicesSongs', ['ngResource'])
.factory('SongsFactory', function($http, URL_WEB_SERVICE) {
  var urlAllSongs = URL_WEB_SERVICE + 'amc-musiques/all';
  var urlSong = URL_WEB_SERVICE + 'amc-musiques/id/';

  return {

    getSongs: function () {
      return $http.get(urlAllSongs)
        .then(function (resp) {
          console.log('Success_Songs', resp);
          return resp.data;
        }, function (err) {
          console.error('Error_Songs', err);
          return null;
        });
    },

    getSong: function(id) {
      return $http.get(urlSong+id)
        .then(function (resp) {
          console.log('Success_Song', resp);
          return resp.data;
        }, function (err) {
          console.error('Error_Song', err);
          return null;
        });
    }
  }
});
