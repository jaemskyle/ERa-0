angular.module('ERChart').controller('HomeCtrl',function($scope, cache, $interval, $state, $timeout, $firebase, $firebaseAuth, eruser, $window, isUserAuthd, constants, $q, $log, $rootScope){
  var users_base_url = new Firebase(constants.FB_USERS_URL);
  var erfire_users_sync = $firebase(users_base_url);
  var allExForms = [];
  var allCharts = [];
  this.showListDelete = false;

  console.log(isUserAuthd);

  // get auth user from firebase                                     
  // $scope.authObj = $firebaseAuth(users_base_url);
  // var authData = $scope.authObj.$getAuth();

  // var er_user = {};
  // er_user = Immutable.fromJS(angular.fromJson(eruser.localGetFBAuthdUser()));
  // console.log(er_user.get('token'));

  getUserStore();
  $scope.$on('CacheUpdate:Updated', function(event, args){
    init();
    getUserStore();
  });
  $scope.$on("PageEvent:InitCharts", function(){
    getUserStore();
  });

  function setChartScope(collection){
    collection =  Immutable.List(collection).toArray()
    $rootScope.safeApply(function(){
        $scope.charts = collection;
        console.log('---$SCOPE.CHARTS.LENGTH--- ', $scope.charts.length);
    });
    
    // $scope.charts = Immutable.List(collection).toArray();
    writeIn($scope.charts);
  };
  function initCharts(charts){
    var chart;
    if (angular.isArray(charts)){
      charts = Immutable.List(charts)

      // update specific location inside a map
      // chart = charts.getIn([2])
      // chart = Immutable.Map(chart).updateIn(["id"], function(v){return v = "emacs"});
      // charts = charts.setIn([1], chart.toObject());

      charts.toArray();
      setChartScope(charts);

    } else {
      $log.error("@fn initCharts (param) is not an array");
      $log.error(charts);
    }

    // batch mutate list returning a new list
    // .withMutations(function(charts){
    // charts.unshift({id:"a"})
    //       .unshift({id:"b"})
    //       .unshift({id:"bc"})
    //       .unshift({id:"bcd"})
    // })
  };
  function removeOne(key){
    eruser.localGetFBAuthdUser().then(function(isLoggedIn){
      if (!isLoggedIn){
      } else {
        if (angular.isArray($scope.charts)){
          var charts = Immutable.List($scope.charts);
          charts = charts.delete(key);
          setChartScope(charts);
        }
      }//endif
    });
  };
                                       
                                       
  function getUserStore(){
    eruser.localGetFBAuthdUser().then(function(isLoggedIn){
      if (!isLoggedIn){
        cache.getLocalData().then(function(publicList){
            initCharts(publicList);
        });
      } else {
        $q.all([cache.getStoreKeys, eruser.localGetFBAuthdUser]).then(
          function(depsRes){
            depsRes[1]().then(function(res1){
              return angular.fromJson( res1 ).uid;
            }).then(function(uid){
              depsRes[0]().then(function(res0){
                angular.forEach(res0, function(v,k){
                  console.log(v, uid);
                  if (angular.equals(uid, v)){
                    eruser.localGetAuthdUser(v).then(function(localAuthdUser){
                        console.log(localAuthdUser);
                        initCharts(localAuthdUser.charts);
                      })
                  }
                });
              })
            });
          });
      } //endif
    })
    
    };
  function writeIn(charts){
    eruser.localGetFBAuthdUser().then(function(isLoggedIn){
      if (!isLoggedIn){

        cache.writeLocalData(charts).then(function(localChartsUpdated){
          $log.info("local charts updated.");
        });

      } else {
        if ( angular.isArray(charts) ) {
          eruser.localGetFBAuthdUser().then(function(currentUser){
            return currentUser;
          }).then(function(currentUser){
            eruser.localSetAuthdUser(angular.fromJson(currentUser).uid, { charts: charts }, true)
              .then(function(setSuccess){
                console.log("setSuccess");
              }
            );
          })
        } else {
          $log.error("@fn writeIn (param) must be a native array");
        }//endif
      }//endif
    });
    
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
    
    eruser.localGetFBAuthdUser().then(function(isLoggedIn){
      
        if (isLoggedIn){
        removeOne(index);

        // var charts = Immutable.Stack($scope.charts).toOrderedMap();
        // charts = charts.remove(index);
        // charts = Immutable.Stack(charts);
        // setChartScope(charts);
      } else {
        
        if (!index && allExForms.length === 1){
          allExForms = [];
          syncScopeToLocal();
        } else {
          prepForDelete(item, index);
        }
      }//endif
    });
  };

  this.editItem = function(form){
    $timeout(function(){
      $state.transitionTo('root.edit', {formId: form.id});
    });
  };

  // init();


  // var LS = angular.fromJson($window.localStorage.getItem("ERa_/ExForms"));
  // cache.getStoreKeys().then(function(keys){
  //   console.log(keys);
  // });
  });
