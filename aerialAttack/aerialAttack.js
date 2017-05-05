var bulletFireReady = true;
var shieldFireReady = true;
var bombFireReady = true;
var resetShieldFireReady = true;
var isGameOver = false;
var isBombImpactReady = true;
var wasFormOpened = false;

var enemiesKilledByBullets = 0;
var enemiesKilledByShields = 0;
var enemiesKilledByBombs = 0;

var enemyNoiseCount = 0;
var bulletSoundCount = 0;
var enemyBulletSoundCount = 0;

var bulletsUsedCount = 0;
var shieldsUsedCount = 0;
var bombsUsedCount = 0;

var enemy1SoundCount = 0;
var enemy2SoundCount = 0;
var enemy3SoundCount = 0;
var enemy4SoundCount = 0;
var enemy5SoundCount = 0;

var playerHitByEnemy1Count = 0;
var playerHitByEnemy2Count = 0;
var playerHitByEnemy3Count = 0;
var playerHitByEnemy4Count = 0;
var playerHitByEnemy5Count = 0;

var bulletAccuracy;
var shieldAccuracy;
var bombAccuracy;



//*************************************************************
//															   
//  				     AERIAL ATTACK					       
//						  by Matt Getz						   
//															   	
//*************************************************************



//*************************************************************
// Canvas:
//*************************************************************
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 630;
document.body.appendChild(canvas);
//*************************************************************



//*************************************************************
// Static Background Image:
//*************************************************************
var staticBackgroundReady = false;
var staticBackgroundObject = new Image();
staticBackgroundObject.onload = function () {
	staticBackgroundReady = true;
};
staticBackgroundObject.src = "images/staticBackground.png";	
//*************************************************************



//*************************************************************
// Game Over Background Bottom Image:
//*************************************************************
var gameOverBackgroundBottomReady = false;
var gameOverBackgroundBottomObject = new Image();
gameOverBackgroundBottomObject.onload = function () {
	gameOverBackgroundBottomReady = true;
};
gameOverBackgroundBottomObject.src = "images/gameOverBottom.png";	
//*************************************************************



//*************************************************************
// Moving Background Image:
//*************************************************************
var scrollingBackgroundReady = false;
var scrollingBackgroundObject = new Image();
scrollingBackgroundObject.onload = function () {
	scrollingBackgroundReady = true;
};
scrollingBackgroundObject.src = "images/scrollingBottom.png";	
//*************************************************************



//*************************************************************
// Player Object:
//*************************************************************
var playerReady = false;
var playerObject = new Image();
playerObject.onload = function () {
	playerReady = true;
};
playerObject.src = "images/player.png";
//*************************************************************



//*************************************************************
// Enemy Objects:
//*************************************************************
// Enemy1 object
var enemy1Ready = false;
var enemy1Object = new Image();
enemy1Object.onload = function () {
	enemy1Ready = true;
};
enemy1Object.src = "images/enemy.png";

// Enemy2 object
var enemy2Ready = false;
var enemy2Object = new Image();
enemy2Object.onload = function () {
	enemy2Ready = true;
};
enemy2Object.src = "images/enemy.png";

// Enemy3 object
var enemy3Ready = false;
var enemy3Object = new Image();
enemy3Object.onload = function () {
	enemy3Ready = true;
};
enemy3Object.src = "images/enemy.png";

// Enemy4 object
var enemy4Ready = false;
var enemy4Object = new Image();
enemy4Object.onload = function () {
	enemy4Ready = true;
};
enemy4Object.src = "images/enemy.png";

// Enemy5 object
var enemy5Ready = false;
var enemy5Object = new Image();
enemy5Object.onload = function () {
	enemy5Ready = true;
};
enemy5Object.src = "images/enemy.png";
//*************************************************************



//*************************************************************
// Ground Enemy Object:
//*************************************************************
var groundEnemyReady = false;
var groundEnemyObject = new Image();
groundEnemyObject.onload = function () {
	groundEnemyReady = true;
};
groundEnemyObject.src = "images/groundEnemy.png";
//*************************************************************



//*************************************************************
// Ground Enemy Bullet Object:
//*************************************************************
var enemyBulletReady = false;
var enemyBulletObject = new Image();
enemyBulletObject.onload = function () {
	enemyBulletReady = true;
};
enemyBulletObject.src = "images/bullet.png";
//*************************************************************



//*************************************************************
// Heart Object:
//*************************************************************
var heartReady = false;
var heartObject = new Image();
heartObject.onload = function () {
	heartReady = true;
};
heartObject.src = "images/heart.png";
//*************************************************************



//*************************************************************
// Bullet Object:
//*************************************************************
var bulletReady = false;
var bulletObject = new Image();
bulletObject.onload = function () {
	bulletReady = true;
};
bulletObject.src = "images/bullet.png";
//*************************************************************



//*************************************************************
// Sheild Object:
//*************************************************************
var shieldReady = false;
var shieldObject = new Image();
shieldObject.onload = function () {
	shieldReady = true;
};
shieldObject.src = "images/shield.png";
//*************************************************************



//*************************************************************
// Player Reset Shield Object:
//*************************************************************
var resetShieldReady = false;
var resetShieldObject = new Image();
resetShieldObject.onload = function () {
	resetShieldReady = true;
};
resetShieldObject.src = "images/resetShield.png";
//*************************************************************



//*************************************************************
// Bomb Object:
//*************************************************************
var bombReady = false;
var bombObject = new Image();
bombObject.onload = function () {
	bombReady = true;
};
bombObject.src = "images/bomb.png";
//*************************************************************



//*************************************************************
// Player and Enemy/Heart Object Set-Up:
//*************************************************************
var scrollingBackground = {
	speed: 0
};

var player = {
	speed: 400
};

var groundEnemy = {
	speed: 0
};

var enemy1 = {
	speed: 0
};

var enemy2 = {
	speed: 0
};

var enemy3 = {
	speed: 0
};

var enemy4 = {
	speed: 0
};

var enemy5 = {
	speed: 0
};

var heart = {
	speed: 0
};

var bullet = {
	speed: 0
};

var bomb = {
	speed: 0
};

var shield = {
	speed: 0
};

var enemyBullet = {
	speed: 0
};

var enemyDifficulty = "";
var shieldText = "Ready";
var bombText = "Ready";
var playerLives = 3;
var scoreCounter = 0;
var flyingEnemiesKilled = 0;
var groundEnemiesKilled = 0;
var heartsCollected = 0;
//*************************************************************



//*************************************************************
//Keyboard input listener:
//*************************************************************
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);
//*************************************************************



//*************************************************************
//Background Movement:
//*************************************************************
	function redrawBackground() {
		if (scoreCounter < 1000) {
			if (scrollingBackground.x <= -11551) {
				scrollingBackground.x = 0;
			}
			scrollingBackground.x = scrollingBackground.x - 2;
		}
		if (scoreCounter >= 1000 && scoreCounter < 2000) {
			if (scrollingBackground.x <= -11551) {
				scrollingBackground.x = 0;
			}
			scrollingBackground.x = scrollingBackground.x - 2.5;
		}
		if (scoreCounter >= 2000 && scoreCounter < 4000) {
			if (scrollingBackground.x <= -11551) {
				scrollingBackground.x = 0;
			}
			scrollingBackground.x = scrollingBackground.x - 3;
		}
		if (scoreCounter >= 4000 && scoreCounter < 6000) {
			if (scrollingBackground.x <= -11551) {
				scrollingBackground.x = 0;
			}
			scrollingBackground.x = scrollingBackground.x - 3.5;
		}
		if (scoreCounter >= 6000 && scoreCounter < 8000) {
			if (scrollingBackground.x <= -11551) {
				scrollingBackground.x = 0;
			}
			scrollingBackground.x = scrollingBackground.x - 4;
		}
		if (scoreCounter >= 8000 && scoreCounter < 10000) {
			if (scrollingBackground.x <= -11551) {
				scrollingBackground.x = 0;
			}
			scrollingBackground.x = scrollingBackground.x - 4.5;
		}
		if (scoreCounter >= 10000 && scoreCounter < 12000) {
			if (scrollingBackground.x <= -11551) {
				scrollingBackground.x = 0;
			}
			scrollingBackground.x = scrollingBackground.x - 5;
		}
		if (scoreCounter >= 12000) {
			if (scrollingBackground.x <= -11551) {
				scrollingBackground.x = 0;
			}
			scrollingBackground.x = scrollingBackground.x - 5.5;
		}
	}
	
	function moveBackground() {
		setInterval(redrawBackground, 5);
	}
