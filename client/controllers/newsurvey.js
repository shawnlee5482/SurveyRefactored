
var newSurveyController = function ($scope, loginFactory, surveyFactory, $location)
{
  $scope.newSurvey = {};
  $scope.newSurvey.options = new Array(4);  // option number is 4

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
    console.log($scope.newSurvey.options);

    surveyFactory.save($scope.newSurvey, function(results) {
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
  	for(var i = 0; i < 4; i++) {
      if($scope.newSurvey.options[i] == null || $scope.newSurvey.options[i].length < 3) return false;
    }
  	return true;
  }
}