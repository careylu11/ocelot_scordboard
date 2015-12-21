var potatoNews = angular.module('potatoNews', ['ui.router'])

potatoNews.config([
'$stateProvider',
'$urlRouterProvider',
'$locationProvider',
function($stateProvider, $urlRouterProvider, $locationProvider) {
//resolve ensures that any time home is entered, we always load all of the posts
//before the state finishes loading.  a blocking preload?
//more info at
//https://github.com/angular-ui/ui-router/wiki
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
          postPromise: ['posts', function (posts) {
              return posts.getAll();
          }],
          recordPromise: ['records', function (records) {
              return records.getAll();
          }]
      }
    })
    .state('posts', {
        url: '/posts/:id',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl',
        resolve: {
            post: ['$stateParams', 'posts', function ($stateParams, posts) {
                return posts.get($stateParams.id);
            }]
        }
      
    },'records', {
        url: '/records/:id',
        templateUrl: '/records.html',
        controller: 'RecordsCtrl',
        resolve: {
            post: ['$stateParams', 'records', function ($stateParams, records) {
                return records.get($stateParams.id);
            }]
        }
      
    });
  
  $urlRouterProvider.otherwise('home');
  
  //$locationProvider.html5Mode(true);
  
}]);

potatoNews.factory('posts', ['$http', function ($http){
    var o = {
        posts: []
    };
    //query the '/posts' route and, with .success(),
    //bind a function for when that request returns
    //the posts route returns a list, so we just copy that into the
    //client side posts object
    //using angular.copy() makes ui update properly
    o.getAll = function() {
        return $http.get('/posts').success(function (data) {
            angular.copy(data, o.posts);
        });
    };
    //now we'll need to create new posts
    //uses the router.post in index.js to post a new Post mongoose model to mongodb
    //when $http gets a success back, it adds this post to the posts object in
    //this local factory, so the mongodb and angular data is the same
    //sweet!
    o.create = function(post) {
        return $http.post('/posts', post).success(function (data) {
            o.posts.push(data);
        });
    };
    //upvotes
    o.upvote = function (post) {
        //use the express route for this post's id to add an upvote to it in the mongo model
        return $http.put('/posts/' + post._id + '/upvote')
            .success(function (data) {
                //if we know it worked on the backend, update frontend
                post.wins += 1;
            });
    };

    //Add win against Luke
    o.addWinAgainstLuke = function (post) {
        //use the express route for this post's id to add an upvote to it in the mongo model
        return $http.put('/posts/' + post._id + '/addWinAgainstLuke')
            .success(function (data) {
                //if we know it worked on the backend, update frontend
                post.winsAgainstLuke += 1;
            });
    };
    //Add win against Kevin
    o.addWinAgainstKevin = function (post) {
        //use the express route for this post's id to add an upvote to it in the mongo model
        return $http.put('/posts/' + post._id + '/addWinAgainstKevin')
            .success(function (data) {
                //if we know it worked on the backend, update frontend
                post.winsAgainstKevin += 1;
            });
    };
    //Add win against Bill
    o.addWinAgainstBill = function (post) {
        //use the express route for this post's id to add an upvote to it in the mongo model
        return $http.put('/posts/' + post._id + '/addWinAgainstBill')
            .success(function (data) {
                //if we know it worked on the backend, update frontend
                post.winsAgainstBill += 1;
            });
    };
    //Add win against Geoff
    o.addWinAgainstGeoff = function (post) {
        //use the express route for this post's id to add an upvote to it in the mongo model
        return $http.put('/posts/' + post._id + '/addWinAgainstGeoff')
            .success(function (data) {
                //if we know it worked on the backend, update frontend
                post.winsAgainstGeoff += 1;
            });
    };
    //Add win against Luke
    o.addWinAgainstLuke = function (post) {
        //use the express route for this post's id to add an upvote to it in the mongo model
        return $http.put('/posts/' + post._id + '/addWinAgainstLuke')
            .success(function (data) {
                //if we know it worked on the backend, update frontend
                post.winsAgainstJake += 1;
            });
    };
    //Add loss to Luke
    o.addLossToLuke = function (post) {
        //use the express route for this post's id to add an upvote to it in the mongo model
        return $http.put('/posts/' + post._id + '/addLossToLuke')
            .success(function (data) {
                //if we know it worked on the backend, update frontend
                post.lossesToLuke += 1;
            });
    };
    //Add loss to Bill
    o.addLossToBill = function (post) {
        //use the express route for this post's id to add an upvote to it in the mongo model
        return $http.put('/posts/' + post._id + '/addLossToBill')
            .success(function (data) {
                //if we know it worked on the backend, update frontend
                post.lossesToBill += 1;
            });
    };
    //Add loss to Kevin
    o.addLossToKevin = function (post) {
        //use the express route for this post's id to add an upvote to it in the mongo model
        return $http.put('/posts/' + post._id + '/addLossToKevin')
            .success(function (data) {
                //if we know it worked on the backend, update frontend
                post.lossesToKevin += 1;
            });
    };
    //Add loss to Geoff
    o.addLossToGeoff = function (post) {
        //use the express route for this post's id to add an upvote to it in the mongo model
        return $http.put('/posts/' + post._id + '/addLossToGeoff')
            .success(function (data) {
                //if we know it worked on the backend, update frontend
                post.lossesToGeoff += 1;
            });
    };
    //Add loss to Jake
    o.addLossToLuke = function (post) {
        //use the express route for this post's id to add an upvote to it in the mongo model
        return $http.put('/posts/' + post._id + '/addLossToJake')
            .success(function (data) {
                //if we know it worked on the backend, update frontend
                post.lossesToJake += 1;
            });
    };
    //Add overtime loss to Luke
    o.addOvertimeLossToLuke = function (post) {
        //use the express route for this post's id to add an upvote to it in the mongo model
        return $http.put('/posts/' + post._id + '/addOvertimeLossToLuke')
            .success(function (data) {
                //if we know it worked on the backend, update frontend
                post.overtimeLossesToLuke += 1;
            });
    };
    //Add overtime loss to Bill
    o.addOvertimeLossToBill = function (post) {
        //use the express route for this post's id to add an upvote to it in the mongo model
        return $http.put('/posts/' + post._id + '/addOvertimeLossToBill')
            .success(function (data) {
                //if we know it worked on the backend, update frontend
                post.overtimeLossesToBill += 1;
            });
    };
        //Add overtime loss to Jake
    o.addOvertimeLossToJake = function (post) {
        //use the express route for this post's id to add an upvote to it in the mongo model
        return $http.put('/posts/' + post._id + '/addOvertimeLossToJake')
            .success(function (data) {
                //if we know it worked on the backend, update frontend
                post.overtimeLossesToJake += 1;
            });
    };
        //Add overtime loss to Geoff
    o.addOvertimeLossToGeoff = function (post) {
        //use the express route for this post's id to add an upvote to it in the mongo model
        return $http.put('/posts/' + post._id + '/addOvertimeLossToGeoff')
            .success(function (data) {
                //if we know it worked on the backend, update frontend
                post.overtimeLossesToGeoff += 1;
            });
    };
    //Add overtime loss to Kevin
    o.addOvertimeLossToKevin = function (post) {
        //use the express route for this post's id to add an upvote to it in the mongo model
        return $http.put('/posts/' + post._id + '/addOvertimeLossToKevin')
            .success(function (data) {
                //if we know it worked on the backend, update frontend
                post.overtimeLossesToKevin += 1;
            });
    };
    //downvotes
    o.downvote = function (post) {
        return $http.put('/posts/' + post._id + '/downvote')
            .success(function (data) {
                post.losses -= 1;
            });
    };
    o.addLoss = function (post) {
        return $http.put('/posts/' + post._id + '/addLoss')
            .success(function (data) {
                post.losses += 1;
            });
    };
    o.addOvertimeLoss = function (post) {
        return $http.put('/posts/' + post._id + '/addOvertimeLoss')
            .success(function (data) {
                post.overtimeLosses += 1;
            });
    };
    //grab a single post from the server
    o.get = function (id) {
        //use the express route to grab this post and return the response
        //from that route, which is a json of the post data
        //.then is a promise, a kind of newly native thing in JS that upon cursory research
        //looks friggin sweet; TODO Learn to use them like a boss.  First, this.
        return $http.get('/posts/' + id).then(function (res) {
            return res.data;
        });
    };
    //comments, once again using express
    o.addComment = function (id, comment) {
        return $http.post('/posts/' + id + '/comments', comment);
    };
    //upvote comments
    o.upvoteComment = function (post, comment) {
        return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote')
            .success(function (data) {
                comment.votes += 1;
            });
    };
    //downvote comments
    //I should really consolidate these into one voteHandler function
    o.downvoteComment = function (post, comment) {
        return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/downvote')
            .success(function (data) {
                comment.votes -= 1;
            });
    };
    return o;
}]);

