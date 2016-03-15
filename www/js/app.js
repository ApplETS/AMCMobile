// Ionic amc App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'amc' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'amc.controllers' is found in controllers.js
angular.module('amc', ['ionic','ionic.service.core', 'ionic.service.analytics',
  'amc.ctrlLayout', 'amc.ctrlSongs', 'amc.ctrlDraws', 'amc.ctrlEvents',
  'amc.servicesEvents', 'amc.servicesSongs', 'amc.servicesDraws'])
.constant('URL_WEB_SERVICE', 'http://192.168.1.4:8080/rest/')

.run(function($ionicPlatform, $ionicAnalytics, $cordovaClipboard) {
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
      console.log("Device token:",token.token);
      //alert("Token : "+token.token);

      //$scope.token = token.token;
      $cordovaClipboard
        .copy(token.token);
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
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/events');
});