//*************************************************************



//*************************************************************
//Enemy Movement:
//*************************************************************
	
	//Move enemy1 
	function redrawEnemy1() {
		if (scoreCounter < 1000) {
			if (enemyNoiseCount == 0) {
			enemyDiffSound.play();
			enemyNoiseCount++;
			}
			enemyDifficulty = "1";
			enemy1.x = enemy1.x - 2.5;
		}
		if (scoreCounter >= 1000 && scoreCounter < 2000) {
			if (enemyNoiseCount == 1) {
			enemyDiffSound.play();
			enemyNoiseCount++;
			}
			enemyDifficulty = "2";
			enemy1.x = enemy1.x - 3;
		}
		if (scoreCounter >= 2000 && scoreCounter < 4000) {
			if (enemyNoiseCount == 2) {
			enemyDiffSound.play();
			enemyNoiseCount++;
			}
			enemyDifficulty = "3";
			enemy1.x = enemy1.x - 3.5;
		}
		if (scoreCounter >= 4000 && scoreCounter < 6000) {
			if (enemyNoiseCount == 3) {
			enemyDiffSound.play();
			enemyNoiseCount++;
			}
			enemyDifficulty = "4";
			enemy1.x = enemy1.x - 4;
		}
		if (scoreCounter >= 6000 && scoreCounter < 8000) {
			if (enemyNoiseCount == 4) {
			enemyDiffSound.play();
			enemyNoiseCount++;
			}
			enemyDifficulty = "5";
			enemy1.x = enemy1.x - 4.5;
			if (enemy1.y > 20) {
				enemy1.y = enemy1.y - .2;
			}	
		}
		if (scoreCounter >= 8000 && scoreCounter < 10000) {
			if (enemyNoiseCount == 5) {
			enemyDiffSound.play();
			enemyNoiseCount++;
			}
			enemyDifficulty = "6";
			enemy1.x = enemy1.x - 5;
			if (enemy1.y < 400) {
				enemy1.y = enemy1.y + .2;
			}			
		}
		if (scoreCounter >= 10000 && scoreCounter < 12000) {
			if (enemyNoiseCount == 6) {
			enemyDiffSound.play();
			enemyNoiseCount++;
			}
			enemyDifficulty = "7";
			enemy1.x = enemy1.x - 5.5;
			if (enemy1.y > 20) {
				enemy1.y = enemy1.y - .2;
			}				
		}
		if (scoreCounter >= 12000) {
			if (enemyNoiseCount == 7) {
			enemyDiffSound.play();
			enemyNoiseCount++;
			}
			enemyDifficulty = "8";
			enemy1.x = enemy1.x - 6;
			if (enemy1.y < 400) {
				enemy1.y = enemy1.y + .2;
			}				
		}
	}
	
	function moveEnemy1() {
		setInterval(redrawEnemy1, 5);
	}

	//Move enemy2 
	function redrawEnemy2() {
		if (scoreCounter < 1000) {
			enemy2.x = enemy2.x - 1;
		}
		if (scoreCounter >= 1000 && scoreCounter < 2000) {
			enemy2.x = enemy2.x - 1.25;
		}
		if (scoreCounter >= 2000 && scoreCounter < 4000) {
			enemy2.x = enemy2.x - 1.5;
		}
		if (scoreCounter >= 4000 && scoreCounter < 6000) {
			enemy2.x = enemy2.x - 2;
		}
		if (scoreCounter >= 6000 && scoreCounter < 8000) {
			enemy2.x = enemy2.x - 2.5;			
		}
		if (scoreCounter >= 8000 && scoreCounter < 10000) {
			enemy2.x = enemy2.x - 3;
			if (enemy2.y > 20) {
				enemy2.y = enemy2.y - .2;
			}				
		}
		if (scoreCounter >= 10000 && scoreCounter < 12000) {
			enemy2.x = enemy2.x - 3.5;
			if (enemy2.y > 20) {
				enemy2.y = enemy2.y - .2;
			}				
		}
		if (scoreCounter >= 12000) {
			enemy2.x = enemy2.x - 4;
			if (enemy2.y > 20) {
				enemy2.y = enemy2.y - .2;
			}			
		}		
	}
	
	function moveEnemy2() {
		setInterval(redrawEnemy2, 5);
	}

	//Move enemy3	
	function redrawEnemy3() {
		if (scoreCounter < 1000) {
			enemy3.x = enemy3.x - 1.25;
		}
		if (scoreCounter >= 1000 && scoreCounter < 2000) {
			enemy3.x = enemy3.x - 1.5;
		}
		if (scoreCounter >= 2000 && scoreCounter < 4000) {
			enemy3.x = enemy3.x - 2;
		}
		if (scoreCounter >= 4000 && scoreCounter < 6000) {
			enemy3.x = enemy3.x - 2.5;
		}
		if (scoreCounter >= 6000 && scoreCounter < 8000) {
			enemy3.x = enemy3.x - 3;		
		}
		if (scoreCounter >= 8000 && scoreCounter < 10000) {
			enemy3.x = enemy3.x - 3.5;			
		}
		if (scoreCounter >= 10000 && scoreCounter < 12000) {
			enemy3.x = enemy3.x - 4;
			if (enemy3.y > 20) {
				enemy3.y = enemy3.y - .2;
			}			
		}
		if (scoreCounter >= 12000) {
			enemy3.x = enemy3.x - 4.5;
			if (enemy3.y > 20) {
				enemy3.y = enemy3.y - .2;
			}			
		}		
	}
	
	function moveEnemy3() {
		setInterval(redrawEnemy3, 5);
	}

	//Move enemy4	
	function redrawEnemy4() {
		if (scoreCounter < 1000) {
			enemy4.x = enemy4.x - 1.5;
		}
		if (scoreCounter >= 1000 && scoreCounter < 2000) {
			enemy4.x = enemy4.x - 2;
		}
		if (scoreCounter >= 2000 && scoreCounter < 4000) {
			enemy4.x = enemy4.x - 2.5;
		}
		if (scoreCounter >= 4000 && scoreCounter < 6000) {
			enemy4.x = enemy4.x - 3;
		}
		if (scoreCounter >= 6000 && scoreCounter < 8000) {
			enemy4.x = enemy4.x - 3.5;
			if (enemy4.y < 400) {
				enemy4.y = enemy4.y + .2;
			}			
		}
		if (scoreCounter >= 8000 && scoreCounter < 10000) {
			enemy4.x = enemy4.x - 4;
			if (enemy4.y < 400) {
				enemy4.y = enemy4.y + .2;
			}			
		}
		if (scoreCounter >= 10000 && scoreCounter < 12000) {
			enemy4.x = enemy4.x - 4.5;
			if (enemy4.y < 400) {
				enemy4.y = enemy4.y + .2;
			}			
		}
		if (scoreCounter >= 12000) {
			enemy4.x = enemy4.x - 5;
			if (enemy4.y < 400) {
				enemy4.y = enemy4.y + .2;
			}			
		}		
	}
	
	function moveEnemy4() {
		setInterval(redrawEnemy4, 5);
	}
	
		//Move enemy5 	
	function redrawEnemy5() {
		if (scoreCounter < 1000) {
			enemy5.x = enemy5.x - 0;
		}
		if (scoreCounter >= 1000 && scoreCounter < 2000) {
			enemy5.x = enemy5.x - 0;
		}
		if (scoreCounter >= 2000 && scoreCounter < 4000) {
			enemy5.x = enemy5.x - 0;
		}
		if (scoreCounter >= 4000 && scoreCounter < 6000) {
			enemy5.x = enemy5.x - 4.5;
		}
		if (scoreCounter >= 6000 && scoreCounter < 8000) {
			enemy5.x = enemy5.x - 5.5;
			if (enemy5.y < 400) {
				enemy5.y = enemy5.y - .2;
			}			
		}
		if (scoreCounter >= 8000 && scoreCounter < 10000) {
			enemy5.x = enemy5.x - 6;		
		}
		if (scoreCounter >= 10000 && scoreCounter < 12000) {
			enemy5.x = enemy5.x - 6.5;
			if (enemy5.y < 400) {
				enemy5.y = enemy5.y + .2;
			}				
		}
		if (scoreCounter >= 12000) {
			enemy5.x = enemy5.x - 7;
			if (enemy5.y < 400) {
				enemy5.y = enemy5.y - .2;
			}				
		}		
	}
	
	function moveEnemy5() {
		setInterval(redrawEnemy5, 5);
	}
