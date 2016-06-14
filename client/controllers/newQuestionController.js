
var newQuestionFactory = function($http) {
    var factory = [];

    factory.newQuestion = function(newquestion, callback) {
      console.log('controllers newquestion factory', newquestion);
      $http.post('/newquestion', newquestion).success(function(output) {
          callback(output);  //output is the topic list fetched from db
          // if it is successfully added popup alert 'questions are successfully added'
      });          
    };

    return factory;
};    

//  orders controller
var newQuestionController = function($scope, newQuestionFactory, dashboardFactory, $location) {
  var newquestion = {};

  $scope.addNewQuestion = function() {
      $scope.newquestion.creator = dashboardFactory.getLoggedUser()._id;
      newQuestionFactory.newQuestion($scope.newquestion, function(data) {
        $location.path('/dashboard');
      });
  };

  $scope.cancel = function() {
      $location.path('/dashboard');  // if user cancel to register new question, goto dashboard
  }

  $scope.isValid = function() {
    var newquestion = $scope.newquestion;
    if(!newquestion) return false;  // at first newquestion is 'undefined'

    if(newquestion.title && newquestion.title.length >= 15) return true;
    else return false;      
  }  
};