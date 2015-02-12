describe('FormCtrl', function() {

  var $rootScope, $scope, $state, $injector, isEditMode, state = 'root.form', $controller, $templateCache, templates, erutils;

  beforeEach(module('ERChart'));
  beforeEach(module('templates'));
  beforeEach(
    inject(function(_$rootScope_, _$state_, _$injector_, _$templateCache_){
      $injector = _$injector_;
      erutils = $injector.get('erutils');
      $rootScope = _$rootScope_;
      $state = _$state_;
      $templateCache = _$templateCache_;
      $controller = $injector.get('$controller');
      $scope = $rootScope.$new();

      spyOn(erutils, 'broadcastPageEvent').andReturn('isEdit');
    })
  );

  it('should go to resolve isEditMode', function(){
    var isEditMode = true;
    $controller('FormCtrl', { $scope: $scope, isEditMode:isEditMode});
    $rootScope.$digest();
    expect(isEditMode).toBeTruthy();
  });

  it('should broadcast isEdit when editting', function() {
    var isEditMode = true;
    $controller('FormCtrl', { $scope: $scope, isEditMode:isEditMode});
    $rootScope.$digest();
    expect(erutils.broadcastPageEvent).toHaveBeenCalledWith('isEdit');
  });


  


});
