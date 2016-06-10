
var newQuestionFactory = function($http) {
    var factory = [];

    factory.newQuestion = function(newQuestions, callback) {
      $http.post('/newquestion', newQuestions).success(function(output) {
          callback(output);  //output is the topic list fetched from db
          // if it is successfully added popup alert 'questions are successfully added'
      });          
    };

    return factory;
};    

//  orders controller
var newQuestionController = function($scope, newQuestionFactory, dashboardFactory, $location) {
  $scope.newQuestion = function() {
      // check should be done on html side
      // here just process it
      var q = {question:$scope.question, correctAnswer:$scope.correctAnswer, fakeAnswer1: $scope.fakeAnswer1, fakeAnswer2: $scope.fakeAnswer2, fakeAnswer3: $scope.fakeAnswer3};  
      newQuestionFactory.newQuestion(q, function(data) {
        $location.url('/dashboard');
      });
  };

  $scope.cancel = function() {
      $location.url('/dashboard');  // if user cancel to register new question, goto dashboard
  }

  $scope.getQuestions = function() {
      // to fill select option menu for customers
      newQuestionFactory.getQuestions(function(data) {
          $scope.qustions = data;
          console.log($scope.questions);              
      });                     
  };

  $scope.getLoggedUser = function() {
    $scope.name = dashboardFactory.getLoggedUser();
    console.assert($scope.name != null);
    return $scope.name;      
  }  

  $scope.isValid = function() {
    var q = {question:$scope.question, correctAnswer:$scope.correctAnswer, fakeAnswer1: $scope.fakeAnswer1, fakeAnswer2: $scope.fakeAnswer2, fakeAnswer3: $scope.fakeAnswer3};  

    if(q.question && q.question.length >= 15 &&
      q.correctAnswer && q.correctAnswer.length >= 15 &&
      q.fakeAnswer1 && q.fakeAnswer1.length >= 15 &&
      q.fakeAnswer2 && q.fakeAnswer2.length >= 15 &&
      q.fakeAnswer3 && q.fakeAnswer3.length >= 15) return true;
    return false;      
  }  

};