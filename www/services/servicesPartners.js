angular.module('amc.servicesPartners', ['ngResource'])

.factory('PartnersFactory', function($http, URL_WEB_SERVICE) {
  var urlAllPartners = URL_WEB_SERVICE + 'amc-partners/all';
  var urlPartner = URL_WEB_SERVICE + 'amc-partners/id/';
  var urlAllPartnersEvent = URL_WEB_SERVICE + 'amc-partners/all-event/';

  return {

    getPartners: function () {
      return $http.get(urlAllPartners)
        .then(function (resp) {
          console.log('Success_partners', resp);
          return resp.data;
        }, function (err) {
          console.error('Error_partners', err);
          return null;
        });
    },

    getPartnersEvent: function (idEvent) {
      return $http.get(urlAllPartnersEvent+idEvent)
        .then(function (resp) {
          console.log('Success_tirages_event', resp);
          return resp.data;
        }, function (err) {
          console.error('Error_tirages_event', err);
          return null;
        });
    },

    getPartner: function(id) {
      return $http.get(urlPartner+id)
        .then(function (resp) {
          console.log('Success_partner', resp);
          return resp.data;
        }, function (err) {
          console.error('Error_partner', err);
          return null;
        });
    }
  }
})
;
