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
	barChart 		: null,
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
	initGames : function(){
		this.initAuth();
		if(!this.gamesRef){
			this.gamesRef = new Firebase(this.gamesURL);
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

	loadGames: function(){
		this.initGames();
		this.gamesRef.once('value',function(games){
			var date = [];
			games.forEach(function(game){
				$("<li>Game in <a href='javascript:void(0)' data-key='"+game.key()+"' class='game-detail' >" + game.key()+"</a> </li>").appendTo("#date-list");
			});
		});
	},
	loadUsers: function(){
		this.initAuth();
		var userRef = this.authRef.child('users');
		userRef.once('value',function(users){
			users.forEach(function(user){
				$("<li>Game in <a href='javascript:void(0)' data-key='"+user.key()+"' class='user-detail' >" + user.key()+"</a> </li>").appendTo("#user-list");
			})
		});
	},
	addGames : function(games){
		this.initAuth();
		var gameRef = this.authRef.child('games');
		var self = this;
		gameRef.on('child_added',function(childSnapsot,prevChildKey){
			var data = childSnapsot.val();
			$.each(data, function(userId, info){
				self.updateUser(userId, info);
			});
		});
		$.each(games, function(index, game){
			gameRef.child(index).set(game);
		})
	},
	updateUser : function(userId, info){
		var userRef = this.authRef.child('users/'+userId);
		userRef.transaction(function(data){
			var score 	= info.game_1.score + info.game_2.score;
			var strike 	= info.game_1.strike + info.game_2.strike;
			var spare 	= info.game_1.spare + info.game_2.spare;
			if( data && data.hasOwnProperty('score')){
				score = score + data.score;
			}
			if(data && data.hasOwnProperty('strike')){
				strike = strike + data.strike;
			}
			if(data && data.hasOwnProperty('spare')){
				spare = spare + data.spare;
			}

			userRef.set({'score': score, 'strike': strike, 'spare': spare})
		});
	},
	getGameDetail: function(key){
		this.initGames();
		var gameRef = this.gamesRef.child(key);
		gameRef.once('value',function(users){
			var data = users.val();
			var users = [];
			var game_1 = [];
			var game_2 = [];

			$.each(data, function(key,user){
				users.push(key);
				game_1.push(user.game_1.score);
				game_2.push(user.game_2.score);
			});
			app.setBarChartData(users,game_1,game_2);
			app.drawBarChart();
		})
	},

	// Chart Data Method
	setBarChartData: function(labels,game_1,game_2){
		this.barChartData = {
			labels : labels,
			datasets : [
				{
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(220,220,220,0.8)",
					highlightFill: "rgba(220,220,220,0.75)",
					highlightStroke: "rgba(151,187,205,1)",
					data : game_1
				}
			]
		};
		if( game_2.length > 0){
			this.barChartData.datasets.push(
				{
		            label: "My Second dataset",
		            fillColor: "rgba(151,187,205,0.5)",
		            strokeColor: "rgba(151,187,205,0.8)",
		            highlightFill: "rgba(151,187,205,0.75)",
		            highlightStroke: "rgba(151,187,205,1)",
		            data: game_2
		        }
			);
		}
	},

	// Draw methods
	drawTotalScore: function(){
		this.initTotalScore();
		var usersRef = this.authRef.child('users');
		usersRef.once('value',function(data){
			usersData = data.val();
			var users = [];
			var scores = [];
			$.each(usersData,function(key,user){
				scores.push(user.score);
				users.push(key);
			})
			
			console.log(users);
			console.log(scores);
			app.setBarChartData(users,scores,[]);
			app.drawBarChart();
		});
	},
	drawBarChart: function(){
		var ctx = document.getElementById("canvas").getContext("2d");
		console.log(this.barChart);
		if(!this.barChart){
			this.barChart = new Chart(ctx).Bar(this.barChartData,this.barChartOption);	
		} else {
			// this.barChart.removeData();
			// this.barChart.labels = this.barChartOption;
			// this.barChart.datasets = this.barChartData; 
			this.barChart.destroy();
			this.barChart = new Chart(ctx).Bar(this.barChartData,this.barChartOption);	
		}
		
	},
}

