"use strict";
angular.module('ERChart').factory('cache',function($localForage, $rootScope) {
  var userRecord = Immutable.Record({
    _fbuid: null,
    cred: {
      name: null,
      hospital: null,
      province: null
    },
    charts: []
  });

	var cache = {
    setChartStore: function(userKey, collection){
      return $localForage.setItem(userKey, collection);
    },
    getChartStore: function(userKey){
      return $localForage.getItem(userKey);
    },
    getStoreLength: function () {
      return $localForage.length();
    },
    getStoreKeys: function () {
      return $localForage.keys();
    },
    writeLocalData: function (data) {
      return $localForage.setItem('ExForms', data);
    },
    getLocalData: function () {
      return $localForage.getItem('ExForms');
    },
    clearCachedItem: function (item) {
      return $localForage.removeItem(item);
    },
    clearAllCached: function () {
      return $localForage.clear();
    },
    broadcastCacheEvent: function (eventType) {
      console.log('broadcasting: ' + eventType);
      $rootScope.$broadcast('CacheUpdate:' + eventType);
    }
  };

	return cache;
});
