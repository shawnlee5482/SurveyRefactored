
var loginFactory = function($http) {
  var factory = {};

  factory.loggedUser = null;

  // ajax
  factory.getLoggedUser= function() {
    return factory.loggedUser; 
  };

  factory.login = function(user, callback) {
    $http.post('/user', user).success(function(output) {
        callback(output);
        factory.loggedUser = output;  //output is the topic list fetched from db
    });  
  };

  factory.logout = function(user, callback) {
    factory.loggedUser = null; 
  };

  return factory;
};    

//  orders controller
var loginController = function($scope, loginFactory, $routeParams, $location) {
  // user management  => same for all application
  $scope.user = {};

  $scope.login = function() {
    loginFactory.login($scope.user, function(data) {
      console.log('loginController response from server: ', data);
      // we should move to dashboard page in the callback      
      $location.path("/dashboard");
    });
  };

  $scope.getLoggedUser= function() {
    return loginFactory.getLoggedUser(); 
  };    
};

