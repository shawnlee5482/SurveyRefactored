var dashboardFactory = function($http) {
  var factory = {loggedUser: null};

  // local
  factory.getBucketLists = function(id, callback) {
    console.log('bucketList factory getBucketList', id);
    $http.get('/bucketlist/'+ id).success(function(output) {
        callback(output);  //output is the topic list fetched from db
        // if it is successfully added popup alert 'questions are successfully added'
    });          
  };

  factory.getUserLists = function(callback) {
    console.log('dashboard factory getUserLists');
    $http.get('/user').success(function(output) {
        console.log('djsssssssssssssssssssssssssss', output);
        callback(output);  //output is the topic list fetched from db
        // if it is successfully added popup alert 'questions are successfully added'
    });  
  }; 

  factory.addNewBucketList = function(newBucketList, callback) {
    console.log('dashboard factory addNewBucketList');
    $http.post('/newbucketlist', newBucketList).success(function(output) {
        console.log('newbucketlist', output);
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
        console.log('mark', output);
        callback(output);  //output is the topic list fetched from db
        // if it is successfully added popup alert 'questions are successfully added'
      });  
  };     

  return factory;
}

var dashboardController = function ($scope, loginFactory, bucketListFactory, dashboardFactory, $location)
{
  // user management  => same for all application
  $scope.getLoggedUser = function() {
    $scope.loggedUser = dashboardFactory.getLoggedUser();
    return $scope.loggedUser;
  };

  $scope.setLoggedUser = function(name) {
    dashboardFactory.setLoggedUser(name);
  };

  $scope.logIn = function() {
    var name = prompt('Input your name');
    if(name) {
      dashboardFactory.setLoggedUser(name);  // give name to factory
      $scope.loggedUser = dashboardFactory.getLoggedUser();   
      $location.path('/#question');  //after login goto question page
    }     
  };

  $scope.logOut = function() {
    dashboardFactory.logOut();
    $scope.name = dashboardFactory.getLoggedUser();
  };

  $scope.getUserLists = function() {
    console.log('DashboardController getUserLists');
    dashboardFactory.getUserLists(function(result) {
      $scope.users = result;
      console.log('dashboardcontroller getuserlist response from sever', $scope.users);
    });
  }; 

  $scope.getPartnerLists = function() {
    console.log('DashboardController getPartnerLists');
    dashboardFactory.getUserLists(function(result) {
      // remove current user
      $scope.partners = result;

      if(result && $scope.loggedUser) {
        var res = [];

        for(var i = 0; i < $scope.partners.length; i++) {
          if($scope.partners[i]._id != $scope.loggedUser._id) res.push($scope.partners[i]);
        }
        $scope.partners = res;

        console.log('dashboardcontroller getjparetnerlist response from sever', $scope.partners);
      }
    });
  }; 

  $scope.getBucketLists = function() {
    console.log('logged user in getBucketList', loginFactory.getLoggedUser());
    dashboardFactory.getBucketLists(loginFactory.getLoggedUser()._id, function(result) {
      $scope.bucketLists = result;
      $scope.loggedUserName = loginFactory.getLoggedUser().name;
    });
  };   

  $scope.addNewBucketList = function(newBucketList) {
    newBucketList._user = loginFactory.getLoggedUser()._id;
    if($scope.partner) newBucketList._partner = $scope.partner._id;
    newBucketList.done = false;
    console.log('addNewBucketList', newBucketList);
    dashboardFactory.addNewBucketList(newBucketList, function(result) {
      $scope.getBucketLists();
    });
  };   

  $scope.mark = function(bucketList) {
    dashboardFactory.mark(bucketList, function(output) {
      $scope.getBucketLists();
    });    
  };
}