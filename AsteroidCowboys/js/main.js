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
    
    var game = new Phaser.Game( 1200, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render} );
    
    function preload() {
        game.load.image( 'asteroid', 'assets/asteroid.png' );
        game.load.image( 'bullet', 'assets/bullet-s.png' );
        game.load.image( 'player', 'assets/cowboy-s.png' );
        game.load.image( 'background', 'assets/space.jpg' );
        game.load.image( 'earth', 'assets/earth.png' );
        game.load.image( 'logo', 'assets/phaser.png' );
    }
    
    var speed = 6;
    var bullet, bullets;
    var asteroid, asteroids;
    var bulletTime = 0;
    var asteroidTime = 0;
    
    function create() {
        this.background = game.add.image( 0, 0, 'background');
        
        this.earth = game.add.image(-350, game.world.centerY, 'earth');
        this.earth.anchor.setTo(0.5, 0.5);
        this.earth.scale.setTo(0.5, 0.5);
        this.earth.angle = 25;
        
        this.player = game.add.sprite(game.world.centerX*0.5, game.world.centerY, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        this.player.scale.setTo(0.4);
        game.physics.enable( this.player, Phaser.Physics.ARCADE );
        this.player.body.collideWorldBounds = true;
        this.player.body.setSize(100, 100, 100, 100);
        
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
        
        // The enemy's bullets
        asteroids = game.add.group();
        asteroids.enableBody = true;
        asteroids.physicsBodyType = Phaser.Physics.ARCADE;
        asteroids.createMultiple(30, 'asteroid');
        asteroids.setAll('anchor.x', 1);
        asteroids.setAll('anchor.y', 0.5);
        asteroids.setAll('scale.x', 0.2);
        asteroids.setAll('scale.y', 0.2);
        asteroids.setAll('outOfBoundsKill', true);
        asteroids.setAll('checkWorldBounds', true);
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );
        
        game.input.keyboard.addKeyCapture(Phaser.Keyboard.UP);
        game.input.keyboard.addKeyCapture(Phaser.Keyboard.DOWN);
        game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            this.player.y -= speed;
        }
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            this.player.y += speed;
        }
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            fireBullet(this);
        }
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.M))
        {
            fireAsteroid(this);
        }
        
        game.physics.arcade.overlap(bullets, asteroids, bulletHitAsteroid, null, this);
    }
    
    function render()
    {
        game.debug.body(this.player);
        game.debug.body(bullets);
        game.debug.body(asteroids);
        game.debug.body(this.earth);
    }
    
    
    function fireBullet (scope)
    {

        //  To avoid them being allowed to fire too fast we set a time limit
        if (game.time.now > bulletTime)
        {
            //  Grab the first bullet we can from the pool
            bullet = bullets.getFirstExists(false);

            if (bullet)
            {
                //  And fire it
                bullet.reset(scope.player.x + 80, scope.player.y);
                bullet.body.velocity.x = 400;
                bulletTime = game.time.now + 400;
            }
        }

    }
    
    function fireAsteroid (scope)
    {

        //  To avoid them being allowed to fire too fast we set a time limit
        if (game.time.now > asteroidTime)
        {
            //  Grab the first bullet we can from the pool
            asteroid = asteroids.getFirstExists(false);

            if (asteroid)
            {
                //  And fire it
                asteroid.reset(1200, scope.player.y);
                asteroid.body.velocity.x = -300;
                asteroidTime = game.time.now + 400;
            }
        }

    }
    
    function bulletHitAsteroid(bullet, asteroid)
    {
        bullet.kill();
        asteroid.kill();
    }
    
};
