angular.module('amc.servicesDraws', ['ngResource'])

.factory('DrawsFactory', function($http, URL_WEB_SERVICE) {
  var urlAllTirages = URL_WEB_SERVICE + 'amc-tiragesorts/all';
  var urlAllTiragesEvent = URL_WEB_SERVICE + 'amc-tiragesorts/all-event/';
  var urlTirage = URL_WEB_SERVICE + 'amc-tiragesorts/id/';

  return {

    getDraws: function () {
      return $http.get(urlAllTirages)
        .then(function (resp) {
          console.log('Success_tirages', resp);
          return resp.data;
        }, function (err) {
          console.error('Error_tirages', err);
          return null;
        });
    },

    getDrawsEvent: function (idEvent) {
      return $http.get(urlAllTiragesEvent+idEvent)
        .then(function (resp) {
          console.log('Success_tirages_event', resp);
          return resp.data;
        }, function (err) {
          console.error('Error_tirages_event', err);
          return null;
        });
    },

    getDraw: function(id) {
      return $http.get(urlTirage+id)
        .then(function (resp) {
          console.log('Success_tirage', resp);
          return resp.data;
        }, function (err) {
          console.error('Error_tirage', err);
          return null;
        });
    }
  }
});
