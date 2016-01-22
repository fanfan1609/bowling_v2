<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Fabrica Bowling League</title>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="shortcut icon" type="image/png" href="favicon.png"/>
	<!-- <link rel='shortcut icon' type='image/x-icon' href='favicon.png' /> -->
	<script src='js/jquery-1.10.2.min.js'></script>
	<script src='js/bootstrap.js'></script>
	<script src="js/firebase.js"></script>
	<script scr="js/firebase-debug.js"></script>
	<script src="js/Chart.js"></script>
	<script src="js/app.js"></script>
	
</head>
<body>
	<h2>Fabrica bowling League (<?php echo date('d/m/Y')?>)</h2>
	<h3 class="text-info">Table Ranking</h3>

	<div>
		<canvas id="canvas" height="500" width="500"></canvas>
	</div>
		
	<script>
		var bowling = new Bowling();
		bowling.total_score();
		// console.log(Bowling.total_score())
		// Bowling.total_score();
		
		
		// var ref = new Firebase("https://1388918824478.firebaseio.com/total_score");
		// var users = [];
		// var scores = [];
		// var barChartData = {

		// };

		// ref.once('value', function(snapshot){
		// 	snapshot.forEach(function(childSnap){
		// 		users.push(childSnap.key());
		// 		scores.push(childSnap.val());
		// 	});

		// 	barChartData.labels = users;
		// 	barChartData.datasets = [
		// 		{
		// 			fillColor : "rgba(220,220,220,0.5)",
		// 			strokeColor : "rgba(220,220,220,0.8)",
		// 			highlightFill: "rgba(220,220,220,0.75)",
		// 			highlightStroke: "rgba(220,220,220,1)",
		// 			data : scores
		// 		}
		// 	];
		// 	var ctx = document.getElementById("canvas").getContext("2d");
		// 	console.log(barChartData);
		// 	window.myBar = new Chart(ctx).Bar(barChartData, {
		// 		responsive : true
		// 	});
		// });
	</script>
</body>
</html>