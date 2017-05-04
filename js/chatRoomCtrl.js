LoquiApp.controller('chatRoomCtrl', function($scope, model, $routeParams){

  var path = $routeParams.room;
  var splitParams = path.split("-");
  var code = splitParams[0];
  var room = splitParams[1];

  var urlOrg = window.location.href;
  var splitedUrl = urlOrg.split('chatRoom/'+path);
  $scope.url = splitedUrl[0]
  var uuid = 'f5a22468-0992-47b3-b7c8-7b75ce7349cf';

  $scope.courseID = code;
  $scope.room = room;

// A Painter application that uses MQTT to distribute draw events
// to all other devices running this app.

//Object that holds application data and functions.
var app = {};

var host = 'vernemq.evothings.com';
var port = 8084;
var user = 'anon';
var password = 'ymous';
var nick = "";

app.connected = false;
app.ready = false;

$scope.sendMessage = function(){
  nick = "Admin";
  var msg = document.getElementById("comment").value;
  document.getElementById("comment").value="";
	var send = JSON.stringify({nick: nick, msg: msg});
	app.publish(send);
}

app.onMessageArrived = function(message) {
	var o = JSON.parse(message.payloadString);
	var text = document.createElement("p");
	if(o.nick!=undefined){
		var split = o.msg.split(" ")[0];
		var atUser;
		if (split[0]=="@"){
			atUser=split;
			if(atUser==('@'+nick) || o.nick == nick){
				text.innerHTML= o.nick + ": " + o.msg;
				app.canvas.appendChild(text);
			}
		}
		else{
      var time = new Date();
			text.innerHTML= '<div class="messageBox" id="msgBox"><div class="col-xs-8"><div class="nameBox">' + o.nick + '</div></div><div class="col-xs-4"><div class="timeStamp">' + time + '</div></div><div>' + o.msg + '</div></div>';

			app.canvas.appendChild(text);
		}
	}
}

app.initialize = function() {
  console.log("check app ready");
	if (!app.ready) {
		app.pubTopic = '/' + path + '/' + uuid + '/evt'; // We publish to our own device topic
		app.subTopic = '/' + path + '/' + '+/evt'; // We subscribe to all devices using "+" wildcard
		app.setupCanvas();
		app.setupConnection();
		app.ready = true;
  }
}


app.setupCanvas = function() {
  console.log("set canvas");
	app.canvas = document.getElementById("messageSpace");
  console.log(app.canvas);

	var btn = document.getElementById("sendButton");
	btn.addEventListener( "click", app.sendMessage);
	console.log("set up canvas");
}


app.setupConnection = function() {
console.log("connection");
  	app.status("Connecting to " + host + ":" + port + " as " + uuid);
	app.client = new Paho.MQTT.Client(host, port, uuid);
	app.client.onConnectionLost = app.onConnectionLost;
	app.client.onMessageArrived = app.onMessageArrived;
	var options = {
    useSSL: true,
    onSuccess: app.onConnect,
    onFailure: app.onConnectFailure,
  }
	app.client.connect(options);
}

app.publish = function(json) {
	message = new Paho.MQTT.Message(json);
	message.destinationName = app.pubTopic;
	app.client.send(message);
};

app.subscribe = function() {
	app.client.subscribe(app.subTopic);
	console.log("Subscribed: " + app.subTopic);
}

app.unsubscribe = function() {
	app.client.unsubscribe(app.subTopic);
	console.log("Unsubscribed: " + app.subTopic);
}

app.onConnect = function(context) {
	app.subscribe();
	app.status("Connected!");
	app.connected = true;
}

app.onConnectFailure = function(e){
  console.log("Failed to connect: " + JSON.stringify(e));
}

app.onConnectionLost = function(responseObject) {
	app.status("Connection lost!");
	console.log("Connection lost: "+responseObject.errorMessage);
	app.connected = false;
}

app.status = function(s) {
	console.log(s);
	var info = document.getElementById("info");
	info.innerHTML = s;
}





  		/* Set the width of the side navigation to 250px */
  $scope.openNav = function() {
  	    document.getElementById("mySidenav").style.width = "250px";
  	}

  	/* Set the width of the side navigation to 0 */
  $scope.closeNav = function() {
  	    document.getElementById("mySidenav").style.width = "0";
  	}

  app.initialize();

});
