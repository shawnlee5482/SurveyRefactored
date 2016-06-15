
var bucketListFactory = function($http) {
    var factory = [];

    factory.getBucketLists = function(id, callback) {
      console.log('bucketList for user factory getBucketList', id);
      $http.get('/bucketlist/'+ id).success(function(output) {
          callback(output);  //output is the topic list fetched from db
          // if it is successfully added popup alert 'questions are successfully added'
      });          
    };

    return factory;
};    

//  orders controller
var bucketListController = function($scope, bucketListFactory, $location, $routeParams) {
  $scope.getBucketLists = function() {
      console.log('bucketlist  for user controller getBucketLists = ', $routeParams.id);
      bucketListFactory.getBucketLists($routeParams.id, function(data) {
        $scope.bucketLists = data;
      });     
  };
};