angular.module('ERChart').controller('LoginCtrl',function($scope, $timeout, $firebase, $firebaseAuth, $state, eruser, constants, cache, $log, erutils) {
  var erFBUsersUrlRef = new Firebase(constants.FB_USERS_URL);
  var erFBUsersSync = $firebase(erFBUsersUrlRef).$asObject();
  var erAuthObj = $firebaseAuth(erFBUsersUrlRef);
  var authData = erAuthObj.$getAuth();

  $scope.cred = {};

  if (authData) {
    console.log("Already in as:", authData.uid);
    // $state.go('pincode');
    $state.go('root.home');
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
    erFBUsersSync.$loaded().then(function(data){
      console.log("$loaded", data);
        angular.forEach(erFBUsersSync, function(v,k){
          if (angular.equals(loginSuccess.uid, v._fbuid)) {
            cache.getStoreKeys().then(function(keys){
                if (!_.includes(keys, loginSuccess.uid)){
                  var newUser = {
                    _fbuid: loginSuccess.uid,
                    cred: {
                      name: v.cred.name,
                      first_name: v.cred.first_name,
                      last_name: v.cred.last_name,
                      email: v.cred.email || null,
                      hospital: v.cred.hospital
                    },
                    charts: []
                  };
                  eruser.localSetAuthdUser(loginSuccess.uid, newUser).then(function(newUserCreated){
                    $log.debug("New User Created.", newUserCreated);
                  });
                } else {
                  $log.info("A user with id: "+ loginSuccess.uid + "is already defined.");
                }
            });
          }
        });
    });
      // eruser.localSetAuthdUser(loginSuccess.uid, userObj)
      //   .then(function(localUserCreated){})
      //   .finally(function(){
      //     $scope.cred = {}
      //     $timeout( function(){
      //       $state.go('pincode');
      //     });
      //   });

      $scope.cred = {}
      // $state.transitionTo('pincode', {}, {reload: true});
      $timeout(function(){
        erutils.broadcastPageEvent('InitCharts');
      });
      $state.go('root.home');
      
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
