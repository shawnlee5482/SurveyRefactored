var dashboardFactory = function($http) {
  var factory = {loggedUserName: ""};

  // local
  factory.setLoggedUser = function(name) {
    factory.loggedUserName = name;
  };

  // local
  factory.getLoggedUser = function() {
    return factory.loggedUserName;
  };

  factory.setCurrentScore = function(score) {
    factory.currentScore = score;
  };

  factory.getCurrentScore = function() {
    return factory.currentScore;
  }

  factory.setShowFlag = function(flag) {
    factory.showFlag = flag;
  };

  factory.getShowFlag = function() {
    return factory.showFlag;
  }
  // local
  factory.logOut = function() {
    factory.loggedUserName = ''; // set it back to null
    factory.showFlag = false;
  };

  // ajax
  factory.getScores = function(callback) {
    $http.get('/scores').success(function(output) {
        console.log('dashboardFactory: getScores returned obj from server', output);
        callback(output);  //output is the topic list fetched from db
    });  
  };

  return factory;
}

var dashboardController = function ($scope, dashboardFactory, $location)
{
  $scope.setLoggedUser = function(name) {
    dashboardFactory.setLoggedUser(name);
    $scope.loggedUser = dashboardFactory.getLoggedUser();
  };

  $scope.logIn = function() {
    var name = prompt('Input your name');
    if(name) {
      dashboardFactory.setLoggedUser(name);
      $scope.loggedUser = dashboardFactory.getLoggedUser();   
    }     
  }

  $scope.playGame = function() {
    $location.url('/question');  // move to question page
  };

  $scope.getShowResult = function() {
    return dashboardFactory.getShowFlag();
  }

  $scope.getLoggedUser = function() {
    $scope.name = dashboardFactory.getLoggedUser();
    if($scope.name) return $scope.name;
    else return false;
  }

  $scope.getCurrentScore = function() {
    $scope.currentScore = dashboardFactory.getCurrentScore();;
  }

  $scope.getScores = function() {
    dashboardFactory.getScores(function(data) {
      $scope.scores = data;
    });
  }

  $scope.logOut = function() {
    dashboardFactory.logOut();
    $scope.name = dashboardFactory.getLoggedUser();
  }
}