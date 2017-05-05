<?php
session_start();
$DB_NAME = 'getzmc26';
$DB_USER = 'getzmc26';
$DB_PASSWORD = 'getzmc26';

$name = "";
$score = $_COOKIE['score'];
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Aerial Attack | Form</title>
        <link rel="stylesheet" type="text/css" href="aerialAttackStyle.css">
		<link rel="icon" href="images/icon.png">
    </head>
    <body>
		<script>
			var sadPartyNoise = new Audio('sounds/sadPartyNoise.mp3');
			sadPartyNoise.volume = 0.8;
			sadPartyNoise.play();
		</script>
		<center>
		<img src="images/newHighScoreBanner.png">
		<br>
		<small><em>Aerial Attack</em> created by Matt Getz</small>
		<br>
		<br>
		<hr width="35%">
		<hr width="33%">
		<h3>Enter your initials in all caps:</h3>
        <form method="post" name="goForm" autocomplete="off">
            <input type='text' name='userName' size='1' maxlength='3' id="hideTextBox">
            <input type="submit" name="submit" value="Submit" id="hideButton">
        </form>
		<br>
		<hr width="33%">
		<hr width="35%">
        <?php
        try {
            $dbh = new PDO("mysql:host=localhost;dbname=$DB_NAME;charset=utf8", $DB_USER, $DB_PASSWORD);
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Error!: " . $e->getMessage() . "<br>";
            die();
        }
		
		function checkName($string) {	
			$string = str_replace(' ', 'A', $string);
			$string = preg_replace('/[^A-Z]/', 'A', $string);
			return $string;
		}
		
		function cleanName($string) {
			//Future Matt -- load all into array --> loop through to check user entered name against all entries
			$string = str_replace('ASS', 'IAC', $string);
			$string = str_replace('FUC', 'IAC', $string);
			$string = str_replace('FUK', 'IAC', $string);
			$string = str_replace('FUQ', 'IAC', $string);
			$string = str_replace('FCK', 'IAC', $string);
			$string = str_replace('COC', 'IAC', $string);
			$string = str_replace('COK', 'IAC', $string);
			$string = str_replace('COQ', 'IAC', $string);
			$string = str_replace('COX', 'IAC', $string);
			$string = str_replace('KOX', 'IAC', $string);
			$string = str_replace('KOC', 'IAC', $string);
			$string = str_replace('KOK', 'IAC', $string);
			$string = str_replace('KOQ', 'IAC', $string);
			$string = str_replace('DIC', 'IAC', $string);
			$string = str_replace('DIK', 'IAC', $string);
			$string = str_replace('DIQ', 'IAC', $string);
			$string = str_replace('PNS', 'IAC', $string);
			$string = str_replace('PSY', 'IAC', $string);
			$string = str_replace('FAG', 'IAC', $string);
			$string = str_replace('FGT', 'IAC', $string);
			$string = str_replace('NGR', 'IAC', $string);
			$string = str_replace('NIG', 'IAC', $string);
			$string = str_replace('CUM', 'IAC', $string);
			$string = str_replace('KUM', 'IAC', $string);
			$string = str_replace('SUC', 'IAC', $string);
			$string = str_replace('SUK', 'IAC', $string);
			$string = str_replace('SUQ', 'IAC', $string);
			$string = str_replace('LIC', 'IAC', $string);
			$string = str_replace('LIK', 'IAC', $string);
			$string = str_replace('LIQ', 'IAC', $string);
			$string = str_replace('JIZ', 'IAC', $string);
			$string = str_replace('GAY', 'IAC', $string);
			$string = str_replace('GEY', 'IAC', $string);
			$string = str_replace('VAG', 'IAC', $string);
			$string = str_replace('FAP', 'IAC', $string);
			$string = str_replace('JEW', 'IAC', $string);
			$string = str_replace('JOO', 'IAC', $string);
			$string = str_replace('PUS', 'IAC', $string);
			$string = str_replace('PIS', 'IAC', $string);
			$string = str_replace('PSS', 'IAC', $string);
			$string = str_replace('TIT', 'IAC', $string);
			$string = str_replace('FKU', 'IAC', $string);
			$string = str_replace('FCU', 'IAC', $string);
			$string = str_replace('FQU', 'IAC', $string);
			$string = str_replace('JAP', 'IAC', $string);
			$string = str_replace('KIK', 'IAC', $string);
			$string = str_replace('KYK', 'IAC', $string);
			$string = str_replace('KYC', 'IAC', $string);
			$string = str_replace('KYQ', 'IAC', $string);
			$string = str_replace('DYK', 'IAC', $string);
			$string = str_replace('DYQ', 'IAC', $string);
			$string = str_replace('KKK', 'IAC', $string);
			$string = str_replace('SEX', 'IAC', $string);
			$string = str_replace('POT', 'IAC', $string);
			$string = str_replace('VAJ', 'IAC', $string);
			$string = str_replace('NUT', 'IAC', $string);
			$string = str_replace('POO', 'IAC', $string);
			$string = str_replace('AZN', 'IAC', $string);
			$string = str_replace('DMN', 'IAC', $string);
			$string = str_replace('ORL', 'IAC', $string);
			$string = str_replace('ANL', 'IAC', $string);
			$string = str_replace('MUF', 'IAC', $string);
			$string = str_replace('MLF', 'IAC', $string);
			$string = str_replace('SAC', 'IAC', $string);
			$string = str_replace('SAK', 'IAC', $string);
			$string = str_replace('SAQ', 'IAC', $string);
			$string = str_replace('WTF', 'IAC', $string);
			$string = str_replace('SOL', 'IAC', $string);
			$string = str_replace('SOB', 'IAC', $string);
			$string = str_replace('SFU', 'IAC', $string);		
			return $string;
		}

        if (isset($_POST['submit'])) {
			
            if (isset($_POST['userName']) && strlen($_POST['userName']) > 0) {
				$name = $_POST['userName'];
				$name = checkName($name);
				$name = cleanName($name);
				$name = trim($name);
				$name = stripslashes($name);
				$name = htmlspecialchars($name);
				$name = preg_replace('/\n/', '<br>', $name);
				//Insert user entered name and user score as new entry.
				//Prepared statement prevents sql injection.
				//Try/catch for displaying sql errors
				try {
					$q = "insert into highscores (name, score) values(?, ?)";
					$stmt = $dbh->prepare($q);
					$stmt->bindParam(1, $name);
					$stmt->bindParam(2, $score);
					$stmt->execute();
					echo "<script>hideTextBox.style.display='none';</script>";
					echo "<script>hideButton.style.display='none';</script>";
					echo "<script>window.open('http://csmupa.com/~getzmc26/pub3304/aerialAttack/highscores.php', '_blank').focus();</script>";
					echo "<script>window.close();</script>";
				} catch (PDOException $e) {
                    //echo "<p>Error!: " . $e->getMessage() . "</p>\n";
				}
			} else {
				echo "<small><center><br>Please enter your initials in all caps (ex. 'AAA' )</center></small>\n";
			}
        }
        ?>
		</center>
    </body>
</html>

