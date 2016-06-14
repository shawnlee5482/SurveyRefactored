var dashboardFactory = function($http) {
  var factory = {};

  // local
  factory.setLoggedUser = function(name) {
    console.log('factory.setLoggedUser: ', name);
    $http.post('/user', {name: name}).success(function(output) {
        factory.loggedUser = output;
        console.log('dashboardController seetLoggedUser result from server ', factory.loggedUser);
    });     
  };

  factory.logOut = function() {
    factory.loggedUser = null;
  }

  // local
  factory.getLoggedUser = function() {
    return factory.loggedUser;
  };

  // ajax
  factory.getQuestions = function(callback) {
    $http.get('/questions').success(function(output) {
        console.log('dashboard getquestions: ', output);
        callback(output);  //output is the topic list fetched from db
    });  
  };

  return factory;
}

var dashboardController = function ($scope, dashboardFactory, $location)
{
  // user management  => same for all application
  $scope.getLoggedUser = function() {
    $scope.loggedUser = dashboardFactory.getLoggedUser();
    return $scope.loggedUser;
  };

  $scope.setLoggedUser = function(name) {
    dashboardFactory.setLoggedUser(name);
  };

  $scope.logIn = function() {
    var name = prompt('Input your name');
    if(name) {
      dashboardFactory.setLoggedUser(name);  // give name to factory
      $scope.loggedUser = dashboardFactory.getLoggedUser();   
      $location.path('/#question');  //after login goto question page
    }     
  };

  $scope.logOut = function() {
    dashboardFactory.logOut();
    $scope.name = dashboardFactory.getLoggedUser();
  };

  $scope.getQuestions = function() {
    dashboardFactory.getQuestions(function(result) {
      $scope.questions = result;
    });
  };  
}