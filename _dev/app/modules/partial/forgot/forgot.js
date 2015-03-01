angular.module('ERChart').controller('ForgotCtrl',function($scope, $firebase, $firebaseAuth, constants, $state, $ionicPopup){
  var erfireusers,erAuthObj; 
  erFireBaseUrl = new Firebase(constants.FB_URL);
  erFBUsersUrlRef = new Firebase(constants.FB_USERS_URL);
  erFBUsersSync = $firebase(erFBUsersUrlRef);
  erAuthObj = $firebaseAuth(erFireBaseUrl);

  $scope.forgot = {};
  $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Password Reset',
     template: 'An email is sent to reset your password.'
   });
   alertPopup.then(function(res) {
     if (res) {
       $state.go("login");
     }
   });
 };

  this.resetPassword = function(credsObj) {
    erAuthObj.$resetPassword($scope.forgot).then(
      function(){
        $scope.showAlert();
      }).catch(function(error){
      console.log("Error", error);
    });
  };

  

});
