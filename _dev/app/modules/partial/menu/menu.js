angular.module('ERChart').controller('MenuCtrl',function($scope,$firebaseAuth,$timeout,$state){
  var erfire = new Firebase('https://era.firebaseio.com/users');
  $scope.authObj = $firebaseAuth(erfire);
  $scope.logout = function(){
      console.log('should log out');
      $scope.authObj.$unauth();
      $timeout( function(){
          $state.go('login')
        });
    };

});