potatoNews.factory('records', ['$http', function ($http){
    var o = {
        records: []
    };
    //query the '/posts' route and, with .success(),
    //bind a function for when that request returns
    //the posts route returns a list, so we just copy that into the
    //client side posts object
    //using angular.copy() makes ui update properly
    o.getAll = function() {
        return $http.get('/records').success(function (data) {
            angular.copy(data, o.records);
        });
    };
    //now we'll need to create new posts
    //uses the router.post in index.js to post a new Post mongoose model to mongodb
    //when $http gets a success back, it adds this post to the posts object in
    //this local factory, so the mongodb and angular data is the same
    //sweet!
    o.create = function(record) {
        return $http.post('/records', record).success(function (data) {
            o.records.push(data);
        });
    };
    //upvotes
    o.upvote = function (record) {
        //use the express route for this post's id to add an upvote to it in the mongo model
        return $http.put('/records/' + record._id + '/upvote')
            .success(function (data) {
                //if we know it worked on the backend, update frontend
                record.wins += 1;
            });
    };
    //downvotes
    o.downvote = function (record) {
        return $http.put('/records/' + record._id + '/downvote')
            .success(function (data) {
                record.losses -= 1;
            });
    };
    o.addLoss = function (record) {
        return $http.put('/records/' + record._id + '/addLoss')
            .success(function (data) {
                record.losses += 1;
            });
    };
    o.addOvertimeLoss = function (record) {
        return $http.put('/records/' + record._id + '/addOvertimeLoss')
            .success(function (data) {
                record.overtimeLosses += 1;
            });
    };
    //grab a single post from the server
    o.get = function (id) {
        //use the express route to grab this post and return the response
        //from that route, which is a json of the post data
        //.then is a promise, a kind of newly native thing in JS that upon cursory research
        //looks friggin sweet; TODO Learn to use them like a boss.  First, this.
        return $http.get('/posts/' + id).then(function (res) {
            return res.data;
        });
    };
    //comments, once again using express
    o.addComment = function (id, comment) {
        return $http.record('/records/' + id + '/comments', comment);
    };
    return o;
}]);

