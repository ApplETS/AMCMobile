angular.module('amc.ctrlSongs', ['ionic'])

.controller('SongsCtrl', function($scope, $http, $filter, EventsFactory, SongsFactory, URL_WEB_SERVICE) {

  var ipAddress = "";

  try {
    networkinterface.getIPAddress(function (ip) {
      ipAddress = ip;
      console.log("Adresse IP (sol1) : "+ipAddress);
    });
  } catch(e) {
    var json = 'http://ipv4.myexternalip.com/json';
    $http.get(json).then(function(result) {
      ipAddress = result.data.ip;
      console.log("Adresse IP (sol2) : "+ipAddress);
    }, function(e) {
      ipAddress = "";
      alert("error :"+e);
    });
  };


  SongsFactory.getSongs().then(function(data){
    var listSongs = [];

    for(var i=0; i < data.length; i++){
      listSongs.push({ title: data[i].titre, autor: data[i].auteur, image:data[i].image,  id: data[i].id});
    }

    $scope.songs = listSongs;
  });

  // Called when the form is submitted
  $scope.submitVoteSong = function(song) {
    if(ipAddress == "") {
      alert("Nous n'arrivons pas à avoir votre adresse IP, vous ne pouvez donc pas voter.");
    } else {
      $http({
        method: 'POST',
        url: URL_WEB_SERVICE + 'amc-musiques/vote/musique/' + song.id + '/adresseIP/' + ipAddress
      }).
      success(function (data, status, header, config) {
        console.log(angular.toJson(data));
        //alert('GOOD      '+JSON.stringify(data));
        if (data.valueBool == "true" || data.valueBool == true)
          alert("Votre vote a été pris en compte.");
        else
          alert("Votre vote n'a pas été pris en compte.");

      }).error(function (error) {
        console.log(error);
      });
    }
  };
});
