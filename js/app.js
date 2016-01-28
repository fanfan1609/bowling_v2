/**
 * Require include ChartJS and Firebase JS
 */

var app = {
	name : 'Bowling',
	getName : function(){
		return this.name
	},
	setName :function(name){
		this.name = name
	}
}


var Bowling = function () {
	var ref = new Firebase("https://1388918824478.firebaseio.com");
	ref.authWithCustomToken('lMHSDpt7namXXoOkhQnDQpNBFIm2O5izUlkGRuLb',function(error,authData){
		if(error){
			console.log("Authentication Failed!",error);
		} else {
			console.log("Authentication Successfull",authData);
		}
	});
	var a = 1;
}

Bowling.prototype.test = function(){
	console.log(this.test1());
}

Bowling.prototype.test1 = function(){
	return 1;
}


Bowling.prototype.barChartData = function() {
	return {
		labels : {},
		datasets : [
			{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data : {}
			}
		]
	};
}

Bowling.prototype.getTotalScore = function(user_id){
	var totalScoreRef = new Firebase('https://1388918824478.firebaseio.com/total_score/')
	totalScoreRef.once('value',function(totalScore){
	 	totalScore.forEach(function(score){
	 		if( score.key() == user_id){
	 			console.log(score.val())
	 		}
	 	});
	});
}

Bowling.prototype.addUsers = function(users){
	var userRef 	= new Firebase("https://1388918824478.firebaseio.com/users");
	if (!users instanceof Array){
		users = [users];
	}
	users.forEach(function(user){
		userRef.child(user.id).set(user);
	});
}


Bowling.prototype.addScore = function(scores){
	
}

Bowling.prototype.updateScore = function(scores){

}

Bowling.prototype.totalScore = function(scores){

}

Bowling.prototype.drawTotalScore = function(){

}

Bowling.prototype.drawBarChart = function(barChartData){
	var ctx = document.getElementById("canvas").getContext("2d");
	window.myBar = new Chart(ctx).Bar(barChartData,{
		responsive : true
	});
}

Bowling.prototype.drawRadarChart = function(radarChartData){
	var ctx = document.getElementById("canvas").getContext("2d");
	window.myBar = new Chart(ctx).Radar(barChartData,{
		responsive : true
	});
}
