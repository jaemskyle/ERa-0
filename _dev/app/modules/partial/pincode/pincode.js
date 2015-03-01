angular.module('ERChart').controller('PincodeCtrl',function($scope, $state, $timeout, eruser, erutils, $firebase, $firebaseAuth, constants){
  var erfire,authObj,er_user;
  erfire = new Firebase(constants.FB_URL);
  authObj = $firebaseAuth(erfire);
  // eruser.getAuthdUser('simplelogin:15').then(function(r){
  //   console.log(Immutable.fromJS(r));
  // });
    var pin = [];
  this.unlockPin = function(val){
    if (pin.length !== 2){
        pin.push(val);
      console.log('a');
    } else if (pin.length === 2){
      console.log('yo');
      
      $timeout(function(){
        erutils.broadcastPageEvent("InitCharts");
      $state.transitionTo('root.home', {}, {reload: true});
      })
        return pin = [];
    }
  };
  
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
