angular.module('ERChart').controller('PincodeCtrl',function($scope,$state,$timeout,eruser){
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
      
      $state.go('root.home');
        return pin = [];
    }
  };


});
