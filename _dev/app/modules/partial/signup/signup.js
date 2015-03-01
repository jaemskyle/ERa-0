"user strict";
angular.module('ERChart').controller('SignupCtrl',function($scope, $timeout, $firebase, $firebaseAuth, $state, eruser, constants,$log){
  var erfireusers,erAuthObj; 
  erFireBaseUrl = new Firebase(constants.FB_URL);
  erFBUsersUrlRef = new Firebase(constants.FB_USERS_URL);
  erFBUsersSync = $firebase(erFBUsersUrlRef);
  erAuthObj = $firebaseAuth(erFireBaseUrl);

  $scope.signup = {};
  $scope.cred = {};
  this.signup = function(){
    erAuthObj.$createUser($scope.signup).then(function(signupSuccess){
      var userObj = {"_fbuid": signupSuccess.uid,
                     cred: {
                       "name": $scope.signup.firstName + ' ' + $scope.signup.lastName || null,
                       "first_name": $scope.signup.firstName || null,
                       "last_name": $scope.signup.lastName || null,
                       "email": $scope.signup.email || null,
                       "hospital": $scope.signup.hospital || null,
                       "province": $scope.signup.province || null
                     }};
      erFBUsersSync.$push(userObj).then(function(newUserAddedToFBC){
        eruser.localSetAuthdUser(signupSuccess.uid, userObj).then(function(localUserCreated){
          erAuthObj.$authWithPassword($scope.signup).then(function(loginSuccess){
            // $state.go("pincode");
            $state.go("root.home");
          },function(loginFail){
            $log.error("loginFailed");
          }).finally( function(){ $scope.signup = {};
                         });
        });
      }, function(failedToAddUserToFBC){
        $log.error("failedToAddUserUp");
      });
    }, function(signupFail){
      $log.error(signupFail);
    });
  };
  

});
