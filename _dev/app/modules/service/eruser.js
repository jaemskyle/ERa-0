angular.module('ERChart').factory('eruser',function($localForage,$window,$q,$firebase,$firebaseAuth,$log) {
  var userRecord = Immutable.Record({
    _fbuid: null,
    cred: {
      name: null,
      first_name: null,
      last_name: null,
      hospital: null,
      province: null
    },
    charts: []
  });
  var eruser = {
    localSetAuthdUser: function(key, data, isReqUpdate){
      if (isReqUpdate){
        return eruser.localGetAuthdUser().then(
          function(user){
            user = Immutable.Map(user);
            data = user.setIn([ "charts" ], data.charts);
            return $localForage.setItem(key, data);
          });
      } else {
        data = new userRecord(data);
        return $localForage.setItem(key, data);
      }
    },
    localSetAuthdUserCred: function(key, credDataObj){
      return eruser.localGetAuthdUser().then(
        function(user){
          user = Immutable.Map(user);
          credDataObj = user.setIn(["cred"], credDataObj);
          return $localForage.setItem(key, credDataObj);
        }
      );
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
    localGetAuthdUser: function(key){
      return eruser.localGetFBAuthdUser().then(function(currentUser){
        return $localForage.getItem( key || angular.fromJson(currentUser).uid );
      });
    },
    isUserAuthd: function(){
      var deferred = $q.defer();
      eruser.localGetFBAuthdUser().then(function(login){
        if (!login || !angular.isDefined(login)){
          deferred.reject(login);
        } else {
          deferred.resolve(login);
        }
      })
      return deferred.promise;
    }
  };

  return eruser;
});
