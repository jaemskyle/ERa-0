angular.module('ERChart').controller('MenuCtrl',function($scope,$firebaseAuth,$timeout,$state,eruser,constants){
  var erfire,authObj,er_user;
  erfire = new Firebase(constants.FB_URL);
  authObj = $firebaseAuth(erfire);
  
  this.logout = function(){
    eruser.localGetAuthdUser()
      .then(function(user){
        //eruser.localDeleteAuthdUser( angular.fromJson(user)._fbuid);
      })
      .finally(function(){
        authObj.$unauth();
        $timeout( function(){
          $state.go('login')
        });
      });
  };

});
