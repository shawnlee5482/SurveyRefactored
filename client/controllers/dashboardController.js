var dashboardFactory = function($http) {
  var factory = {loggedUser: null};

  // local
  factory.getBucketLists = function(id, callback) {
    $http.get('/bucketlist/'+ id).success(function(output) {
        callback(output);  //output is the topic list fetched from db
        // if it is successfully added popup alert 'questions are successfully added'
    });          
  };

  factory.getUserLists = function(callback) {
    $http.get('/user').success(function(output) {
        callback(output);  //output is the topic list fetched from db
        // if it is successfully added popup alert 'questions are successfully added'
    });  
  }; 

  factory.addNewBucketList = function(newBucketList, callback) {
    $http.post('/newbucketlist', newBucketList).success(function(output) {
        callback(output);  //output is the topic list fetched from db
        // if it is successfully added popup alert 'questions are successfully added'
    });  
  }; 

  factory.logOut = function() {
    factory.loggedUser = null;
  };

  // local
  factory.getLoggedUser = function() {
    return factory.loggedUser;
  };

  factory.mark = function(bucketList, callback) {
      $http.get('/mark/'+ bucketList._id).success(function(output) {
        callback(output);  //output is the topic list fetched from db
        // if it is successfully added popup alert 'questions are successfully added'
      });  
  };     

  return factory;
}

var dashboardController = function ($scope, loginFactory, bucketListFactory, dashboardFactory, $location)
{
  // user management  => same for all application
  $scope.loggedUser = loginFactory.getLoggedUser();

  $scope.getUserLists = function() {
    dashboardFactory.getUserLists(function(result) {
      console.log('DashboardController getUserLists ', result);
      $scope.users = result;
      console.log('dashboardcontroller getuserlist response from sever', $scope.users);
    });
  }; 

  $scope.getPartnerLists = function() {
    
    dashboardFactory.getUserLists(function(results) {
      console.log('DashboardController getPartnerLists ', results);
      // remove current user

      var res = [];
      console.log('current logged user = ', loginFactory.getLoggedUser());

      for(var i = 0; i < results.length; i++) {
        if(results[i]._id != loginFactory.getLoggedUser()._id) res.push(results[i]);
      }
      $scope.partners = res;
      console.log('dashboardcontroller getjparetnerlist response from sever', $scope.partners);
    });
  }; 

  $scope.getBucketLists = function() {
    console.log('dashboardController getBucketList user= ', loginFactory.getLoggedUser());
    dashboardFactory.getBucketLists(loginFactory.getLoggedUser()._id, function(result) {
      console.log('dashboardController getBucketList response from server = ', result);      
      $scope.bucketLists = result;
      $scope.loggedUserName = loginFactory.getLoggedUser().name;
    });
  };   

  $scope.addNewBucketList = function(newBucketList) {
    newBucketList._user = loginFactory.getLoggedUser()._id;
    if($scope.partner) newBucketList._partner = $scope.partner._id;
    newBucketList.done = false;

    dashboardFactory.addNewBucketList(newBucketList, function(result) {
      console.log('addNewBucketList return form server: ', newBucketList);
      $scope.getBucketLists();
    });
  };

  $scope.isValid = function() {
    var newBucketList = $scope.newBucketList;
    if(!newBucketList) return false;
    if(!newBucketList.title || newBucketList.title.length < 5) return false;
    if(!newBucketList.description || newBucketList.description.length < 10) return false;
    return true;
  };

  $scope.mark = function(bucketList) {
    dashboardFactory.mark(bucketList, function(output) {
      $scope.getBucketLists();
    });    
  };
}