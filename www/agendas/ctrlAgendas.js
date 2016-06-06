angular.module('amc.ctrlAgendas', [])

.controller('AgendasCtrl', function($scope, EventsFactory, AgendasFactory) {
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
    AgendasFactory.getIntervenantsEvent(selectedEvent.id).then(function(data){
      var listIntervenants = [];
      for(var i=0;i<data.length;i++){
        var dateDeb = new Date(data[i].dateDebut*1000);
        var hours = dateDeb.getHours();
        var minutes = "0" + dateDeb.getMinutes();
        var seconds = "0" + dateDeb.getSeconds();
        var day = "0" + dateDeb.getDay();
        var month = "0" + dateDeb.getMonth();
        var year = dateDeb.getFullYear();
        var formattedDateDeb = day.substr(-2) + '/' + month.substr(-2) + '/' + year + ' à ' + hours + ':' + minutes.substr(-2);// + ':' + seconds.substr(-2); // Will display time in 21/04/2016 à 10:30:23 format

        var dateFin = new Date(data[i].dateFin*1000);
        var hours = dateFin.getHours();
        var minutes = "0" + dateFin.getMinutes();
        var seconds = "0" + dateFin.getSeconds();
        var day = "0" + dateDeb.getDay();
        var month = "0" + dateDeb.getMonth();
        var year = dateDeb.getFullYear();
        var formattedDateFin = day.substr(-2) + '/' + month.substr(-2) + '/' + year + ' à ' + hours + ':' + minutes.substr(-2);// + ':' + seconds.substr(-2); // Will display time in 21/04/2016 à 10:30:23 format

        listIntervenants.push({ name: data[i].nom, id: data[i].id, image: data[i].image, bio: data[i].biographie,
                                desc: data[i].description, lieu: data[i].lieu, deb: formattedDateDeb, fin: formattedDateFin});
      }

      $scope.intervenants = listIntervenants;

      //alert(angular.toJson(selectedEvent))

    });
  };
})

.controller('AgendaCtrl', function($scope) {
});

