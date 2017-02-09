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
        // Load
        game.load.image( 'asteroid', 'assets/asteroid-xs.png' );
        game.load.image( 'bullet', 'assets/bullet-s.png' );
        game.load.image( 'player', 'assets/cowboy-s.png' );
        game.load.image( 'background', 'assets/space.jpg' );
        game.load.image( 'earth', 'assets/earth.png' );
    }
    
    var speed = 6;
    var bullet, bullets;
    var asteroid, asteroids;
    var bulletTime = 0;
    var asteroidTime = 0;
    var background, earth, player;
    var gameOverText, gameStartText;
    var gameStarted = false;
    var counter = 0;
    var style = {fill:'white', align:'center', fontSize:80};
    var limit = 3;
    
    function create() {
        background = game.add.image( 0, 0, 'background');
        
        earth = game.add.sprite(-350, game.world.centerY, 'earth');
        game.physics.enable( earth, Phaser.Physics.ARCADE );
        earth.anchor.setTo(0.5, 0.5);
        earth.scale.setTo(0.5, 0.5);
        earth.angle = 25;
        //earth.body.setSize(600,600,0,0);
        
        player = game.add.sprite(game.world.centerX*0.5, game.world.centerY, 'player');
        player.anchor.setTo(0.5, 0.5);
        player.scale.setTo(0.4);
        game.physics.enable( player, Phaser.Physics.ARCADE );
        player.body.collideWorldBounds = true;
        
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet');
        bullets.setAll('anchor.x', 1);
        bullets.setAll('anchor.y', 0.5);
        bullets.setAll('scale.x', -0.1);
        bullets.setAll('scale.y', 0.1);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
        
        // The incoming asteroids
        asteroids = game.add.group();
        asteroids.enableBody = true;
        asteroids.physicsBodyType = Phaser.Physics.ARCADE;
        asteroids.createMultiple(30, 'asteroid');
        asteroids.setAll('anchor.x', 1);
        asteroids.setAll('anchor.y', 0.5);
        asteroids.setAll('outOfBoundsKill', true);
        asteroids.setAll('checkWorldBounds', true);
        
        gameStartText = game.add.text(600, 300, 'Hit Enter\nto Begin!', style);
        gameStartText.anchor.setTo(0.5);
    }
    
    function update() {
        game.input.keyboard.addKeyCapture(Phaser.Keyboard.UP);
        game.input.keyboard.addKeyCapture(Phaser.Keyboard.DOWN);
        game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
        game.input.keyboard.addKeyCapture(Phaser.Keyboard.ENTER);
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            player.y -= speed;
        }
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            player.y += speed;
        }
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            fireBullet();
        }
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER))
        {
            gameStartText.destroy();
            gameStarted = true;
        }
        
        if (gameStarted)
        {
            fireAsteroid();
        }
        
        game.physics.arcade.overlap(bullets, asteroids, bulletHitAsteroid, null, this);
        game.physics.arcade.overlap(earth, asteroids, endGameLoss, null, this);
        game.physics.arcade.overlap(player, asteroids, endGameLoss, null, this);
        
        if (counter === limit)
        {
            endGameWin();    
        }
    }
    
    function fireBullet()
    {

        //  To avoid them being allowed to fire too fast we set a time limit
        if (game.time.now > bulletTime)
        {
            //  Grab the first bullet we can from the pool
            bullet = bullets.getFirstExists(false);

            if (bullet)
            {
                //  And fire it
                bullet.reset(player.x + 80, player.y);
                bullet.body.velocity.x = 400;
                bulletTime = game.time.now + 400;
            }
        }

    }
    
    function fireAsteroid()
    {

        //  To avoid them being allowed to fire too fast we set a time limit
        if (game.time.now > asteroidTime)
        {
            //  Grab the first bullet we can from the pool
            asteroid = asteroids.getFirstExists(false);
            //asteroid.body.setSize(390, 105, 0, 220);
            
            if (asteroid)
            {
                //  And fire it
                asteroid.reset(1200, Math.floor((Math.random() * 5) + 1) * 100);
                asteroid.body.velocity.x = -300;
                asteroidTime = game.time.now + 1000;
            }
        }

    }
    
    function bulletHitAsteroid(bullet, asteroid)
    {
        bullet.kill();
        asteroid.kill();
        counter += 1;
    }
    
    function endGameLoss()
    {
        player.destroy();
        asteroids.destroy();
        bullets.destroy();
        earth.destroy();
        gameOverText = game.add.text(600, 300, 'Game Over!\nRefresh to Play Again', style);
        gameOverText.anchor.setTo(0.5);
    }
    
    function endGameWin()
    {
        asteroids.destroy();
        gameOverText = game.add.text(600, 300, 'You Win!\nRefresh to\nPlay Again', style);
        gameOverText.anchor.setTo(0.5);
    }
    
};
