<!--Hey. Get out of here, ya snooper.-->
<?php
	session_start();
	//Connect to the database
	$db = new PDO('mysql:host=localhost;dbname=getzmc26;charset=utf8', 'getzmc26', 'getzmc26');
	if ($db->connect_error) {
		die("Connection failed: " . $db->connect_error);
	} 
	//Score held at 10 is "score to beat" --> higher than this will prompt the form
	//First ID descending will output number of database entries --> if not at least 10 highscore entries, prompt the form
	$q1 = "SELECT score FROM highscores ORDER BY score DESC LIMIT 1,9";
	$q2 = "SELECT id FROM highscores ORDER BY id DESC LIMIT 1";
	foreach ($db->query($q1) as $row) {
		$phpGetLastScore = $row[score];
	}
	foreach ($db->query($q2) as $row) {
		$phpCheckForTen = $row[id];
	}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Aerial Attack | Game</title>
		<link rel="stylesheet" type="text/css" href="aerialAttackStyle.css">
		<link rel="icon" href="images/icon.png">
	</head>
	<body>
		<script>
			var jsGetLastScore = '<?php echo $phpGetLastScore?>'; 
			var jsCheckForTen = '<?php echo $phpCheckForTen?>';
			var jsSessionScore;
		</script>
		<center>
			<img src="images/banner.png">
			<br>
			<small>Visit the <a href="http://csmupa.com/~getzmc26/pub3304/aerialAttack/highscores.php" target="_blank">
				<div class="tooltip"><em>High Scores Page</em>
					<span class="tooltiptext">Score to beat to make the page is <script>document.write(jsGetLastScore)</script>!</span>
				</div></a>
			</small>
			<br>
			<small><em>Aerial Attack</em> created by Matt Getz</small>
			<br>
			<div class="tooltip">| Controls |
				<span class="tooltiptext">WASD = Move <br> Left = Shield <br> Right = Shoot <br> Space = Bomb <br> Up/Down = Vol.</span>
			</div>
			<a href="" id='loadGame'> Start Game |</a>
			<div class="tooltip"><a href="" onClick="history.go(0)" id='loadGame'> Reset |</a>
				<span class="tooltiptext">To play again, click Reset and then Start Game</span>
			</div>
		</center>
		<br>
		<script type="text/javascript">
			var loadGame = document.getElementById('loadGame');
			loadGame.onclick = function aerialAttack() {
				this.style.display="none";
				var script = document.createElement("script");
				script.type = "text/javascript";
				script.src = "aerialAttack.js"; 
				document.getElementsByTagName("head")[0].appendChild(script);
				return false;		
			}; 
		</script>
	</body>
</html>