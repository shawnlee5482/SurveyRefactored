

//  orders controller
var detailsController = function($scope, loginFactory, surveyFactory, $location, $routeParams) {
  $scope.currentSurvey = $routeParams.id;
  $scope.getDetails = function() {
    surveyFactory.get({id:$routeParams.id}, function(data) {
      console.log('detailsController getDetails return from server = ', data);
      $scope.details = data;
    });     
  };

  $scope.mark = function(option) {
    // update in the database frist and then update the UI
    console.log('details controller mark = ', $scope.currentSurvey, option);
    // detailsFactory.mark($scope.currentSurvey, option, function(result) {
    //   console.log('details controller mark server returned: ', result);
    //   $scope.details.votes[option]++;
    //   console.log('details controller votes: ', $scope.details.votes);
    // });
    $scope.entry = surveyFactory.get({id:$scope.currentSurvey}, function(data) {
      $scope.entry.votes[option]++;
      $scope.entry.$update(function(result) {
        console.log('detailsController update return from server = ', result);
        surveyFactory.get({id:$scope.currentSurvey}, function(data) {
          console.log('detailsController getDetails return from server = ', data);
          $scope.details = data;
        }); 
      });
    });     
  };
};