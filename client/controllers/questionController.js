
var questionFactory = function($http) {
  var factory = [];
  var numberOfQuestion = 3; // change this

  factory.getQuestions = function(numberOfQuestion, callback) {
    console.log('getQuestions in factory', numberOfQuestion);
    $http.get('/questions/'+ numberOfQuestion).success(function(output) {
        console.log('questionFactory: getQuestions returned obj from server', output);
        callback(output);  //output is the topic list fetched from db
    });          
  };

  factory.submitAnswers = function(answers, questions, user, callback) {
    $http.post('/answers', {answers: answers, questions: questions, name: user}).success(function(output) {
        // output does not need to be the result
        // just redirect to the home page with logged in state
        // just turn on green flag field on the dashboard page
        console.log('questionFactory: submitAnswers returned obj from server', output);
        callback(output);  //output is the topic list fetched from db
    });          
  };

  return factory;
};    

//  orders controller
var questionController = function($scope, questionFactory, dashboardFactory, $location) {
  $scope.submitAnswers = function() {
      // check should be done on html side
      // here just process it

      console.log($scope.questions);

      $scope.answers = [];
      for(question in $scope.questions) {
        console.log($scope.questions[question].answer);
        if($scope.questions[question].answer == null) {
          alert("all question should be answered");
          return;
        }
        $scope.answers.push($scope.questions[question].answer);
      }

      console.log('submitAnswers. before submit', $scope.answers, $scope.questions);
      questionFactory.submitAnswers($scope.answers, $scope.questions, dashboardFactory.getLoggedUser(), function(data) {
        dashboardFactory.setShowFlag(true);
        console.log('setCurrentScore: ', data);
        dashboardFactory.setCurrentScore(data);
        // data is the score
        $location.url('/dashboard');
      });
  };

  $scope.getQuestions = function(numQuestion) {
      // to fill select option menu for customers
      questionFactory.getQuestions(numQuestion, function(data) {
          $scope.questions = data;
          console.log($scope.questions);              
      });                     
  }   

  $scope.cancel = function() {
    $location.url('/dashboard');   
  }

};
