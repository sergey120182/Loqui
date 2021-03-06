LoquiApp.controller('privateMessagesMenuCtrl', function($scope, model, $location){



  //Creates right url for redirection
  var urlOrg = window.location.href;
  var splitedUrl = urlOrg.split('privateMessages');
  $scope.url = splitedUrl[0];
  $scope.urlMess = urlOrg;
  $scope.loading = false;

  //redirection function
  var goto = function(path){
    $location.path(path);
  }

  // Go to Private chatroom with other user.
  $scope.goChat = function(user) {
    var lowerUser = user.toLowerCase();
    $location.path('/privateMessages/'+lowerUser);
  }




  // Search for friend in database. If the userName exsists, you get redirected to your private chatroom
  var search = function(friend){
    var lowerFriend = friend.toLowerCase();
    var ref = model.database.ref('users/'+lowerFriend);
    ref.once("value").then(function(snapshot){
      if(snapshot.exists()){
        var other = {
          username: snapshot.val().username
        };
        var lowerUserName = model.getUserName().toLowerCase();
        model.database.ref('users/'+ lowerUserName +'/convos/'+lowerFriend).once("value").then(function(snapshot){
          if(snapshot.exists()){
            console.log("already friend");
            $scope.loading = false;
            $scope.$apply(function(){
               goto('/privateMessages/'+other.username);
            });
          } else {
            model.addPrivateMessangeConv(other);
            model.addOtherPrivateMessangeConv(other);
            $scope.loading = false;
            $scope.$apply(function(){
               goto('/privateMessages/'+other.username);
            });

          }
        });
      }
      else{
        alert("That user does not exists")
        $scope.loading = false;
      }

    });

  }



  // Go back to previous view
  $scope.goBack = function() {
    window.history.back();
  }





  //Search for friend to start a private connversation with
  $scope.searchFriend = function(friend){
    console.log("CLICKED");
    if(friend != undefined){
      $scope.loading = true;
      search(friend);
    }

  }

    var d = $.Deferred();
    var peopleList = model.getPrivateMessangeConv();
    console.log(peopleList);
    $.when(d).done(function(list) {
      $scope.$apply(function(){
        $scope.people = list;
        console.log($scope.people);
        console.log("2");
      });
    });
    setTimeout(function() {
      d.resolve(peopleList);
    }, 500);

});
