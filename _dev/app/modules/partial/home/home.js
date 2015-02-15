angular.module('ERChart').controller('HomeCtrl',function($scope, cache, $interval, $state, $timeout, $firebase, $firebaseAuth, eruser, $window, isUserAuthd, constants){
  var users_base_url = new Firebase(constants.FB_USERS_URL);
  var erfire_users_sync = $firebase(users_base_url);
  var allExForms = [];
  this.showListDelete = false;

  // get auth user from firebase                                     
  // $scope.authObj = $firebaseAuth(users_base_url);
  // var authData = $scope.authObj.$getAuth();

  // var er_user = {};
// er_user = Immutable.fromJS(angular.fromJson(eruser.localGetFBAuthdUser()));
  // console.log(er_user.get('token'));

  function setChartScope(collection){
    collection =  Immutable.List(collection).toArray()
    $scope.charts = collection;
    
    // $scope.charts = Immutable.List(collection).toArray();
    // writeIn($scope.charts);
  };
  function initCharts(charts){
    if (angular.isArray(charts)){
        charts = Immutable.List(charts)
        setChartScope(charts);
    }

      // .withMutations(function(charts){
      // charts.unshift({id:"a"})
      //       .unshift({id:"b"})
      //       .unshift({id:"bc"})
      //       .unshift({id:"bcd"})
    // })
  };
  function removeOne(key){
    if (angular.isArray($scope.charts)){
      var charts = Immutable.List($scope.charts);
      charts = charts.delete(key);
      setChartScope(charts);
    }
  };
  function getUserStore(){
    eruser.localGetAuthdUser().then(function(localAuthdUser){
      console.log(localAuthdUser.charts);
      initCharts(localAuthdUser.charts);
    })
  };
  function writeIn(charts){
    eruser.localGetFBAuthdUser().then(function(currentUser){
      return currentUser;
    }).then(function(currentUser){
      eruser.localSetAuthdUser(angular.fromJson(currentUser).uid, {charts: charts})
          .then(function(setSuccess){
            console.log(setSuccess);
          })
    })
  };

  
  var init = function(){
    cache.getLocalData().then(function(getLocalDataSuccess){
      if (angular.isArray(getLocalDataSuccess)){
        $scope.charts = getLocalDataSuccess;
      } else {
        $scope.chats = allExForms;
      }
    });
  };
  var syncScopeToLocal = function(){
    cache.writeLocalData(allExForms).then(
      function(setSuccess){
        init();
      }
    );
  };
  var deleteItem = function(item, index){
    if (allExForms.length){
      allExForms.splice(index, 1);
      syncScopeToLocal();
    }
  };
  var prepForDelete = function(item, index){
    cache.getLocalData().then(function(getLocalDataSuccess){
      if (!getLocalDataSuccess.length){
      } else {
        allExForms = getLocalDataSuccess;
        deleteItem(item, index);
      }
    });
  };

  var getLocalData = function(){
    cache.getLocalData().then(function(getLocalDataSuccess){
      if (!getLocalDataSuccess){
        //          $interval(getLocalData, 1000, 3);
      } else {
        // console.log(getLocalDataSuccess)
        allExForms = getLocalDataSuccess;
        $scope.chats = getLocalDataSuccess;
      }
    });
  };

  this.canSwipeList = function(){
    return true;
  };
  this.deleteItem = function(item, index){
    // removeOne(index);
    // return false;
    // var charts = Immutable.Stack($scope.charts).toOrderedMap();
    // charts = charts.remove(index);
    // charts = Immutable.Stack(charts);
    // setChartScope(charts);
    // return false;
    if (!index && allExForms.length === 1){
      allExForms = [];
      syncScopeToLocal();
    } else {
      prepForDelete(item, index);
    }
  };
  this.editItem = function(form){
    $timeout(function(){
      $state.transitionTo('root.edit', {formId: form.id});
    });
  };

  init();

  $scope.$on('CacheUpdate:Updated', function(event, args){
    init();
  });

  // var LS = angular.fromJson($window.localStorage.getItem("ERa_/ExForms"));

  // cache.getStoreKeys().then(function(keys){
  //   console.log(keys);
  // });
  

});
