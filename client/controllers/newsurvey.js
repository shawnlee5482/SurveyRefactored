var newSurveyFactory = function($http) {
  // local
  var factory = {};

  factory.addNewSurvey = function(newSurvey, callback) {
    $http.post('/newsurvey', newSurvey).success(function(output) {
        callback(output);  //output is the topic list fetched from db
        // if it is successfully added popup alert 'questions are successfully added'
    });          
  };

  return factory;
}

var newSurveyController = function ($scope, loginFactory, newSurveyFactory, $location)
{
  $scope.newSurvey = {options: []};

  $scope.addNewSurvey = function() {
  	if(loginFactory.getLoggedUser() == null) {
  		alert('you should login first to add new survey');
  		return;
  	}
// var SurveySchema = new mongoose.Schema({
//   _creator: {type: Schema.Types.ObjectId, ref: 'Users'},  
//   question: String, 
//   options: [String],
//   votes: [Number]
// }, {timestamps: true});
  	$scope.newSurvey._creator = loginFactory.getLoggedUser();
  	$scope.newSurvey.votes = [0, 0, 0, 0];

  	$scope.newSurvey.options.push($scope.newSurvey.option1);
  	$scope.newSurvey.options.push($scope.newSurvey.option2);
  	$scope.newSurvey.options.push($scope.newSurvey.option3);
  	$scope.newSurvey.options.push($scope.newSurvey.option4);


    newSurveyFactory.addNewSurvey($scope.newSurvey, function(results) {
      console.log('DashboardController addNewSurvey result from server =  ', results);
    });
    $location.path('/dashboard');
  };   

  $scope.logOut = function() {
    loginFactory.logout();
    $location.path('/');
  };

  $scope.cancel = function() {
  	$location.path('/dashboard');
  }

  $scope.isValid = function() {
  	if($scope.newSurvey.question == null || $scope.newSurvey.question.length < 8) return false;
  	if($scope.newSurvey.option1 == null || $scope.newSurvey.option1.length < 3) return false;
    if($scope.newSurvey.option2 == null || $scope.newSurvey.option2.length < 3) return false;
    if($scope.newSurvey.option3 == null || $scope.newSurvey.option3.length < 3) return false;
    if($scope.newSurvey.option4 == null || $scope.newSurvey.option4.length < 3) return false;
  	return true;
  }
}