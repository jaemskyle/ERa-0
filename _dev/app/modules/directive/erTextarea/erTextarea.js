angular.module('ERChart').directive('erTextarea', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
      chartModel: "="
		},
		templateUrl: './modules/directive/erTextarea/erTextarea.html',
		link: function(scope, element, attrs, fn) {
      console.log(scope)
		}
	};
});
