var dashboardFactory = function($http) {
  var factory = {loggedUser: null};

  // local
  factory.getSurveyLists = function(callback) {
    $http.get('/surveylist').success(function(output) {
        callback(output);  //output is the topic list fetched from db
        // if it is successfully added popup alert 'questions are successfully added'
    });          
  };
  factory.delete = function(id, callback) {
    $http.get('/delete/'+ id).success(function(output) {
        callback(output);  //output is the topic list fetched from db
        // if it is successfully added popup alert 'questions are successfully added'
    });          
  };
  return factory;
}

var dashboardController = function ($scope, loginFactory, dashboardFactory, $location)
{
  // user management  => same for all application
  $scope.loggedUser = loginFactory.getLoggedUser();

  $scope.getSurveyLists = function() {
    dashboardFactory.getSurveyLists(function(results) {
      console.log('DashboardController getSurveyLists ', results);
      $scope.surveyList = results;
    });
  };   

  $scope.delete = function(id) {
    dashboardFactory.delete(id, function(result) {
      dashboardFactory.getSurveyLists(function(results) {
        console.log('DashboardController getSurveyLists ', results);
        $scope.surveyList = results;
      });
    });
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