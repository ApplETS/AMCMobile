// Ionic amc App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'amc' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'amc.controllers' is found in controllers.js
angular.module('amc', ['ionic','ionic.service.core', 'ionic.service.analytics',
  'amc.ctrlLayout', 'amc.ctrlSongs', 'amc.ctrlDraws', 'amc.ctrlEvents', 'amc.ctrlPartners', 'amc.ctrlAgendas', 'amc.ctrlTwitters',
  'amc.servicesEvents', 'amc.servicesSongs', 'amc.servicesDraws', 'amc.servicesPartners', 'amc.servicesAgendas', 'amc.servicesTwitters'])
.constant('URL_WEB_SERVICE', 'http://192.168.1.11:8080/rest/')

.run(function($ionicPlatform, $ionicAnalytics, $cordovaClipboard, $http, URL_WEB_SERVICE) {
  $ionicPlatform.ready(function() {
    //$ionicAnalytics.register();

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //Used for the notifications
    var push = new Ionic.Push({
      "debug": true
    });

    push.register(function(token) {
      push.saveToken(token, { 'ignore_user': true });
      console.log("Device token:",token.token);

      var params = {
        tokenID: token.token
      };

      //Send the token to the API to save it in the database (or update the date for last use)
      $http({
        method: 'POST',
        url: URL_WEB_SERVICE + 'amc-tokens/newtoken/',
        data: params
      }).success(function (data, status, header, config) {
        console.log(angular.toJson(data));
      }).error(function (error) {
        console.log(error);
      });

      ////$scope.token = token.token;
      //$cordovaClipboard
      //  .copy(token.token);
    });
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'layout/menu.html',
    controller: 'AppCtrl'
  })
    .state('app.events', {
      url: '/events',
      views: {
        'menuContent': {
          templateUrl: 'events/events.html',
          controller: 'EventsCtrl'
        }
      }
    })

    .state('app.event', {
      url: '/events/:eventId',
      views: {
        'menuContent': {
          templateUrl: 'events/event.html',
          controller: 'EventCtrl'
        }
      }
    })

    .state('app.partners', {
      url: '/partners',
      views: {
        'menuContent': {
          templateUrl: 'partners/partners.html',
          controller: 'PartnersCtrl'
        }
      }
    })

    .state('app.partner', {
      url: '/partners/:partnerId',
      views: {
        'menuContent': {
          templateUrl: 'partners/partner.html',
          controller: 'PartnerCtrl'
        }
      }
    })

    .state('app.agendas', {
      url: '/agendas',
      views: {
        'menuContent': {
          templateUrl: 'agendas/agendas.html',
          controller: 'AgendasCtrl'
        }
      }
    })

    .state('app.agenda', {
      url: '/agendas/:agendaId',
      views: {
        'menuContent': {
          templateUrl: 'agendas/agenda.html',
          controller: 'AgendaCtrl'
        }
      }
    })

    .state('app.draws', {
      url: '/draws',
      views: {
        'menuContent': {
          templateUrl: 'draws/draws.html',
          controller: 'DrawsCtrl'
        }
      }
    })

    .state('app.draw', {
      url: '/draws/:drawId',
      views: {
        'menuContent': {
          templateUrl: 'draws/draw.html',
          controller: 'DrawCtrl'
        }
      }
    })

    .state('app.songs', {
      url: '/songs',
      views: {
        'menuContent': {
          templateUrl: 'songs/songs.html',
          controller: 'SongsCtrl'
        }
      }
    })

    .state('app.socials', {
      url: '/socials',
      views: {
        'menuContent': {
          templateUrl: 'socials/twitters.html',
          controller: 'TwitterCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/events');
})
;
