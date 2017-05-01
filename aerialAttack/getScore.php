<?php
$DB_NAME = 'getzmc26';
$DB_USER = 'getzmc26';
$DB_PASSWORD = 'getzmc26';
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
		<center>
		<img src="images/banner.png">
		<br>
		<small><em>Aerial Attack</em> created by Matt Getz</small>
		<br>
		<br>
		<p>Enter your initials:</p>
        <form method="post" name="goForm">
            <input type='text' name='userName' size='3' maxlength='3' id="hideTextBox">		
            <input type="submit" name="submit" value="Submit" id="hideButton">
        </form>
		</center>
        <?php
        try {
            $dbh = new PDO("mysql:host=localhost;dbname=$DB_NAME;charset=utf8", $DB_USER, $DB_PASSWORD);
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Error!: " . $e->getMessage() . "<br>";
            die();
        }

        if (isset($_POST['submit'])) {
            $name = "";
			$score = $_GET['score'];
			
            if (isset($_POST['userName']) && strlen($_POST['userName']) > 0) {
				$name = $_POST['userName'];
				$name = trim($name);
				$name = stripslashes($name);
				$name = htmlspecialchars($name);
				$name = preg_replace('/\n/', '<br>', $name);
				//Insert user entered name and user score as new entry.
				//Prepared statement prevents sql injection -- thanks Phillips
				//Try/catch for displaying sql errors
				try {
					$q = "insert into highscores (name, score) values(?, ?)";
					$stmt = $dbh->prepare($q);
					$stmt->bindParam(1, $name);
					$stmt->bindParam(2, $score);
					$stmt->execute();
					echo "<script>hideTextBox.style.display='none';</script>";
					echo "<script>hideButton.style.display='none';</script>";
					echo "<script>window.history.go(-2);</script>";
				} catch (PDOException $e) {
                    echo "<p>Error!: " . $e->getMessage() . "</p>\n";
				}
			} else {
				echo "<small><center><br>Please enter your initials (ex. 'AAA' )</center></small>\n";
			}
        }
		//Query set-up --> retrieve and order entries by highest score to lowest score
        $q = "select name, score, posted from highscores order by score DESC";

		//Prepare and execute SQL query
        $sth = $dbh->prepare($q);
        $sth->execute();
        ?>
    </body>
</html>

