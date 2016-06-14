
var answerFactory = function($http) {
  var factory = [];

  factory.newAnswer = function(newAnswer, callback) {
    console.log('newAnswer in factory', newAnswer);
    $http.post('/newanswer', newAnswer).success(function(output) {
        console.log('answerFactory: newAnswer returned', output);
        callback(output);  //output is the topic list fetched from db
    });          
  };

  factory.like = function(answer, callback) {
    console.log('like in factory', answer);
    $http.post('/answer/like', answer).success(function(output) {
        console.log('answerFactory: result returned obj from server', output);
        callback(output);  //output is the topic list fetched from db
    });          
  };    
  return factory;
};    

//  orders controller
var answerController = function($scope, answerFactory, questionFactory, dashboardFactory, $location, $routeParams) {

  $scope.newAnswer = function() {
      // to fill select option menu for customers
      $scope.newanswer._question = $scope.question._id;
      $scope.newanswer.like = 0;
      $scope.newanswer._user = dashboardFactory.getLoggedUser()._id;
      console.log('$scope.newanswer._user = ', $scope.newanswer._user);
      answerFactory.newAnswer($scope.newanswer, function(data) {
          $location.path('/#dashboard');              
      });                     
  };   

  $scope.cancel = function() {
    $location.path('/dashboard');   
  };

  $scope.getQuestion = function() {
      $scope.question = {};
      $scope.question._id = $routeParams.id;
      console.log('answerController getQuestion id=', $scope.question._id);
      // to fill select option menu for customers
      questionFactory.getQuestion($scope.question, function(data) {
          console.log(data);          
          $scope.question = data;          
      });       
  };

  $scope.isValid = function() {
    var newanswer = $scope.newanswer;
    if(!newanswer) return false;  // at first newquestion is 'undefined'

    if(newanswer.comment && newanswer.comment.length >= 15) return true;
    else return false;      
  };    
};
