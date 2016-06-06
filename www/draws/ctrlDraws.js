angular.module('amc.ctrlDraws', ['ngCordova'])

  .controller('DrawsCtrl', function($scope, $rootScope, $ionicModal, $timeout, $http, $cordovaBarcodeScanner, $cordovaInAppBrowser, EventsFactory, DrawsFactory, URL_WEB_SERVICE) {
    EventsFactory.getEvents().then(function(data){
      var listEvents = [];
      for(var i=0;i<data.length;i++){
        listEvents.push({ title: data[i].nom, id: data[i].id, dateDebut:data[i].dateDebut, dateFin:data[i].dateFin});
      }

      $scope.events = listEvents;
      $scope.selectedEvent = listEvents[0];

      //TODO, donne heure selon UTC...
      var seconds = Math.floor(Date.now() / 1000);
      if(data[0].dateDebut < seconds && data[0].dateFin > seconds)
        $scope.hideBtnInsc = false;
      else
        $scope.hideBtnInsc = true;
      //alert(seconds);

      DrawsFactory.getDrawsEvent(listEvents[0].id).then(function(data){
        var listDraws = [];
        for(var i=0;i<data.length;i++){
          listDraws.push({ title: data[i].titre, id: data[i].id});
        }


        $scope.draws = listDraws;
      });
    });

    $scope.changeEvent = function(selectedEvent) {
      //Update the list of draws for the selected event
      DrawsFactory.getDrawsEvent(selectedEvent.id).then(function(data){
        var listDraws = [];
        var positionSelected = 0;
        for(var i=0;i<data.length;i++){
          listDraws.push({ title: data[i].titre, id: data[i].id});
          if(selectedEvent.id == data[i].id)
            positionSelected = i;
        }

        var seconds = Math.floor(Date.now() / 1000);
        if(selectedEvent.dateDebut < seconds && selectedEvent.dateFin > seconds)
          $scope.hideBtnInsc = false;
        else
          $scope.hideBtnInsc = true;

        $scope.draws = listDraws;

        //alert(angular.toJson(selectedEvent))

      });
    };

    //-----------------------------------
    //  BEGIN FOR THE FORM FOR EVENTBRITE
    //-----------------------------------
    // Form data for the login modal
    $scope.loginEBData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('draws/loginEventBrite.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLoginEB = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.loginEB = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLoginEB = function() {
      console.log('Doing loginEB', $scope.loginData);

      $http({
        method: 'POST',
        url: URL_WEB_SERVICE + 'amc-tiragesorts/inscription/bc/' + $scope.loginData.resNumb
      }).
      success(function (data, status, header, config) {
        console.log(angular.toJson(data));

        if (data.valueBool == "true" || data.valueBool == true)
          alert("Vous êtes maintenant inscrit pour les tirages au sort.");
        else
          alert("L'inscription n'a pas fonctionné.\nRaison : " + data.explication);

        $scope.closeLoginEB();
      }).error(function (error) {
        console.log(error);
      });

      //$timeout(function() {
      //  $scope.closeLoginEB();
      //}, 1000);
    };

    $scope.scanBarcode = function() {
      try {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
          //alert(imageData.text);
          $scope.loginData.resNumb = imageData.text;
          console.log("Barcode Format -> " + imageData.format);
          console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
          console.log("An error happened -> " + error);
        });
      } catch(e) {
        //Should go there only if it's from the browser
        $scope.loginData.resNumb = "browser0123456789";
        console.log("Browser value codebar ");
      }
    };

    $scope.useEBForm = function() {
      var options = {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'no'
      };

      //TODO, MAJ le client_id par celui de l'app sur eventbrite (optimiser en appelant un web service pour le récup ??)
      $cordovaInAppBrowser.open('https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=T3YSF5A2ZCXKSBB3SG', '_blank', options);
    };

    $rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event){
      if (typeof String.prototype.startsWith != 'function') {
        // see below for better implementation!
        String.prototype.startsWith = function (str) {
          return this.indexOf(str) === 0;
        };
      }
      if((event.url).startsWith("http://localhost/callback")) {
        requestToken = (event.url).split("access_token=")[1];
        if(requestToken != "") {
          //alert("token : " + requestToken);
          $http({
            method: 'POST',
            url: URL_WEB_SERVICE + 'amc-tiragesorts/inscription/token/' + requestToken
          }).
          success(function (data, status, header, config) {
            console.log(angular.toJson(data));

            if (data.valueBool == "true" || data.valueBool == true)
              alert("Vous êtes maintenant inscrit pour les tirages au sort.");
            else
              alert("L'inscription n'a pas fonctionné.\nRaison : " + data.explication);

            $scope.closeLoginEB();
          }).error(function (error) {
            console.log(error);
          });
        }
        $cordovaInAppBrowser.close();
      }
    });

    //-----------------------------------
    //    END FOR THE FORM FOR EVENTBRITE
    //-----------------------------------
  })

  .controller('DrawCtrl', function($scope, EventsFactory, DrawsFactory) {
    EventsFactory.getEvents().then(function(data){
      var listEvents = [];
      for(var i=0;i<data.length;i++){
        listEvents.push({ title: data[i].nom, id: data[i].id});
      }

      $scope.events = listEvents;
      $scope.selectedEvent = listEvents[0];
    });

    $scope.changeEvent = function(selectedEvent) {
      //Update the list of draws for the selected event
      DrawsFactory.getDrawsEvent(selectedEvent.id).then(function(data){
        var listDraws = [];
        for(var i=0;i<data.length;i++){
          listDraws.push({ title: data[i].titre, id: data[i].id});
        }

        $scope.draws = listDraws;
      });
    };
  });