//*************************************************************



//*************************************************************
//Ground Enemy Movement:
//*************************************************************
	function redrawGroundEnemy() {
		if (scoreCounter < 1000) {
			groundEnemy.x = groundEnemy.x - 2;
		}
		if (scoreCounter >= 1000 && scoreCounter < 2000) {
			groundEnemy.x = groundEnemy.x - 2;
		}
		if (scoreCounter >= 2000 && scoreCounter < 4000) {
			groundEnemy.x = groundEnemy.x - 2;
		}
		if (scoreCounter >= 4000 && scoreCounter < 6000) {
			groundEnemy.x = groundEnemy.x - 3;
		}
		if (scoreCounter >= 6000 && scoreCounter < 8000) {
			groundEnemy.x = groundEnemy.x - 3;
		}
		if (scoreCounter >= 8000 && scoreCounter < 10000) {
			groundEnemy.x = groundEnemy.x - 3;
		}
		if (scoreCounter >= 10000 && scoreCounter < 12000) {
			groundEnemy.x = groundEnemy.x - 4;
		}
		if (scoreCounter >= 12000) {
			groundEnemy.x = groundEnemy.x - 4;
		}
	}
	
	function moveGroundEnemy() {
		setInterval(redrawGroundEnemy, 5);
	}
//*************************************************************



//*************************************************************
//Ground Enemy Bullet Movement:
//*************************************************************
	function redrawEnemyBullet() {
		if (groundEnemy.x <= 1150 && groundEnemy.x >= -3000) {
		enemyBullet.y = enemyBullet.y - 5;
		}
	}
	
	function moveEnemyBullet() {
		setInterval(redrawEnemyBullet, 5);
	}
//*************************************************************



//*************************************************************
//Heart Object Moevement:
//*************************************************************
	function redrawHeart() {
		if (scoreCounter < 1000) {
			heart.x = heart.x - 0;
		}
		if (scoreCounter >= 1000 && scoreCounter < 2000) {
			heart.x = heart.x - 0;
		}
		if (scoreCounter >= 2000 && scoreCounter < 4000) {
			heart.x = heart.x - 2.5;
		}
		if (scoreCounter >= 4000 && scoreCounter < 6000) {
			heart.x = heart.x - 3;
		}
		if (scoreCounter >= 6000 && scoreCounter < 8000) {
			heart.x = heart.x - 3.5;
		}
		if (scoreCounter >= 8000 && scoreCounter < 10000) {
			heart.x = heart.x - 4;
		}
		if (scoreCounter >= 10000 && scoreCounter < 12000) {
			heart.x = heart.x - 4.5;
		}
		if (scoreCounter >= 12000) {
			heart.x = heart.x - 5;
		}		
	}
	
	function moveHeart() {
		setInterval(redrawHeart, 5);
	}
//*************************************************************



//*************************************************************
//Initial object set-up:
//*************************************************************
var initialObjectSpawn = function() {	
	player.x = 10;
	player.y = 20;
	
	scrollingBackground.x = 0;
	scrollingBackground.y = 471;
	
	//Spawn enemies
	enemy1.x = 1200;
	enemy1.y = 15 + (Math.random() * (580 - 180));
	
	enemy2.x = 1200;
	enemy2.y = 15 + (Math.random() * (580 - 180));
	
	enemy3.x = 1200;
	enemy3.y = 15 + (Math.random() * (580 - 180));
	
	enemy4.x = 1200;
	enemy4.y = 15 + (Math.random() * (580 - 180));
	
	enemy5.x = 1200;
	enemy5.y = 15 + (Math.random() * (580 - 180));
	
	//Spawn Ground Enemy
	groundEnemy.x = 8000;
	groundEnemy.y = 540;
	
	//Spawn Heart
	heart.x = 12000;
	heart.y = 15 + (Math.random() * (580 - 180));
	
	//Spawn Bullet
	bullet.x = 1250;
	bullet.y = 570;
	
	//Spawn Shield
	shield.x = 12000;
	shield.y = 580;
	
	//Spawn Reset Shield
	resetShield.x = 12000;
	resetShield.y = 580;
	
	//Spawn Enemy Bullet
	enemyBullet.x = 5000;
	enemyBullet.y = 600;

	moveBackground();
	moveGroundEnemy();
	moveEnemyBullet();
	moveEnemy1();
	moveEnemy2();
	moveEnemy3();
	moveEnemy4();
	moveEnemy5();
	moveHeart();
};
//*************************************************************
	


//*************************************************************
//Enemy resets:
//*************************************************************
// Reset on enemy 1 hit:
var reset1 = function() {	
	enemy1.x = 1200;
	enemy1.y = 15 + (Math.random() * (580 - 180));
};

// Reset on enemy 2 hit:
var reset2 = function() {	
	enemy2.x = 1200;
	enemy2.y = 15 + (Math.random() * (580 - 180));
};

// Reset on enemy 3 hit:
var reset3 = function() {
	enemy3.x = 1200;
	enemy3.y = 15 + (Math.random() * (580 - 180));
};

// Reset on enemy 4 hit:
var reset4 = function() {	
	enemy4.x = 1200;
	enemy4.y = 15 + (Math.random() * (580 - 180));
};

// Reset on enemy 5 hit:
var reset5 = function() {	
	enemy5.x = 1200;
	enemy5.y = 15 + (Math.random() * (580 - 180));
};
//*************************************************************



//*************************************************************
//Ground Enemy reset:
//*************************************************************
var resetGroundEnemy = function() {	
	groundEnemy.x = 2500 + (Math.random() * (6000 - 1500));
	groundEnemy.y = 540;
};
//*************************************************************



//*************************************************************
//Ground Enemy Bullet reset:
//*************************************************************
var resetEnemyBullet = function() {	
	enemyBullet.x = groundEnemy.x + 60;
	enemyBullet.y = groundEnemy.y - 5;
};
//*************************************************************



//*************************************************************
//Heart reset:
//*************************************************************
var resetHeart = function() {	
	heart.x = 2500 + (Math.random() * (9500 - 1500));
	heart.y = 15 + (Math.random() * (580 - 180));
};
//*************************************************************



//*************************************************************
//Bullet reset:
//*************************************************************
var resetBullet = function() {	
	bullet.x = 12000;
	bullet.y = 570;
};
//*************************************************************



//*************************************************************
//Shield reset:
//*************************************************************
var resetShield = function() {	
	shield.x = 12000;
	shield.y = 570;
};
//*************************************************************



//*************************************************************
//Reset Shield reset:
//*************************************************************
var resetResetShield = function() {	
	resetShield.x = 12000;
	resetShield.y = 570;
};

if (resetShieldFireReady == true) {
	resetShield.x = player.x + 155;
	resetShield.y = player.y - 25;
	var resetShieldSpeed;
	function redrawResetShield() {
		resetShield.x = resetShield.x + 3;
		if (resetShield.x > 1250) {
		}
		if (resetShield.x > 7000) {
			clearInterval(resetShieldSpeed);
			resetResetShield();
			resetShieldFireReady = true;
		}
	}
	function moveResetShield() {
		resetShieldSound.currentTime = 0;
		resetShieldSound.play();
		resetShieldFireReady = false;
		resetShieldSpeed = setInterval(redrawResetShield, 5)
	}
}
//*************************************************************



