/**
 * Require include ChartJS and Firebase JS
 */

var app = {
	/*************************** VARIABLES ******************************/
	name 			: 'Fabrica Bowling APP',
	isAuth			: false,
	users 			: null,
	// Resource URL
	authURL 		: 'https://1388918824478.firebaseio.com',
	totalScoreURL 	: 'https://1388918824478.firebaseio.com/total_score',
	usersURL		: 'https://1388918824478.firebaseio.com/users',
	gamesURL		: 'https://1388918824478.firebaseio.com/games',
	// Firebase Object
	authRef 		: null,
	totalScoreRef	: null,
	usersRef		: null,
	gamesRef		: null,
	// Chart Data
	barChartData	: null,
	radarChartData	: null,
	barChartOption	: {
		//Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
	    scaleBeginAtZero : true,

	    //Boolean - Whether grid lines are shown across the chart
	    scaleShowGridLines : true,

	    //String - Colour of the grid lines
	    scaleGridLineColor : "rgba(0,0,0,.05)",

	    //Number - Width of the grid lines
	    scaleGridLineWidth : 1,

	    //Boolean - Whether to show horizontal lines (except X axis)
	    scaleShowHorizontalLines: true,

	    //Boolean - Whether to show vertical lines (except Y axis)
	    scaleShowVerticalLines: true,

	    //Boolean - If there is a stroke on each bar
	    barShowStroke : true,

	    //Number - Pixel width of the bar stroke
	    barStrokeWidth : 2,

	    //Number - Spacing between each of the X value sets
	    barValueSpacing : 5,

	    //Number - Spacing between data sets within X values
	    barDatasetSpacing : 1,
	},

	/*************************** METHODS ******************************/
	// Authenciate methods
	initAuth		:function(){
		if(!this.authRef){
			this.authRef = new Firebase(this.authURL)
		}
	},
	initTotalScore	:function(){
		this.initAuth();
		if(!this.totalScoreRef){
			this.totalScoreRef = new Firebase(this.totalScoreURL);
		}
	},
	authWithCustomToken : function(){
		this.initAuth();
		this.authRef.authWithCustomToken('lMHSDpt7namXXoOkhQnDQpNBFIm2O5izUlkGRuLb',function(error,authData){
			if(error){
				console.log("Authentication Failed!",error);
				app.setAuth(false);
			} else {
				console.log("Authentication Successfull",authData);
				app.setAuth(true);
			}
		});
	},
	authWithPassword: function(email,password){
		this.initAuth();
		this.authRef.authWithPassword({
			'email' : email, 'password' : password
		},function(error,authData){
			if(error){
				console.log("Authentication Failed!",error);
				app.setAuth(false);
			} else {
				console.log("Authentication Successfull",authData);
				app.setAuth(true);
			}
		});
	},
	setAuth: function(isSuccess){
		this.isAuth = isSuccess;
	},
	// Chart Data Method
	setBarChartData: function(labels,data){
		console.log(data);
		console.log(labels);
		this.barChartData = {
			labels : labels,
			datasets : [
				{
					fillColor : "rgba(220,220,220,0.5)",
					strokeColor : "rgba(220,220,220,0.8)",
					highlightFill: "rgba(220,220,220,0.75)",
					highlightStroke: "rgba(220,220,220,1)",
					data : data
				}
			]
		};
	},

	// Draw methods
	drawTotalScore: function(){
		this.initTotalScore();
		this.totalScoreRef.once('value',function(totalScore){
			var users = [];
			var scores = [];
			totalScore.forEach(function(score){
				scores.push(score.val());
				users.push(score.key());
			});
			app.setBarChartData(users,scores);
			app.drawBarChart();
		});
	},
	drawBarChart: function(){
		var ctx = document.getElementById("canvas").getContext("2d");
		window.myBar = new Chart(ctx).Bar(this.barChartData,this.barChartOption);
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
