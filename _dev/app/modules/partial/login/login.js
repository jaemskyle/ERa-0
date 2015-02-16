angular.module('ERChart').controller('LoginCtrl',function($scope, $timeout, $firebase, $firebaseAuth, $state, eruser, constants) {
  var erFBUsersUrlRef = new Firebase(constants.FB_USERS_URL);
  var erFBUsersSync = $firebase(erFBUsersUrlRef).$asObject();
  var erAuthObj = $firebaseAuth(erFBUsersUrlRef);
  var authData = erAuthObj.$getAuth();

  $scope.cred = {};

  if (authData) {
    console.log("Already in as:", authData.uid);
    $state.go('pincode');
  } else {
    console.log("Logged out");
  }

  this.login = login;
  this.logout = logout;

  function login(){
    // $state.go('pincode');
    // return false;
    erAuthObj.$authWithPassword($scope.cred).then(function(loginSuccess) {
      var userObj = {"_fbuid": loginSuccess.uid,
                     cred: {
                       "name": null,
                       "hospital": null,
                       "province": null
                     }};
      console.log("Logged in as:", loginSuccess.uid);
      // eruser.localSetAuthdUser(loginSuccess.uid, userObj)
      //   .then(function(localUserCreated){})
      //   .finally(function(){
      //     $scope.cred = {}
      //     $timeout( function(){
      //       $state.go('pincode');
      //     });
      //   });

        $scope.cred = {}
      $state.transitionTo('pincode', {}, {reload: true});
      
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  };
  function logout(){
    console.log('should log out');
    erAuthObj.$unauth();
    $timeout( function(){
      $state.go('root.login')
    });
  };
});