//*************************************************************
//Bomb reset:
//*************************************************************
var resetBomb = function() {	
	bomb.x = 8000;
	bomb.y = 800;
};
//*************************************************************



//*************************************************************
//Player movement and hit detection:
//*************************************************************
var update = function (modifier) {
	if (87 in keysDown) {
		if (player.y >= 20) {
		player.y -= player.speed * modifier;
		}
	}
	if (83 in keysDown) {
		if (player.y <=420) {
		player.y += player.speed * modifier;
		}
	}
	if (65 in keysDown) {
		if (player.x >= 10) {
		player.x -= player.speed * modifier;
		}
	}
	if (68 in keysDown) {
		if (player.x <= 1030) {
		player.x += player.speed * modifier;
		}
	}
	if (39 in keysDown) {
		if (bulletFireReady == true) {
			bullet.x = player.x + 155;
			bullet.y = player.y + 23;
			var bulletSpeed;
			function redrawBullet() {
				bullet.x = bullet.x + 10;
				if (bullet.x > 1200) {
					clearInterval(bulletSpeed);
					resetBullet();
					bulletFireReady = true;
				}
			}
			function moveBullet() {
				bulletsUsedCount += 1;
				if (bulletSoundCount == 0) {
					bulletSound1.play();
					bulletSoundCount = 1;
				}
				else if (bulletSoundCount == 1) {
					bulletSound2.play();
					bulletSoundCount = 2;
				}
				else if (bulletSoundCount == 2) {
					bulletSound3.play();
					bulletSoundCount = 3;
				}
				else if (bulletSoundCount == 3) {
					bulletSound4.play();
					bulletSoundCount = 4;
				}
				else if (bulletSoundCount == 4) {
					bulletSound5.play();
					bulletSoundCount = 5;
				}
				else if (bulletSoundCount == 5) {
					bulletSound6.play();
					bulletSoundCount = 6;
				}
				else if (bulletSoundCount == 6) {
					bulletSound7.play();
					bulletSoundCount = 7;
				}					
				else {
					bulletSound8.play();
					bulletSoundCount = 0;					
				}
				bulletFireReady = false;
				bulletSpeed = setInterval(redrawBullet, 5)
			}
			moveBullet();
		}
	}
	if (37 in keysDown) {
		if (shieldFireReady == true) {
			shield.x = player.x + 155;
			shield.y = player.y - 25;
			var shieldSpeed;
			function redrawShield() {
				shield.x = shield.x + 1.25;
				if (shield.x > 1250) {
					shieldText = "Charging...";
				}
				if (shield.x > 7000) {
					clearInterval(shieldSpeed);
					resetShield();
					shieldFireReady = true;
					if (isGameOver == false) {
					shieldRechargedSound.play();
					}
					shieldText = "Ready";
				}
			}
			function moveShield() {
				shieldsUsedCount += 1;
				shieldText = "Firing...";
				shieldSound.play();
				shieldFireReady = false;
				shieldSpeed = setInterval(redrawShield, 5)
			}
			moveShield();
		}
	}
	if (32 in keysDown) {
		if (bombFireReady == true) {
			bomb.x = player.x + 60;
			bomb.y = player.y + 20;
			var bombSpeed;
			function redrawBomb() {
				bomb.x = bomb.x - .8;
				bomb.y = bomb.y + 4.5;
				if (bomb.y >= 640) {
					bombSound.pause();
					bombSound.currentTime = 0;
					if (isBombImpactReady == true) {
						bombImpactSound.play();
					}
					isBombImpactReady = false;
					bomb 
					bombText = "Charging...";
				}
				if (bomb.y > 6000) {
					clearInterval(bombSpeed);
					resetBomb();
					bombFireReady = true;
					if (isGameOver == false) {
					bombReloadedSound.play();
					bombImpactSound.currentTime = 0;
					}
					isBombImpactReady = true;
					bombText = "Ready";
				}
			}
			function moveBomb() {
				bombsUsedCount += 1;
				bombText = "Firing...";
				bombSound.play();
				bombFireReady = false;
				bombSpeed = setInterval(redrawBomb, 5)
			}
			moveBomb();
		}
	}	
	if (38 in keysDown) {
		if (jetSound.volume < .9) {
		jetSound.volume = jetSound.volume + 0.01;
		gameMusic.volume = gameMusic.volume + 0.01;
		}
	}
	if (40 in keysDown) {
		if (gameMusic.volume > .01) {
		jetSound.volume = jetSound.volume - 0.01;
		gameMusic.volume = gameMusic.volume - 0.01;
		}
	}

	// Enemy1 on Player -- Hit Detection
	if (
		//back
		player.x + 10 <= (enemy1.x + 140)
		//front
		&& enemy1.x <= (player.x + 145)
		//top
		&& player.y + 5 <= (enemy1.y + 32)
		//bottom
		&& enemy1.y <= (player.y + 25)
	) {
		if (playerHitByEnemy1Count == 0) {
			playerHitBy11.play();
			playerHitByEnemy1Count = 1;
		}
		else if (playerHitByEnemy1Count == 1){
			playerHitBy12.play();
			playerHitByEnemy1Count = 2;			
		}
		else {
			playerHitBy13.play();
			playerHitByEnemy1Count = 0;				
		}	
		playerLives -= 1;
		player.x = 10;
		player.y = 20;	
		resetShield.x = player.x + 155;
		resetShield.y = player.y - 25;		
		clearInterval(resetShieldSpeed);
		moveResetShield();			
		reset1();
	}
	
	// Enemy2 on Player -- Hit Detection
	if (
		//back
		player.x + 10 <= (enemy2.x + 140)
		//front
		&& enemy2.x <= (player.x + 145)
		//top
		&& player.y + 5 <= (enemy2.y + 32)
		//bottom
		&& enemy2.y <= (player.y + 25)
	) {
		if (playerHitByEnemy2Count == 0) {
			playerHitBy21.play();
			playerHitByEnemy2Count = 1;
		}
		else if (playerHitByEnemy2Count == 1){
			playerHitBy22.play();
			playerHitByEnemy2Count = 2;			
		}
		else {
			playerHitBy23.play();
			playerHitByEnemy2Count = 0;				
		}	
		playerLives -= 1;
		player.x = 10;
		player.y = 20;
		resetShield.x = player.x + 155;
		resetShield.y = player.y - 25;			
		clearInterval(resetShieldSpeed);
		moveResetShield();			
		reset2();
	}
	
	// Enemy3 on Player -- Hit Detection
	if (
		//back
		player.x + 10 <= (enemy3.x + 140)
		//front
		&& enemy3.x <= (player.x + 145)
		//top
		&& player.y + 5 <= (enemy3.y + 32)
		//bottom
		&& enemy3.y <= (player.y + 25)
	) {
		if (playerHitByEnemy3Count == 0) {
			playerHitBy31.play();
			playerHitByEnemy3Count = 1;
		}
		else if (playerHitByEnemy3Count == 1){
			playerHitBy32.play();
			playerHitByEnemy3Count = 2;			
		}
		else {
			playerHitBy33.play();
			playerHitByEnemy3Count = 0;				
		}	
		playerLives -= 1;
		player.x = 10;
		player.y = 20;
		resetShield.x = player.x + 155;
		resetShield.y = player.y - 25;			
		clearInterval(resetShieldSpeed);
		moveResetShield();			
		reset3();
	}
	
	// Enemy4 on Player -- Hit Detection
	if (
		//back
		player.x + 10 <= (enemy4.x + 140)
		//front
		&& enemy4.x <= (player.x + 145)
		//top
		&& player.y + 5 <= (enemy4.y + 32)
		//bottom
		&& enemy4.y <= (player.y + 25)
	) {
		if (playerHitByEnemy4Count == 0) {
			playerHitBy41.play();
			playerHitByEnemy4Count = 1;
		}
		else if (playerHitByEnemy4Count == 1){
			playerHitBy42.play();
			playerHitByEnemy4Count = 2;			
		}
		else {
			playerHitBy43.play();
			playerHitByEnemy4Count = 0;				
		}
		playerLives -= 1;
		player.x = 10;
		player.y = 20;
		resetShield.x = player.x + 155;
		resetShield.y = player.y - 25;			
		clearInterval(resetShieldSpeed);
		moveResetShield();			
		reset4();
	}
	
	// Enemy5 on Player -- Hit Detection
	if (
		//back
		player.x + 10 <= (enemy5.x + 140)
		//front
		&& enemy5.x <= (player.x + 145)
		//top
		&& player.y + 5 <= (enemy5.y + 32)
		//bottom
		&& enemy5.y <= (player.y + 25)
	) {
		if (playerHitByEnemy5Count == 0) {
			playerHitBy51.play();
			playerHitByEnemy5Count = 1;
		}
		else if (playerHitByEnemy5Count == 1){
			playerHitBy52.play();
			playerHitByEnemy5Count = 2;			
		}
		else {
			playerHitBy53.play();
			playerHitByEnemy5Count = 0;				
		}
		playerLives -= 1;
		player.x = 10;
		player.y = 20;
		resetShield.x = player.x + 155;
		resetShield.y = player.y - 25;			
		clearInterval(resetShieldSpeed);
		moveResetShield();			
		reset5();
	}	
	
	// Player on Heart -- Hit Detection
	if (
		//back
		player.x + 10 <= (heart.x + 50)
		//front
		&& heart.x <= (player.x + 145)
		//top
		&& player.y + 15 <= (heart.y + 70)
		//bottom
		&& heart.y <= (player.y + 25)
	) {
		heartSound.play();
		playerLives += 1;
		heartsCollected += 1;
		resetHeart();
	}
		
	// Bullet on Enemy1 -- Hit Detection	
	if (
		//back
		bullet.x + 10 <= (enemy1.x + 200)
		//front
		&& enemy1.x <= (bullet.x + 10)
		//top
		&& bullet.y - 20 <= (enemy1.y + 20)
		//bottom
		&& enemy1.y <= (bullet.y + 10)
	) {
		if (enemy1SoundCount == 0) {
			enemy1Hit1.play();
			enemy1SoundCount = 1;
		}
		else if (enemy1SoundCount == 1){
			enemy1Hit2.play();
			enemy1SoundCount = 2;			
		}
		else {
			enemy1Hit3.play();
			enemy1SoundCount = 0;				
		}
		reset1();
		resetBullet();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByBullets += 1;
			
	}

	// Bullet on Enemy2 -- Hit Detection	
	if (
		//back
		bullet.x + 10 <= (enemy2.x + 200)
		//front
		&& enemy2.x <= (bullet.x + 10)
		//top
		&& bullet.y - 20 <= (enemy2.y + 20)
		//bottom
		&& enemy2.y <= (bullet.y + 10)
	) {
		if (enemy2SoundCount == 0) {
			enemy2Hit1.play();
			enemy2SoundCount = 1;
		}
		else if (enemy2SoundCount == 1){
			enemy2Hit2.play();
			enemy2SoundCount = 2;			
		}
		else {
			enemy2Hit3.play();
			enemy2SoundCount = 0;				
		}
		reset2();
		resetBullet();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByBullets += 1;		
	}
	
	// Bullet on Enemy3 -- Hit Detection	
	if (
		//back
		bullet.x + 10 <= (enemy3.x + 200)
		//front
		&& enemy3.x <= (bullet.x + 10)
		//top
		&& bullet.y - 20 <= (enemy3.y + 20)
		//bottom
		&& enemy3.y <= (bullet.y + 10)
	) {
		if (enemy3SoundCount == 0) {
			enemy3Hit1.play();
			enemy3SoundCount = 1;
		}
		else if (enemy3SoundCount == 1){
			enemy3Hit2.play();
			enemy3SoundCount = 2;			
		}
		else {
			enemy3Hit3.play();
			enemy3SoundCount = 0;				
		}
		reset3();
		resetBullet();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByBullets += 1;	
	}
	
	// Bullet on Enemy4 -- Hit Detection	
	if (
		//back
		bullet.x + 10 <= (enemy4.x + 200)
		//front
		&& enemy4.x <= (bullet.x + 10)
		//top
		&& bullet.y - 20 <= (enemy4.y + 20)
		//bottom
		&& enemy4.y <= (bullet.y + 10)
	) {
		if (enemy4SoundCount == 0) {
			enemy4Hit1.play();
			enemy4SoundCount = 1;
		}
		else if (enemy4SoundCount == 1){
			enemy4Hit2.play();
			enemy4SoundCount = 2;			
		}
		else {
			enemy4Hit3.play();
			enemy4SoundCount = 0;				
		}
		reset4();
		resetBullet();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByBullets += 1;	
	}

	// Bullet on Enemy5 -- Hit Detection	
	if (
		//back
		bullet.x + 10 <= (enemy5.x + 200)
		//front
		&& enemy5.x <= (bullet.x + 10)
		//top
		&& bullet.y - 20 <= (enemy5.y + 20)
		//bottom
		&& enemy5.y <= (bullet.y + 10)
	) {
		if (enemy5SoundCount == 0) {
			enemy5Hit1.play();
			enemy5SoundCount = 1;
		}
		else if (enemy5SoundCount == 1){
			enemy5Hit2.play();
			enemy5SoundCount = 2;			
		}
		else {
			enemy5Hit3.play();
			enemy5SoundCount = 0;				
		}
		reset5();
		resetBullet();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByBullets += 1;	
	}	
	
	// Shield on Enemy1 -- Hit Detection	
	if (
		//back
		shield.x + 10 <= (enemy1.x + 200)
		//front
		&& enemy1.x <= (shield.x + 10)
		//top
		&& shield.y - 20 <= (enemy1.y + 20)
		//bottom
		&& enemy1.y <= (shield.y + 100)
	) {
		if (enemy1SoundCount == 0) {
			enemy3Hit1.play();
			enemy1SoundCount = 1;
		}
		else if (enemy1SoundCount == 1){
			enemy3Hit2.play();
			enemy1SoundCount = 2;			
		}
		else {
			enemy3Hit3.play();
			enemy1SoundCount = 0;				
		}
		reset1();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByShields += 1;
	}		
	
	// Shield on Enemy2 -- Hit Detection	
	if (
		//back
		shield.x + 10 <= (enemy2.x + 200)
		//front
		&& enemy2.x <= (shield.x + 10)
		//top
		&& shield.y - 20 <= (enemy2.y + 20)
		//bottom
		&& enemy2.y <= (shield.y + 100)
	) {
		if (enemy2SoundCount == 0) {
			enemy2Hit1.play();
			enemy2SoundCount = 1;
		}
		else if (enemy2SoundCount == 1){
			enemy2Hit2.play();
			enemy2SoundCount = 2;			
		}
		else {
			enemy2Hit3.play();
			enemy2SoundCount = 0;				
		}
		reset2();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByShields += 1;
	}	
	
	// Shield on Enemy3 -- Hit Detection	
	if (
		//back
		shield.x + 10 <= (enemy3.x + 200)
		//front
		&& enemy3.x <= (shield.x + 10)
		//top
		&& shield.y - 20 <= (enemy3.y + 20)
		//bottom
		&& enemy3.y <= (shield.y + 100)
	) {
		if (enemy3SoundCount == 0) {
			enemy3Hit1.play();
			enemy3SoundCount = 1;
		}
		else if (enemy3SoundCount == 1){
			enemy3Hit2.play();
			enemy3SoundCount = 2;			
		}
		else {
			enemy3Hit3.play();
			enemy3SoundCount = 0;				
		}
		reset3();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByShields += 1;
	}
	
	// Shield on Enemy4 -- Hit Detection
	if (
		//back
		shield.x + 10 <= (enemy4.x + 200)
		//front
		&& enemy4.x <= (shield.x + 10)
		//top
		&& shield.y - 20 <= (enemy4.y + 20)
		//bottom
		&& enemy4.y <= (shield.y + 100)
	) {
		if (enemy4SoundCount == 0) {
			enemy4Hit1.play();
			enemy4SoundCount = 1;
		}
		else if (enemy4SoundCount == 1){
			enemy4Hit2.play();
			enemy4SoundCount = 2;			
		}
		else {
			enemy4Hit3.play();
			enemy4SoundCount = 0;				
		}
		reset4();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByShields += 1;
	}
	
	// Shield on Enemy5 -- Hit Detection
	if (
		//back
		shield.x + 10 <= (enemy5.x + 200)
		//front
		&& enemy5.x <= (shield.x + 10)
		//top
		&& shield.y - 20 <= (enemy5.y + 20)
		//bottom
		&& enemy5.y <= (shield.y + 100)
	) {
		if (enemy5SoundCount == 0) {
			enemy5Hit1.play();
			enemy5SoundCount = 1;
		}
		else if (enemy4SoundCount == 1){
			enemy5Hit2.play();
			enemy5SoundCount = 2;			
		}
		else {
			enemy5Hit3.play();
			enemy5SoundCount = 0;				
		}
		reset5();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByShields += 1;
	}	
	
	// Reset Shield on Enemy1 -- Hit Detection	
	if (
		//back
		resetShield.x + 10 <= (enemy1.x + 200)
		//front
		&& enemy1.x <= (resetShield.x + 10)
		//top
		&& resetShield.y - 20 <= (enemy1.y + 20)
		//bottom
		&& enemy1.y <= (resetShield.y + 100)
	) {
		if (enemy1SoundCount == 0) {
			enemy3Hit1.play();
			enemy1SoundCount = 1;
		}
		else if (enemy1SoundCount == 1){
			enemy3Hit2.play();
			enemy1SoundCount = 2;			
		}
		else {
			enemy3Hit3.play();
			enemy1SoundCount = 0;				
		}
		reset1();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByShields += 1;
	}		
	
	// Reset Shield on Enemy2 -- Hit Detection	
	if (
		//back
		resetShield.x + 10 <= (enemy2.x + 200)
		//front
		&& enemy2.x <= (resetShield.x + 10)
		//top
		&& resetShield.y - 20 <= (enemy2.y + 20)
		//bottom
		&& enemy2.y <= (resetShield.y + 100)
	) {
		if (enemy2SoundCount == 0) {
			enemy2Hit1.play();
			enemy2SoundCount = 1;
		}
		else if (enemy2SoundCount == 1){
			enemy2Hit2.play();
			enemy2SoundCount = 2;			
		}
		else {
			enemy2Hit3.play();
			enemy2SoundCount = 0;				
		}
		reset2();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByShields += 1;
	}	
	
	// Reset Shield on Enemy3 -- Hit Detection	
	if (
		//back
		resetShield.x + 10 <= (enemy3.x + 200)
		//front
		&& enemy3.x <= (resetShield.x + 10)
		//top
		&& resetShield.y - 20 <= (enemy3.y + 20)
		//bottom
		&& enemy3.y <= (resetShield.y + 100)
	) {
		if (enemy3SoundCount == 0) {
			enemy3Hit1.play();
			enemy3SoundCount = 1;
		}
		else if (enemy3SoundCount == 1){
			enemy3Hit2.play();
			enemy3SoundCount = 2;			
		}
		else {
			enemy3Hit3.play();
			enemy3SoundCount = 0;				
		}
		reset3();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByShields += 1;
	}
	
	// Reset Shield on Enemy4 -- Hit Detection
	if (
		//back
		resetShield.x + 10 <= (enemy4.x + 200)
		//front
		&& enemy4.x <= (resetShield.x + 10)
		//top
		&& resetShield.y - 20 <= (enemy4.y + 20)
		//bottom
		&& enemy4.y <= (resetShield.y + 100)
	) {
		if (enemy4SoundCount == 0) {
			enemy4Hit1.play();
			enemy4SoundCount = 1;
		}
		else if (enemy4SoundCount == 1){
			enemy4Hit2.play();
			enemy4SoundCount = 2;			
		}
		else {
			enemy4Hit3.play();
			enemy4SoundCount = 0;				
		}
		reset4();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByShields += 1;
	}
	
	// Reset Shield on Enemy5 -- Hit Detection
	if (
		//back
		resetShield.x + 10 <= (enemy5.x + 200)
		//front
		&& enemy5.x <= (resetShield.x + 10)
		//top
		&& resetShield.y - 20 <= (enemy5.y + 20)
		//bottom
		&& enemy5.y <= (resetShield.y + 100)
	) {
		if (enemy5SoundCount == 0) {
			enemy5Hit1.play();
			enemy5SoundCount = 1;
		}
		else if (enemy4SoundCount == 1){
			enemy5Hit2.play();
			enemy5SoundCount = 2;			
		}
		else {
			enemy5Hit3.play();
			enemy5SoundCount = 0;				
		}
		reset5();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByShields += 1;
	}		
	
	// Bomb on Enemy1 -- Hit Detection	
	if (
		//back
		bomb.x + 10 <= (enemy1.x + 200)
		//front
		&& enemy1.x <= (bomb.x + 10)
		//top
		&& bomb.y - 20 <= (enemy1.y + 20)
		//bottom
		&& enemy1.y <= (bomb.y + 10)
	) {
		if (enemy1SoundCount == 0) {
			enemy1Hit1.play();
			enemy1SoundCount = 1;
		}
		else if (enemy1SoundCount == 1){
			enemy1Hit2.play();
			enemy1SoundCount = 2;			
		}
		else {
			enemy1Hit3.play();
			enemy1SoundCount = 0;				
		}
		reset1();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByBombs += 1;		
	}
	
	// Bomb on Enemy2 -- Hit Detection	
	if (
		//back
		bomb.x + 10 <= (enemy2.x + 200)
		//front
		&& enemy2.x <= (bomb.x + 10)
		//top
		&& bomb.y - 20 <= (enemy2.y + 20)
		//bottom
		&& enemy2.y <= (bomb.y + 10)
	) {
		if (enemy2SoundCount == 0) {
			enemy2Hit1.play();
			enemy2SoundCount = 1;
		}
		else if (enemy2SoundCount == 1){
			enemy2Hit2.play();
			enemy2SoundCount = 2;			
		}
		else {
			enemy2Hit3.play();
			enemy2SoundCount = 0;				
		}
		reset2();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByBombs += 1;		
	}

	// Bomb on Enemy3 -- Hit Detection	
	if (
		//back
		bomb.x + 10 <= (enemy3.x + 200)
		//front
		&& enemy3.x <= (bomb.x + 10)
		//top
		&& bomb.y - 20 <= (enemy3.y + 20)
		//bottom
		&& enemy3.y <= (bomb.y + 10)
	) {
		if (enemy3SoundCount == 0) {
			enemy3Hit1.play();
			enemy3SoundCount = 1;
		}
		else if (enemy3SoundCount == 1){
			enemy3Hit2.play();
			enemy3SoundCount = 2;			
		}
		else {
			enemy3Hit3.play();
			enemy3SoundCount = 0;				
		}
		reset3();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByBombs += 1;		
	}

	// Bomb on Enemy4 -- Hit Detection	
	if (
		//back
		bomb.x + 10 <= (enemy4.x + 200)
		//front
		&& enemy4.x <= (bomb.x + 10)
		//top
		&& bomb.y - 20 <= (enemy4.y + 20)
		//bottom
		&& enemy4.y <= (bomb.y + 10)
	) {
		if (enemy4SoundCount == 0) {
			enemy4Hit1.play();
			enemy4SoundCount = 1;
		}
		else if (enemy4SoundCount == 1){
			enemy4Hit2.play();
			enemy4SoundCount = 2;			
		}
		else {
			enemy4Hit3.play();
			enemy4SoundCount = 0;				
		}
		reset4();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByBombs += 1;		
	}
	
	// Bomb on Enemy5 -- Hit Detection	
	if (
		//back
		bomb.x + 10 <= (enemy5.x + 200)
		//front
		&& enemy5.x <= (bomb.x + 10)
		//top
		&& bomb.y - 20 <= (enemy5.y + 20)
		//bottom
		&& enemy5.y <= (bomb.y + 10)
	) {
		if (enemy5SoundCount == 0) {
			enemy5Hit1.play();
			enemy5SoundCount = 1;
		}
		else if (enemy5SoundCount == 1){
			enemy5Hit2.play();
			enemy5SoundCount = 2;			
		}
		else {
			enemy5Hit3.play();
			enemy5SoundCount = 0;				
		}
		reset5();
		scoreCounter += 20;
		flyingEnemiesKilled += 1;
		enemiesKilledByBombs += 1;		
	}	

	// Bomb on Ground Enemy -- Hit Detection	
	if (
		//back
		bomb.x + 10 <= (groundEnemy.x + 128)
		//front
		&& groundEnemy.x <= (bomb.x + 10)
		//top
		&& bomb.y - 20 <= (groundEnemy.y + 50)
		//bottom
		&& groundEnemy.y <= (bomb.y + 10)
	) {
		groundEnemyHit.play();
		resetGroundEnemy();
		resetEnemyBullet();
		scoreCounter += 100;
		groundEnemiesKilled += 1;
		enemiesKilledByBombs += 1;		
	}		
	
	// Enemy Bullet on Player -- Hit Detection
	if (
		//back
		enemyBullet.x + 10 <= (player.x + 150)
		//front
		&& player.x <= (enemyBullet.x + 10)
		//top
		&& enemyBullet.y + 10 <= (player.y + 32)
		//bottom
		&& player.y <= (enemyBullet.y + 10)
	) {
		playerHitByEnemyBulletSound.play();
		playerLives -= 1;
		player.x = 10;
		player.y = 20;
		resetShield.x = player.x + 155;
		resetShield.y = player.y - 25;			
		clearInterval(resetShieldSpeed);
		moveResetShield();			
		resetEnemyBullet();
	}	
	
	// Reset enemies if player avoids or doesn't shoot:
	if (enemy1.x < -140) {
		scoreCounter += 15;		
		reset1();
	}
	if (enemy2.x < -140) {
		scoreCounter += 15;
		reset2();
	}
	if (enemy3.x < -140) {
		scoreCounter += 15;
		reset3();
	}
	if (enemy4.x < -140) {
		scoreCounter += 15;
		reset4();
	}
	if (enemy5.x < -140) {
		scoreCounter += 15;
		reset5();
	}
	if (heart.x < -1000) {
		resetHeart();
	}
	if (groundEnemy.x < -3000) {
		resetGroundEnemy();
	}
	if (enemyBullet.y < 0) {
		resetEnemyBullet();
		if (groundEnemy.x > -50) {
			if (enemyBulletSoundCount == 0) {
				enemyBulletSound1.play();
				enemyBulletSoundCount = 1;
			}
			else if (enemyBulletSoundCount == 1) {
				enemyBulletSound2.play();
				enemyBulletSoundCount = 2;
			}
			else if (enemyBulletSoundCount == 2) {
				enemyBulletSound3.play();
				enemyBulletSoundCount = 3;
			}
			else if (enemyBulletSoundCount == 3) {
				enemyBulletSound4.play();
				enemyBulletSoundCount = 4;
			}
			else if (enemyBulletSoundCount == 4) {
				enemyBulletSound5.play();
				enemyBulletSoundCount = 5;
			}
			else if (enemyBulletSoundCount == 5) {
				enemyBulletSound6.play();
				enemyBulletSoundCount = 6;
			}
			else if (enemyBulletSoundCount == 6) {
				enemyBulletSound7.play();
				enemyBulletSoundCount = 7;
			}					
			else {
				enemyBulletSound8.play();
				enemyBulletSoundCount = 0;					
			}
		}		
	}
};
//*************************************************************



