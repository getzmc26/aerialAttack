<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Aerial Attack | High Scores</title>
		<link rel="stylesheet" type="text/css" href="aerialAttackStyle.css">
		<link rel="icon" href="images/icon.png">
	</head>
	<body>
		<center>
			<img src="images/highScoreBanner.png" alt="Aerial Attack High Scores Banner">
			<br>
			<small><em>Aerial Attack</em> created by Matt Getz</small>
			<br>
			<br>
			<h2>
			Player&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspScore
			<hr width="35%">
			<br>
			<?php
				// connect to the database
				$db = new PDO('mysql:host=localhost;dbname=getzmc26;charset=utf8', 'getzmc26', 'getzmc26');
				// here is our SQL query statement
				$q = "select name, score from highscores order by score DESC LIMIT 10";	
				// execute query and display the results
				$scoreNum = 1;
				$period = ". ";
				foreach ($db->query($q) as $row) {
					echo $scoreNum . "" . $period;
					echo "$row[name]........................$row[score]<br><br>\n";
					$scoreNum++;
				}
			?>
			</h2>
		</center>
	</body>
	<footer>
		<center>
		<br>
		<p>This web site has been <a href="http://jigsaw.w3.org/css-validator/check/referer" style="text-decoration: underline;">W3C CSS Validated</a></p>
		</center>
    </footer>
</html>
