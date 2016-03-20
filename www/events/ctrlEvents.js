angular.module('amc.ctrlEvents', [])

.controller('EventsCtrl', function($scope, EventsFactory) {
	EventsFactory.getEvents().then(function(data){
    var listEvents = [];
    for(var i=0;i<data.length;i++){
      listEvents.push({ title: data[i].nom, id: data[i].id});
    }

    $scope.events = listEvents;
    $scope.selectedEvent = listEvents[0];
  });
})

.controller('EventCtrl', function($scope, $stateParams) {
});