//*************************************************************
// Add all objects to canvas:
//*************************************************************
var render = function() {
	if (staticBackgroundReady) {
		ctx.drawImage(staticBackgroundObject, 0, 0);
	}
	if (scrollingBackgroundReady) {
		ctx.drawImage(scrollingBackgroundObject, scrollingBackground.x, scrollingBackground.y);
	}
	if (bulletReady) {
		ctx.drawImage(bulletObject, bullet.x, bullet.y);
	}
	
	if (shieldReady) {
		ctx.drawImage(shieldObject, shield.x, shield.y);
	}
	
	if (resetShieldReady) {
		ctx.drawImage(resetShieldObject, resetShield.x, resetShield.y);
	}
	
	if (bombReady) {
		ctx.drawImage(bombObject, bomb.x, bomb.y);
	}
	
	if (enemy1Ready) {
		ctx.drawImage(enemy1Object, enemy1.x, enemy1.y);
	}
	
	if (enemy2Ready) {
		ctx.drawImage(enemy2Object, enemy2.x, enemy2.y);
	}
	
	if (enemy3Ready) {
		ctx.drawImage(enemy3Object, enemy3.x, enemy3.y);
	}
	
	if (enemy4Ready) {
		ctx.drawImage(enemy4Object, enemy4.x, enemy4.y);
	}
	
	if (enemy5Ready) {
		ctx.drawImage(enemy5Object, enemy5.x, enemy5.y);
	}	
	
	if (groundEnemyReady) {
		ctx.drawImage(groundEnemyObject, groundEnemy.x, groundEnemy.y);
	}
	
	if (enemyBulletReady) {
		ctx.drawImage(enemyBulletObject, enemyBullet.x, enemyBullet.y);
	}
	
	if (playerReady) {
		ctx.drawImage(playerObject, player.x, player.y);
	}
	
	if (heartReady) {
		ctx.drawImage(heartObject, heart.x, heart.y);
	}

	// Enemy Difficulty: 
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "20px Calibri";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Enemy Difficulty: " + enemyDifficulty, 20, 600);
	
	// Shield Status: 
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "20px Calibri";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Shield Status: " + shieldText, 350, 600);
	
	// Bomb Status: 
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "20px Calibri";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Bomb Status: " + bombText, 600, 600);	
	
	//Lives
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "20px Calibri";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Lives: " + playerLives, 950, 600);
	
	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "20px Calibri";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Score: " + scoreCounter, 1080, 600);
};
//*************************************************************



