window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 1200, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update} );
    
    function preload() {
        // Load images
        game.load.image( 'asteroid', 'assets/asteroid-xs.png' );
        game.load.image( 'bullet', 'assets/bullet.png' );
        game.load.image( 'player', 'assets/shiphat.png' );
        game.load.image( 'background', 'assets/space.jpg' );
        game.load.image( 'earth', 'assets/earth.png' );
        game.load.image( 'crosshair', 'assets/crosshair.png' );
    }
    
    var speed = 6; // Player speed when moving
    var bullet, bullets; // Bullets the player fires
    var asteroid, asteroids; // Incoming asteroids
    var bulletTime = 0; // Delay timer variable used when firing bullets
    var asteroidTime = 0; // Delay timer variable used when spawning asteroids
    var background, earth, player, crosshair; // Sprite/images for the background, earth, and the player
    var endGameText, gameStartText, scoreText; // Text displayed when the game ends
    var gameStarted = false; // Boolean for when game is started
    var counter = 0; // Counter for keeping track of asteroids destoryed
    var style = {fill:'white', align:'center', fontSize:80}; // Text style for end-game text
    var limit = 60, score = 0; // Maximum number of asteroids that will spawn
    
    function create() {
        background = game.add.image( 0, 0, 'background'); // Spawn background
        
        // Spawn Earth and position it
        earth = game.add.sprite(-350, game.world.centerY, 'earth');
        game.physics.enable( earth, Phaser.Physics.ARCADE );
        earth.anchor.setTo(0.5, 0.5);
        earth.scale.setTo(0.5, 0.5);
        earth.angle = 25;
        
        // Create group of bullets used when firing
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 0.5);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
        
        // Spawn player and position it
        player = game.add.sprite(game.world.centerX*0.5, game.world.centerY, 'player');
        player.anchor.setTo(0.5, 0.5);
        //player.scale.setTo(0.4);
        game.physics.enable( player, Phaser.Physics.ARCADE );
        player.body.collideWorldBounds = true;
        
        // Create group of asteroids used for spawning towards player
        asteroids = game.add.group();
        asteroids.enableBody = true;
        asteroids.physicsBodyType = Phaser.Physics.ARCADE;
        asteroids.createMultiple(30, 'asteroid');
        asteroids.setAll('anchor.x', 1);
        asteroids.setAll('anchor.y', 0.5);
        asteroids.setAll('outOfBoundsKill', true);
        asteroids.setAll('checkWorldBounds', true);
        
        crosshair = game.add.sprite(600, 300, 'crosshair');
        crosshair.anchor.setTo(0.5, 0.5);
        
        // Beginning game text
        gameStartText = game.add.text(600, 300, 'Hit Enter\nto Begin!', style);
        gameStartText.anchor.setTo(0.5);
        
        // Prevent input keys from scrolling the screen
        game.input.keyboard.addKeyCapture(Phaser.KeyCode.UP);
        game.input.keyboard.addKeyCapture(Phaser.KeyCode.DOWN);
        game.input.keyboard.addKeyCapture(Phaser.KeyCode.LEFT);
        game.input.keyboard.addKeyCapture(Phaser.KeyCode.RIGHT);
        game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR);
        game.input.keyboard.addKeyCapture(Phaser.KeyCode.ENTER);
    }
    
    function update() {
        
        
        // To move player up
        if (game.input.keyboard.isDown(Phaser.KeyCode.W))
        {
            player.y -= speed;
        }
        
        // To move player down
        if (game.input.keyboard.isDown(Phaser.KeyCode.S))
        {
            player.y += speed;
        }
        
        // To move player left
        if (player.x >= game.world.centerX*0.5 && game.input.keyboard.isDown(Phaser.KeyCode.A))
        {
            player.x -= speed;
        }
        
        // To move player right
        if (player.x <= game.world.centerX*0.5 + 200 && game.input.keyboard.isDown(Phaser.KeyCode.D))
        {
            player.x += speed;
        }
        
        // To fire bullets
        if (game.input.activePointer.leftButton.isDown)
        {
            fireBullet();
        }
        
        // To start game
        if (!gameStarted && game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR))
        {
            gameStartText.destroy();
            gameStarted = true;
            scoreText = game.add.text(0, 0, score.toString(), style);
        }
        
        // Spawn asteroids
        if (gameStarted)
        {
            spawnAsteroid();
        }
        
        // When maximum number of asteroids destroyed
        if (counter === limit)
        {
            endGameWin();    
        }
        
        // Dealing with bullet-asteroid, earth-asteroid, and player-asteroid collisions
        game.physics.arcade.overlap(bullets, asteroids, bulletHitAsteroid, null, this);
        game.physics.arcade.overlap(earth, asteroids, endGameLoss, null, this);
        game.physics.arcade.overlap(player, asteroids, endGameLoss, null, this);
        crosshair.x = game.input.mousePointer.x;
        crosshair.y = game.input.mousePointer.y;
        player.rotation = game.physics.arcade.angleToPointer(player);

    }
    
    function fireBullet()
    {
        //  Use timer delay to limit firing rate
        if (game.time.now > bulletTime)
        {
            //  Grab the first bullet we can from the group of bullets
            bullet = bullets.getFirstExists(false);

            if (bullet)
            {
                // Fire bullets
                bullet.reset(player.x, player.y + 25);
                bullet.rotation = game.physics.arcade.angleToPointer(bullet);
                game.physics.arcade.moveToXY(bullet, crosshair.x, crosshair.y, 400);
                bulletTime = game.time.now + 400;
            }
        }

    }
    
    function spawnAsteroid()
    {

        //  Use timer delay to limit spawning rate
        if (game.time.now > asteroidTime)
        {
            //  Grab the first asteroid from group of asteroids
            asteroid = asteroids.getFirstExists(false);
            
            if (asteroid)
            {
                // Spawn asteroid
                asteroid.reset(1200 + 384, Math.floor((Math.random() * 5) + 1) * 100);
                asteroid.body.velocity.x = -100;
                asteroidTime = game.time.now + 1500;
            }
        }

    }
    
    // Collision manager for bullet-asteroid collision
    function bulletHitAsteroid(bullet, asteroid)
    {
        bullet.kill();
        asteroid.kill();
        counter += 1;
        score += 100;
    }
    
    // Collision manager for earth-asteroid or player-asteroid collision, resulting in game over
    function endGameLoss()
    {
        player.destroy();
        asteroids.destroy();
        bullets.destroy();
        earth.destroy();
        endGameText = game.add.text(600, 300, 'Game Over!\nRefresh to Play Again', style);
        endGameText.anchor.setTo(0.5);
    }
    
    // If player destroys all asteroids
    function endGameWin()
    {
        asteroids.destroy();
        endGameText = game.add.text(600, 300, 'You Win!\nRefresh to\nPlay Again', style);
        endGameText.anchor.setTo(0.5);
    }
    
};
