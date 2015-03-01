angular.module('ERChart').controller('SettingsCtrl',function($scope, $firebase, $firebaseAuth, constants, cache, eruser, erutils, $log){
  var erFBUsersUrlRef = new Firebase(constants.FB_USERS_URL);
  var erFBUsersSync = $firebase(erFBUsersUrlRef).$asObject();
  var erAuthObj = $firebaseAuth(erFBUsersUrlRef);
  var authData = erAuthObj.$getAuth();

  var settings = this;

  settings.save = function(){
    updateLocalCred(settings.erUser);
  };
  settings.init = function(){
    sync();
  };

  $log.info('---SETTINGS CTRL LOADED---');

  sync();

  /*
   * TODO:
   * Centralize checking if local user credentials is successfully defined after a successfull login.
   * Setting local-user-credentials should only happen once.
   *
   */
  erFBUsersSync.$loaded().then(function(data){
    console.log("$LOADED", data);
      angular.forEach(erFBUsersSync, function(v,k){
        if (angular.equals(authData.uid, v._fbuid)) {
          cache.getStoreKeys().then(function(keys){
              if (!_.includes(keys, authData.uid)){
                var newUser = {
                  _fbuid: authData.uid,
                  cred: {
                    name: v.cred.name,
                    first_name: v.cred.first_name,
                    last_name: v.cred.last_name,
                    email: v.cred.email,
                    hospital: v.cred.hospital
                  },
                  charts: []
                };
                eruser.localSetAuthdUser(authData.uid, newUser).then(function(newUserCreated){
                  $log.debug("New User Created.", newUserCreated);
                })
              } else {
                $log.info("A user with id: "+ authData.uid + "is already defined.");
              }
          });
        }
      });
  });

  function sync() {
    /*
     * Alway start syncing user data from device upward.
     *
     */
    eruser.localGetFBAuthdUser().then(function(isLoggedIn){
      if (isLoggedIn){

        eruser.localGetAuthdUser().then(function(authdUserData){

          console.log(authdUserData)
          settings.erUser = authdUserData.cred;
          return authdUserData;

        }).then(function(authdUserData){

          /*
           *
           * sync your local changes upward only to minimize issues
           * TODO: 
           * notify:warning:: you data will be over-written by you data saved in this device. 
           *
           */
          angular.forEach(erFBUsersSync, function(v,k){
            if (angular.equals(authdUserData._fbuid, v._fbuid)){
              v.cred = authdUserData.cred;

              erFBUsersSync.$save().then(function(ref){
                $log.info('---FB:USER UPDATED---', ref.key());
              }, function(error){
                $log.error('---!!!FAILED TO UPDATE USER IN FB!!!---', error);
              });
            };
          });
        });

      } //if
    });


  };

  function updateLocalCred(credDataObj) {
    eruser.localSetAuthdUserCred(authData.uid, credDataObj).then(function(credsUpdated){
      if (ionic.Platform.isWebView()) {
        erutils.showToast("top", "short", "Profile Saved.");
      } else {
        $log.info('---PROFILE SAVED---');
      }
      sync();
    });
  };

  $scope.$on('PageEvent:Init', function(){
    sync();
  });

});
