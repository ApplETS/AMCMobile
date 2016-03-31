angular.module('amc.servicesEvents', ['ngResource'])

.factory('EventsFactory', function($http, URL_WEB_SERVICE) {
  var urlAllEvents = URL_WEB_SERVICE + 'amc-events/all';
  var urlEvent = URL_WEB_SERVICE + 'amc-events/id/';

  return {

    getEvents: function () {
      return $http.get(urlAllEvents)
        .then(function (resp) {
          console.log('Success_events', resp);
          return resp.data;
        }, function (err) {
          console.error('Error_events', err);
          return null;
        });
    },

    getEvent: function(id) {
      return $http.get(urlEvent+id)
        .then(function (resp) {
          console.log('Success_event', resp);
          return resp.data;
        }, function (err) {
          console.error('Error_event', err);
          return null;
        });
    }
  }
})
;
