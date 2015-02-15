angular.module('ERChart').factory('eruser',function($localForage,$window,$q,$firebase,$firebaseAuth,$log) {
  var userRecord = Immutable.Record({
    _fbuid: null,
    cred: {
      name: null,
      hospital: null,
      province: null
    },
    charts: []
  });
  var eruser = {
    localSetAuthdUser: function(key, data, req_type){
      data = new userRecord(data);
      return $localForage.setItem(key, data);
    },
    localDeleteAuthdUser: function(key){
      return $localForage.removeItem(key);
    },
    localGetFBAuthdUser: function(){
      var deferred = $q.defer();
      var erfire_session_key = 'firebase:session::era';
      deferred.resolve($window.localStorage[erfire_session_key]);
      return deferred.promise;
    },
    localGetAuthdUser: function(){
      return eruser.localGetFBAuthdUser().then(function(currentUser){
        return $localForage.getItem( angular.fromJson(currentUser).uid );
      });
    },
    isUserAuthd: function(){
      var deferred = $q.defer();
      eruser.localGetFBAuthdUser().then(function(login){
        if (!login || !angular.isDefined(login)){
          deferred.resolve(login);
        } else {
          deferred.reject(false);
        }
      })
      return deferred.promise;
    }
  };

  return eruser;
});