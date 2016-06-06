angular.module('amc.ctrlPartners', [])

.controller('PartnersCtrl', function($scope, EventsFactory, PartnersFactory) {
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
    PartnersFactory.getPartnersEvent(selectedEvent.id).then(function(data){
      var listPartners = [];
      for(var i=0;i<data.length;i++){
        listPartners.push({ name: data[i].nom, id: data[i].id});
      }

      $scope.partners = listPartners;

      //alert(angular.toJson(selectedEvent))

    });
  };
})

.controller('PartnerCtrl', function($scope) {
});

