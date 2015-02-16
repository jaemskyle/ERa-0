angular.module('ERChart', ['ionic', 'LocalForageModule', 'firebase', 'mgcrea.ngStrap', 'ErAuth']);

angular.module('ERChart').config(function($stateProvider, $urlRouterProvider, $locationProvider,$localForageProvider) {
  // $locationProvider.html5Mode({
  //   enabled: true,
  //   requireBase: false
  // });

  $stateProvider.state('root', {
    url: '/a',
    templateUrl: 'modules/partial/menu/menu.html',
    abstract: true
  });
  $stateProvider.state('login', {
    url: '/login',
    views: {
      '@': {
        templateUrl: 'modules/partial/login/login.html'
      }
    }
  });
  $stateProvider.state('signup', {
    url: '/signup',
    views: {
      '@': {
        templateUrl: 'modules/partial/signup/signup.html'
      }
    }
  });
  $stateProvider.state('forgot', {
    url: '/forgot',
    views: {
      '@': {
        templateUrl: 'modules/partial/forgot/forgot.html',
        controller: 'ForgotCtrl'
      }
    }
  });
  $stateProvider.state('root.settings', {
    url: '/settings',
    views: {
      'rootContent': {
        templateUrl: 'modules/partial/settings/settings.html'
      }
    }
  });
  $stateProvider.state('root.form', {
    url: '/form',
    views: {
      'rootContent': {
        resolve: {
          'isEditMode': function(){
            return false;
          }
        },
        templateUrl: 'modules/partial/form/form.html',
        controller: 'FormCtrl'
      }
    }
  });
  $stateProvider.state('root.edit', {
    url: '/form/:formId',
    views: {
      'rootContent': {
        resolve: {
          'isEditMode': function(){
            return true;
          }
        },
        templateUrl: 'modules/partial/form/form.html',
        controller: 'FormCtrl'
      }
    }
  });
  $stateProvider.state('root.home', {
    url: '/home',
    views: {
      'rootContent': {
        resolve: {
          // 'waitForAuth': function(Auth){
          //   return Auth.$waitForAuth();
          // }
          'isUserAuthd': function(eruser){
            return angular.isObject(eruser.isUserAuthd());
            // return true;
          }
        },
        templateUrl: 'modules/partial/home/home.html',
        controller: 'HomeCtrl as list'
      }
    }
  });
  $stateProvider.state('pincode', {
    url: '/pincode',
    views: {
      '@': {
        // resolve: {
        //     'waitForAuth': function(Auth){
        //       return Auth.$waitForAuth();
        //     }
        // },
        templateUrl: 'modules/partial/pincode/pincode.html'
      }
    }
    
  });

  $urlRouterProvider.otherwise('/pincode');
  $localForageProvider.setNotify(true, true); // itemSet, itemRemove
  $localForageProvider.config({
    driver: window.localforage.LOCALSTORAGE,
    name        : 'ERa_',
    storeName   : 'ERaLocalStore',
    description : 'ERa local data.'
  });
});

angular.module('ERChart').run(function($rootScope,$state,$stateParams,$log,$firebase,$firebaseAuth,eruser) {

  $rootScope.$state=$state;
  $rootScope.$stateParams=$stateParams;
  $rootScope.$on('$stateChangeStart', 
                 function(event, toState, toParams, fromState, fromParams){
                   // $log.info('--StateChangeStart--- '+angular.toJson(event));
                 });
  $rootScope.$on('$stateChangeSuccess', 
                 function(event, toState, toParams, fromState, fromParams){
                   // $log.info('---StateChangeSuccess--- '+angular.toJson(event));
                 });
  $rootScope.$on('$stateChangeError', 
                 function(event, toState, toParams, fromState, fromParams){
                   $log.error('event '+ angular.toJson(event) );
                   $state.go('login');
                 });


  $rootScope.safeApply = function(fn) {
    var phase = $rootScope.$$phase;
    if (phase === '$apply' || phase === '$digest') {
      if (fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  ionic.Platform.ready(function(){
    document.addEventListener("resume", handleOnResume, false);
    document.addEventListener("pause", handleOnPause, false);
  });

  function handleOnResume (){
    $state.is("pincode");
  };
  function handleOnPause (){
    $state.is("pincode");
  };

});