//*************************************************************
//Audio:
//*************************************************************
var jetSound = new Audio('sounds/jetNoise.mp3');
var heartSound = new Audio('sounds/heartSound.mp3');

var playerHitBy11 = new Audio('sounds/playerHit.mp3');
var playerHitBy12 = new Audio('sounds/playerHit.mp3');
var playerHitBy13 = new Audio('sounds/playerHit.mp3');

var playerHitBy21 = new Audio('sounds/playerHit.mp3');
var playerHitBy22 = new Audio('sounds/playerHit.mp3');
var playerHitBy23 = new Audio('sounds/playerHit.mp3');

var playerHitBy31 = new Audio('sounds/playerHit.mp3');
var playerHitBy32 = new Audio('sounds/playerHit.mp3');
var playerHitBy33 = new Audio('sounds/playerHit.mp3');

var playerHitBy41 = new Audio('sounds/playerHit.mp3');
var playerHitBy42 = new Audio('sounds/playerHit.mp3');
var playerHitBy43 = new Audio('sounds/playerHit.mp3');

var playerHitBy51 = new Audio('sounds/playerHit.mp3');
var playerHitBy52 = new Audio('sounds/playerHit.mp3');
var playerHitBy53 = new Audio('sounds/playerHit.mp3');

var playerHitByEnemyBulletSound = new Audio('sounds/playerHit.mp3');

