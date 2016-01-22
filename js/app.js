var Bowling = function(){
	this.ref 	= null;	
	this.total_score = function(){
		var users 	= [];
		var scores 	= [];
		var barChartData = {};
		this.ref = new Firebase("https://1388918824478.firebaseio.com/total_score");
		this.ref.once('value', function(snapshot){
			snapshot.forEach(function(child){
				users.push(child.key());
				scores.push(child.val());
			});

			barChartData.labels = users;
			barChartData.datasets = [
				{
					fillColor : "rgba(220,220,220,0.5)",
					strokeColor : "rgba(220,220,220,0.8)",
					highlightFill: "rgba(220,220,220,0.75)",
					highlightStroke: "rgba(220,220,220,1)",
					data : scores
				}
			];
			drawBarChart(barChartData)
		});
	}

	this.drawBarChart = function(barChartData){
		var ctx = document.getElementById("canvas").getContext("2d");
		window.myBar = new Chart(ctx).Bar(barChartData, {
			responsive : true
		});
	}
}

function drawBarChart (barChartData) {
	var ctx = document.getElementById("canvas").getContext("2d");
	window.myBar = new Chart(ctx).Bar(barChartData, {
		responsive : true
	});
}