potatoNews.controller('MainCtrl', [
'$scope',
'posts',
'records',
function($scope, posts, records){
    $scope.posts = posts.posts;
    $scope.records = records.records;
    $scope.overtime = false;
    //setting title to blank here to prevent empty posts
    $scope.title = '';
    
    $scope.addPost = function(){
        if($scope.name.length === 0) {
            alert('Name is required!');
            return;
        }
                 
        posts.create({
            name: $scope.name,
            deleted: false,
        });
        //clear the values
        $scope.title = '';
        $scope.link = '';
        $scope.winnerGoals = null;
        $scope.loserGoals = null;
    };
    
    $scope.enterResult = function(){
    
        debugger;
    		//Validity Checking:
    		if($scope.winner.length === 0) {
            alert('Winner is required!');
            return;
        }
        if($scope.loser.length === 0) {
            alert('Loser is required!');
            return;
        }
        if($scope.winnerGoals === null) {
            alert('Winner Goals is needed!');
            return;
        }
        if($scope.loser === $scope.winner){
            alert('Winner and loser cannot be the same!');
            return;
        }
        
        
        $scope.posts.forEach(function(post) {
          if (post._id === $scope.winner._id) {
              //found winner
              posts.upvote(post);
              //if kevin is the winner, give kevin a win against the loser.
              if($scope.winner.name == "Kevin")
              {
                  debugger;
                  if($scope.loser.name == "Luke")
                  {
                      debugger;
                      posts.addWinAgainstLuke(post);
                  }
                  else if($scope.loser.name == "Bill")
                  {
                      posts.addWinAgainstBill(post);
                  }
                  else if($scope.loser.name == "Jake")
                  {
                      posts.addWinAgainstJake(post);
                  }
                  else if($scope.loser.name == "Geoff")
                  {
                      posts.addWinAgainstGeoff(post);
                  }
              }
              else if($scope.winner.name == "Luke")
              {
                  if($scope.loser.name == "Kevin")
                  {
                      debugger;
                      posts.addWinAgainstKevin(post);
                  }
                  else if($scope.loser.name == "Bill")
                  {
                      posts.addWinAgainstBill(post);
                  }
                  else if($scope.loser.name == "Jake")
                  {
                      posts.addWinAgainstJake(post);
                  }
                  else if($scope.loser.name == "Geoff")
                  {
                      posts.addWinAgainstGeoff(post);
                  }
              }
              else if($scope.winner.name == "Bill")
              {
                  if($scope.loser.name == "Luke")
                  {
                      debugger;
                      posts.addWinAgainstLuke(post);
                  }
                  else if($scope.loser.name == "Kevin")
                  {
                      posts.addWinAgainstKevin(post);
                  }
                  else if($scope.loser.name == "Jake")
                  {
                      posts.addWinAgainstJake(post);
                  }
                  else if($scope.loser.name == "Geoff")
                  {
                      posts.addWinAgainstGeoff(post);
                  }
              }
              else if($scope.winner.name == "Jake")
              {
                  debugger;
                  if($scope.loser.name == "Luke")
                  {
                      debugger;
                      posts.addWinAgainstLuke(post);
                  }
                  else if($scope.loser.name == "Bill")
                  {
                      posts.addWinAgainstBill(post);
                  }
                  else if($scope.loser.name == "Kevin")
                  {
                      posts.addWinAgainstKevin(post);
                  }
                  else if($scope.loser.name == "Geoff")
                  {
                      posts.addWinAgainstGeoff(post);
                  }
              }
              else if($scope.winner.name == "Geoff")
              {
                  if($scope.loser.name == "Luke")
                  {
                      debugger;
                      posts.addWinAgainstLuke(post);
                  }
                  else if($scope.loser.name == "Bill")
                  {
                      posts.addWinAgainstBill(post);
                  }
                  else if($scope.loser.name == "Jake")
                  {
                      posts.addWinAgainstJake(post);
                  }
                  else if($scope.loser.name == "Kevin")
                  {
                      posts.addWinAgainstKevin(post);
                  }
              }
          }
          if (post._id === $scope.loser._id){
              //found loser
              if($scope.overtime === true)
              {
                  posts.addOvertimeLoss(post);
              }
              else
              {
                  posts.addLoss(post);
              }
              if($scope.loser.name == "Kevin")
              {
                  debugger;
                  if($scope.winner.name == "Luke")
                  {
                      debugger;
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToLuke(post);
                      }
                      else
                      {
                          posts.addLossToLuke(post);
                      }
                  }
                  else if($scope.winner.name == "Bill")
                  {
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToBill(post);
                      }
                      else
                      {
                          posts.addLossToBill(post);
                      }
                  }
                  else if($scope.winner.name == "Jake")
                  {
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToJake(post);
                      }
                      else
                      {
                          posts.addLossToJake(post);
                      }
                  }
                  else if($scope.winner.name == "Geoff")
                  {
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToGeoff(post);
                      }
                      else
                      {
                          posts.addLossToGeoff(post);
                      }
                  }
              }
              else if($scope.loser.name == "Luke")
              {
                  if($scope.winner.name == "Kevin")
                  {
                      debugger;
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToKevin(post);
                      }
                      else
                      {
                          posts.addLossToKevin(post);
                      }
                  }
                  else if($scope.winner.name == "Bill")
                  {
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToBill(post);
                      }
                      else
                      {
                          posts.addLossToBill(post);
                      }
                  }
                  else if($scope.winner.name == "Jake")
                  {
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToJake(post);
                      }
                      else
                      {
                          posts.addLossToJake(post);
                      }
                  }
                  else if($scope.winner.name == "Geoff")
                  {
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToGeoff(post);
                      }
                      else
                      {
                          posts.addLossToGeoff(post);
                      }
                  }
              }
              else if($scope.loser.name == "Bill")
              {
                  if($scope.winner.name == "Luke")
                  {
                      debugger;
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToLuke(post);
                      }
                      else
                      {
                          posts.addLossToLuke(post);
                      }
                  }
                  else if($scope.winner.name == "Kevin")
                  {
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToKevin(post);
                      }
                      else
                      {
                          posts.addLossToKevin(post);
                      }
                  }
                  else if($scope.winner.name == "Jake")
                  {
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToJake(post);
                      }
                      else
                      {
                          posts.addLossToJake(post);
                      }
                  }
                  else if($scope.winner.name == "Geoff")
                  {
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToGeoff(post);
                      }
                      else
                      {
                          posts.addLossToGeoff(post);
                      }
                  }
              }
              else if($scope.loser.name == "Jake")
              {
                  if($scope.winner.name == "Luke")
                  {
                      debugger;
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToLuke(post);
                      }
                      else
                      {
                          posts.addLossToLuke(post);
                      }
                  }
                  else if($scope.winner.name == "Bill")
                  {
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToBill(post);
                      }
                      else
                      {
                          posts.addLossToBill(post);
                      }
                  }
                  else if($scope.winner.name == "Kevin")
                  {
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToKevin(post);
                      }
                      else
                      {
                          posts.addLossToKevin(post);
                      }
                  }
                  else if($scope.winner.name == "Geoff")
                  {
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToGeoff(post);
                      }
                      else
                      {
                          posts.addLossToGeoff(post);
                      }
                  }
              }
              else if($scope.loser.name == "Geoff")
              {
                  if($scope.winner.name == "Luke")
                  {
                      debugger;
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToLuke(post);
                      }
                      else
                      {
                          posts.addLossToLuke(post);
                      }
                  }
                  else if($scope.winner.name == "Bill")
                  {
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToBill(post);
                      }
                      else
                      {
                          posts.addLossToBill(post);
                      }
                  }
                  else if($scope.winner.name == "Jake")
                  {
                      debugger;
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToJake(post);
                      }
                      else
                      {
                      debugger;
                          posts.addLossToJake(post);
                      }
                  }
                  else if($scope.winner.name == "Kevin")
                  {
                      if($scope.overtime === true)
                      {
                          posts.addOvertimeLossToKevin(post);
                      }
                      else
                      {
                          posts.addLossToKevin(post);
                      }
                  }
              }
          }
        });
        
        //okay, all good. Make a new record.
        records.create({
            winner:$scope.winner.name,
            loser: $scope.loser.name,
            overtime: $scope.overtime,
            winnerGoals: $scope.winnerGoals,
            loserGoals: $scope.loserGoals
        });
    }
    
    $scope.upvote = function(post) {
        //our post factory has an upvote() function in it
        //we're just calling this using the post we have
        posts.upvote(post);
    }
    $scope.downvote = function (post) {
        posts.downvote(post);
    };

}]);
potatoNews.controller('PostsCtrl', [
'$scope',
'posts',
'post',
function ($scope, posts, post){
    //used to need $stateRouterProvider to figure out what
    //specific post we're grabbing.  Since we used the resolve object to
    //refer to the posts.get() function and assigned it to the post value
    //then injected that here, we now have the specific post from the db
    //we also inject 'posts' so we can screw with the comments
    $scope.post = post;
    
    $scope.addComment = function () {
        if ($scope.body === '') { return; }
        posts.addComment(post._id, {
            body: $scope.body,
            author: 'user',
        }).success(function (comment) {
            $scope.post.comments.push(comment);
        });
        $scope.body = '';
    };
    
    $scope.upvote = function (comment) {
        posts.upvoteComment (post, comment);
    };
    
    $scope.downvote = function (comment) {
        posts.downvoteComment (post, comment);
    };
    
}]);
potatoNews.controller('RecordsCtrl', [
'$scope',
'records',
'record',
function ($scope, records, record){
    //used to need $stateRouterProvider to figure out what
    //specific post we're grabbing.  Since we used the resolve object to
    //refer to the posts.get() function and assigned it to the post value
    //then injected that here, we now have the specific post from the db
    //we also inject 'posts' so we can screw with the comments
    $scope.record = record;
    
    $scope.addComment = function () {
        if ($scope.body === '') { return; }
        posts.addComment(record._id, {
            body: $scope.body,
            author: 'user',
        }).success(function (comment) {
            $scope.record.comments.push(comment);
        });
        $scope.body = '';
    };
    
    $scope.upvote = function (comment) {
        records.upvoteComment (record, comment);
    };
    
    $scope.downvote = function (comment) {
        records.downvoteComment (record, comment);
    };
    
}]);