var enemy1Hit1 = new Audio('sounds/enemyHit.mp3');
var enemy2Hit1 = new Audio('sounds/enemyHit.mp3');
var enemy3Hit1 = new Audio('sounds/enemyHit.mp3');
var enemy4Hit1 = new Audio('sounds/enemyHit.mp3');
var enemy5Hit1 = new Audio('sounds/enemyHit.mp3');

var enemy1Hit2 = new Audio('sounds/enemyHit.mp3');
var enemy2Hit2 = new Audio('sounds/enemyHit.mp3');
var enemy3Hit2 = new Audio('sounds/enemyHit.mp3');
var enemy4Hit2 = new Audio('sounds/enemyHit.mp3');
var enemy5Hit2 = new Audio('sounds/enemyHit.mp3');

var enemy1Hit3 = new Audio('sounds/enemyHit.mp3');
var enemy2Hit3 = new Audio('sounds/enemyHit.mp3');
var enemy3Hit3 = new Audio('sounds/enemyHit.mp3');
var enemy4Hit3 = new Audio('sounds/enemyHit.mp3');
var enemy5Hit3 = new Audio('sounds/enemyHit.mp3');

var groundEnemyHit = new Audio('sounds/enemyHit.mp3');
var enemyBulletSound1 = new Audio('sounds/enemyBulletNoise.mp3');
var enemyBulletSound2 = new Audio('sounds/enemyBulletNoise.mp3');
var enemyBulletSound3 = new Audio('sounds/enemyBulletNoise.mp3');
var enemyBulletSound4 = new Audio('sounds/enemyBulletNoise.mp3');
var enemyBulletSound5 = new Audio('sounds/enemyBulletNoise.mp3');
var enemyBulletSound6 = new Audio('sounds/enemyBulletNoise.mp3');
var enemyBulletSound7 = new Audio('sounds/enemyBulletNoise.mp3');
var enemyBulletSound8 = new Audio('sounds/enemyBulletNoise.mp3');

