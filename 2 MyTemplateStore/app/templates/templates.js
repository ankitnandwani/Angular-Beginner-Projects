angular.module('templateStore.templates', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/templates', {
    templateUrl: 'templates/templates.html',
    controller: 'TemplateCtrl'
  })

  .when('/templates/:templateId', {
    templateUrl: 'templates/template-details.html',
    controller: 'TemplateDetailsCtrl'
  })
}])

.controller('TemplateCtrl', ['$http', '$scope', function($http, $scope){
  $http.get('json/templates.json').then(function(response){
    $scope.temps = response.data;
  });
}])

.controller('TemplateDetailsCtrl', ['$http', '$scope', '$routeParams', '$filter', function($http, $scope, $routeParams, $filter){
  var templateId = $routeParams.templateId;
  $http.get('json/templates.json').then(function(response){
    $scope.template = $filter('filter')(response.data, function(d){
      return d.id == templateId;
    })[0];

    $scope.mainImage = $scope.template.images[0].url;
  });

  $scope.setImage = function(image){
    $scope.mainImage = image.url;
  }
}]);
