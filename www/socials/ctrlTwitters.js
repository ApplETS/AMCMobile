angular.module('amc.ctrlTwitters', [])

.controller('TwitterCtrl', function($scope, $ionicPlatform, TwittersFactory) {
  // 1
  $scope.correctTimestring = function(string) {
    return new Date(Date.parse(string));
  };
  // 2
  $scope.showHomeTimeline = function() {
    $scope.home_timeline = TwittersFactory.getHomeTimeline();
  };
  // 3
  $scope.doRefresh = function() {
    $scope.showHomeTimeline();
    $scope.$broadcast('scroll.refreshComplete');
  };
  // 4
  $ionicPlatform.ready(function() {
    if (TwittersFactory.isAuthenticated()) {
      $scope.showHomeTimeline();
    } else {
      TwittersFactory.initialize().then(function(result) {
        if(result === true) {
          $scope.showHomeTimeline();
        }
      });
    }
  });
});