var bulletSound1 = new Audio('sounds/bulletNoise.mp3');
var bulletSound2 = new Audio('sounds/bulletNoise.mp3');
var bulletSound3 = new Audio('sounds/bulletNoise.mp3');
var bulletSound4 = new Audio('sounds/bulletNoise.mp3');
var bulletSound5 = new Audio('sounds/bulletNoise.mp3');
var bulletSound6 = new Audio('sounds/bulletNoise.mp3');
var bulletSound7 = new Audio('sounds/bulletNoise.mp3');
var bulletSound8 = new Audio('sounds/bulletNoise.mp3');

var shieldSound = new Audio('sounds/shieldNoise.mp3');
var shieldRechargedSound = new Audio('sounds/shieldRecharged.mp3');

var resetShieldSound = new Audio('sounds/resetShieldNoise.mp3');

var bombSound = new Audio('sounds/bombNoise.mp3');
var bombReloadedSound = new Audio('sounds/bombReloaded.mp3');
var bombImpactSound = new Audio('sounds/bombImpact.mp3');


var gameMusic = new Audio('sounds/gameMusic.mp3');
var gameOverMusic = new Audio('sounds/gameOver.mp3');
var enemyDiffSound = new Audio('sounds/enemyDifficulty.mp3');
var introSound = new Audio('sounds/intro.mp3');

playerHitBy11.volume = 0.4;
playerHitBy12.volume = 0.4;
playerHitBy13.volume = 0.4;
playerHitBy21.volume = 0.4;
playerHitBy22.volume = 0.4;
playerHitBy23.volume = 0.4;
playerHitBy31.volume = 0.4;
playerHitBy32.volume = 0.4;
playerHitBy33.volume = 0.4;
playerHitBy41.volume = 0.4;
playerHitBy42.volume = 0.4;
playerHitBy43.volume = 0.4;

shieldRechargedSound.volume = 0.6;
bombSound.volume = 0.6;

introSound.volume = 1;
enemyDiffSound.volume = 0.3;
heartSound.volume = 0.4;
jetSound.volume = 0.6;
gameMusic.volume = 0.3;
//*************************************************************



//*************************************************************
//High Score Prompt:
//*************************************************************
var highScoreWindow = function() {
	if (jsCheckForTen < 10) {
		if (wasFormOpened == false) {		
			document.cookie = 'score=' + scoreCounter;
			window.open("http://csmupa.com/~getzmc26/pub3304/aerialAttack/form.php", "_blank");
		}
		wasFormOpened = true;
	}
	else if (scoreCounter > jsGetLastScore) {
		if (wasFormOpened == false) {
			document.cookie = 'score=' + scoreCounter;
			window.open("http://csmupa.com/~getzmc26/pub3304/aerialAttack/form.php", "_blank");
		}			
		wasFormOpened = true;	
	}
	else {
		//loser
	}
}
//*************************************************************



//*************************************************************
//Kill game:
//*************************************************************
function killGame() {
   throw new Error('Not an error. I needed a way to kill the running JavaScript');
}
//*************************************************************



//*************************************************************
// Game over:
//*************************************************************
	var gameOver = function() {
		if (bulletsUsedCount == 0) {
			bulletAccuracy = 0;
		}
		else {
			bulletAccuracy = (Math.round((enemiesKilledByBullets / bulletsUsedCount) * 100));
		}
		if (shieldsUsedCount == 0) {
			shieldAccuracy = 0;
		}
		else {
			shieldAccuracy = (Math.round((enemiesKilledByShields / shieldsUsedCount) * 100));
		}
		if (bombsUsedCount == 0) {
			bombAccuracy = 0;
		}
		else {
			bombAccuracy = (Math.round((enemiesKilledByBombs / bombsUsedCount) * 100));
		}		
		isGameOver = true;
		resetShieldSound.pause();
		gameOverMusic.play();
		ctx.drawImage(staticBackgroundObject, 0, 0);
		ctx.drawImage(gameOverBackgroundBottomObject, 0, 530);
		
		//Top
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "40px Calibri";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("Game Over", 600, 200);
		
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Calibri";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("Score: " + scoreCounter, 600, 270);
		
		//Column 1	
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Calibri";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("Flying Enemies Killed: " + flyingEnemiesKilled, 360, 320);
		
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Calibri";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("Ground Enemies Killed: " + groundEnemiesKilled, 360, 350);
		
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Calibri";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("Hearts Collected: " + heartsCollected, 360, 380);
		
		//Column 2		
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Calibri";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("Bullets Fired: " + bulletsUsedCount, 600, 320);
		
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Calibri";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("Shields Used: " + shieldsUsedCount, 600, 350);

		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Calibri";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("Bombs Fired: " + bombsUsedCount, 600, 380);
		
		//Column 3
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Calibri";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("Bullet Accuracy: " + bulletAccuracy + "%", 840, 320);	
		
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Calibri";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("Shield Accuracy: " + shieldAccuracy + "%", 840, 350);
		
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Calibri";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("Bomb Accuracy: " + bombAccuracy + "%", 840, 380);
	};
//*************************************************************



//*************************************************************
// Main Loop:
//*************************************************************
var main = function() {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();
	if (playerLives == -1) {
		jetSound.pause();
		gameMusic.pause();
		gameOver();
		highScoreWindow();
		killGame();
	}
	then = now;
	requestAnimationFrame(main);
};

// requestAnimationFrame for most browsers...
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
//*************************************************************



//*************************************************************
//Game start after sleep:
//*************************************************************
function gameStartUp() {
    setTimeout(function(){ 
	initialObjectSpawn();
	jetSound.play();
	gameMusic.play();
	player.x = 10;
	player.y = 240;
	main();
	}, 7000);
};
//*************************************************************



//*************************************************************
//Welcome message then begin game:
//*************************************************************
var then = Date.now();
//alert("Number of entries: " + jsCheckForTen + "\n\n" + "Score to beat: " + jsGetLastScore);
introSound.play();
ctx.fillStyle = "rgb(250, 250, 250)";
ctx.font = "24px Calibri";
ctx.textAlign = "center";
ctx.textBaseline = "top";
ctx.fillText("Stay alive as long as you can.", 600, 220);
ctx.fillText("Use projectiles to shoot enemies and move to avoid enemies.", 600, 260);
ctx.fillText("Collect hearts for extra lives.", 600, 300);
ctx.fillText("Good luck...", 600, 390);

gameStartUp();
//*************************************************************