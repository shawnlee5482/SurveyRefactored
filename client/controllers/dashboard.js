
var dashboardController = function ($scope, loginFactory, surveyFactory, $location)
{
  // user management  => same for all application
  $scope.loggedUser = loginFactory.getLoggedUser();

  $scope.getSurveyLists = function() {
    // dashboardFactory.getSurveyLists(function(results) {
    //   console.log('DashboardController getSurveyLists ', results);
    //   $scope.surveyList = results;
    // });
    $scope.surveyList = surveyFactory.query(function() {
      console.log($scope.surveyList);
    }); 
  };   

  $scope.delete = function(id) {
    // dashboardFactory.delete(id, function(result) {
    //   dashboardFactory.getSurveyLists(function(results) {
    //     console.log('DashboardController getSurveyLists ', results);
    //     $scope.surveyList = results;
    //   });
    // });
// $scope.entry = Movie.get({ id: $scope.id }, function() {
//   // $scope.entry is fetched from server and is an instance of Entry
//   $scope.entry.data = 'something else';
//   $scope.entry.$delete(function() {
//     //gone forever!
//   });
// });
    $scope.entry = surveyFactory.get({id:id}, function() {
      console.log('$scope.entry=', $scope.entry);
      $scope.entry.$delete(function() {
        $scope.surveyList = surveyFactory.query(function() {
          console.log($scope.surveyList);
        }); 
      });
    })
  };

  $scope.logOut = function() {
    loginFactory.logout();
    $location.path('/');
  };

  $scope.isDeletable = function(survey) {
    if(survey._creator._id == $scope.loggedUser._id) return true;
    else return false;
  }
}