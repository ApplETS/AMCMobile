angular.module('amc.servicesAgendas', ['ngResource'])

.factory('AgendasFactory', function($http, URL_WEB_SERVICE) {
  var urlAllIntervenants = URL_WEB_SERVICE + 'amc-intervs/all';
  var urlIntervenant = URL_WEB_SERVICE + 'amc-intervs/id/';
  var urlAllIntervenantsEvent = URL_WEB_SERVICE + 'amc-intervs/all-event/';

  return {

    getIntervenants: function () {
      return $http.get(urlAllIntervenants)
        .then(function (resp) {
          console.log('Success_Intervenants', resp);
          return resp.data;
        }, function (err) {
          console.error('Error_Intervenants', err);
          return null;
        });
    },

    getIntervenantsEvent: function (idEvent) {
      return $http.get(urlAllIntervenantsEvent+idEvent)
        .then(function (resp) {
          console.log('Success_tirages_event', resp);
          return resp.data;
        }, function (err) {
          console.error('Error_tirages_event', err);
          return null;
        });
    },

    getIntervenant: function(id) {
      return $http.get(urlIntervenant+id)
        .then(function (resp) {
          console.log('Success_Intervenant', resp);
          return resp.data;
        }, function (err) {
          console.error('Error_Intervenant', err);
          return null;
        });
    }
  }
})
;
