
var questionFactory = function($http) {
  var factory = [];

  factory.getQuestion = function(id, callback) {
    console.log('getQuestion in factory', id);
    $http.get('/question/'+ id).success(function(output) {
        console.log('questionFactory: getQuestions returned obj from server', output);
        callback(output);  //output is the topic list fetched from db
    });          
  };

  return factory;
};    

//  orders controller
var questionController = function($scope, answerFactory, questionFactory, dashboardFactory, $routeParams, $location) {  
  $scope.getQuestion = function() {
      console.log('questionController getQuestion id=', $routeParams.id);
      // to fill select option menu for customers
      questionFactory.getQuestion($routeParams.id, function(data) {
          console.log(data);          
          $scope.question = data;          
      });                     
  };

  $scope.like = function(answer) {
      console.log('question Controller like ', answer);
      answerFactory.like(answer, function(result) {
         console.log('result returned froms server for like = ', result);
         for(var i = 0; i < $scope.question._answers.length; i++) {
          if(answer._id == $scope.question._answers[i]._id) {
            $scope.question._answers[i].like = result.like;
            break;
          }
         }
      });
  }   
};
