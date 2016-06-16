
var bucketListFactory = function($http) {
    var factory = [];

    factory.getBucketLists = function(id, callback) {
      $http.get('/bucketlist/'+ id).success(function(output) {
          callback(output);  //output is the topic list fetched from db
          // if it is successfully added popup alert 'questions are successfully added'
      });          
    };

    return factory;
};    

//  orders controller
var bucketListController = function($scope, loginFactory,  bucketListFactory, $location, $routeParams) {
  $scope.getBucketLists = function() {
      bucketListFactory.getBucketLists($routeParams.id, function(data) {
        console.log('bucketListController getBucketLists return from server = ', data);
        $scope.bucketLists = data;
        console.log('enable ', loginFactory.loggedUser._id, $routeParams.id);
        if(loginFactory.loggedUser._id == $routeParams.id) {
          console.log('editable is true');
          $scope.editable = true;
        } else {
          $scope.editable = false;
          console.log('editable is false');
        }
      });     
  };
};