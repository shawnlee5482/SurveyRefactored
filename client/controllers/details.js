
var detailsFactory = function($http) {
    var factory = {};

    factory.getDetails = function(id, callback) {
      $http.get('/survey/' + id).success(function(output) {
          // here only take out one here
          callback(output);
      });          
    };

    factory.mark = function(id, option,  callback) {
      $http.post('/mark', {id: id, option: option}).success(function(output) {
          // here only take out one here
          callback(output);
      });          
    };

    return factory;
};    

//  orders controller
var detailsController = function($scope, loginFactory, detailsFactory, $location, $routeParams) {
  $scope.currentSurvey = $routeParams.id;
  $scope.getDetails = function() {
    detailsFactory.getDetails($routeParams.id, function(data) {
      console.log('detailsController getDetails return from server = ', data);
      $scope.details = data;
    });     
  };

  $scope.mark = function(option) {
    // update in the database frist and then update the UI
    console.log('details controller mark = ', $scope.currentSurvey, option);
    detailsFactory.mark($scope.currentSurvey, option, function(result) {
      console.log('details controller mark server returned: ', result);
      $scope.details.votes[option]++;
      console.log('details controller votes: ', $scope.details.votes);
    });
  };
};