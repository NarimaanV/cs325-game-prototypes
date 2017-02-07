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
    
    var game = new Phaser.Game( 1200, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'asteroid', 'assets/cowboy.png' );
        game.load.image( 'bullet', 'assets/bullet-s.png' );
        game.load.image( 'cowboy', 'assets/cowboy-s.png' );
        game.load.image( 'background', 'assets/space.jpg' );
        game.load.image( 'earth', 'assets/earth.png' );
        game.load.image( 'logo', 'assets/phaser.png' );
    }
    
    var bouncy;
    var speed = 6;
    
    var Bullet = function (game, key)
    {

        Phaser.Sprite.call(this, game, 0, 0, key);

        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        this.anchor.set(0.5);

        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.exists = false;

        this.tracking = false;
        this.scaleSpeed = 0;

    };
    
//    Weapon.SingleBullet = function (game)
//    {
//
//        Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);
//
//        this.nextFire = 0;
//        this.bulletSpeed = 600;
//        this.fireRate = 100;
//
//        for (var i = 0; i < 64; i++)
//        {
//            this.add(new Bullet(game, 'bullet'), true);
//        }
//
//        return this;
//
//    };
//    
//    Weapon.SingleBullet.prototype.fire = function (source)
//    {
//        if (this.game.time.time < this.nextFire) { return; }
//
//        var x = source.x + 10;
//        var y = source.y + 10;
//
//        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
//
//        this.nextFire = this.game.time.time + this.fireRate;
//
//    };
    
    function create() {
        this.background = game.add.image( 0, 0, 'background');
        
        this.earth = game.add.image(-350, game.world.centerY, 'earth');
        this.earth.anchor.setTo(0.5, 0.5);
        this.earth.scale.setTo(0.5, 0.5);
        this.earth.angle = 25;
        
        this.cowboy = game.add.sprite(game.world.centerX*0.5, game.world.centerY, 'cowboy');
        this.cowboy.anchor.setTo(0.5, 0.5);
        this.cowboy.scale.setTo(0.4);
        game.physics.enable( this.cowboy, Phaser.Physics.ARCADE );
        this.cowboy.body.collideWorldBounds = true;
                
        //this.weapons = [];
        //this.weapons.push(new Weapon.SingleBullet(this.game));
        
        
        // Create a sprite at the center of the screen using the 'logo' image.
        //bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        //bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        //bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        //var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        //var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
        //text.anchor.setTo( 0.5, 0.0 );
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
            this.cowboy.y -= speed;
        }
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            this.cowboy.y += speed;
        }
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            this.bullet = game.add.sprite(this.cowboy.x + 100, this.cowboy.y, 'bullet');
            this.bullet.anchor.setTo(1, 0.5);
            this.bullet.scale.setTo(-0.15, 0.15);
            
            //game.physics.p2.enable(this.bullet);
            //this.bullet.body.moveRight(500);
           
            //game.physics.enable(this.bullet, Phaser.Physics.ARCADE);
//            game.physics.arcade.accelerateToXY(this.bullet, this.cowboy.x + 100 + 500, this.cowboy.y, 1000, 1000, 0);
            //this.bullet.body.velocity()
            //this.bullet.kill();
            
            //this.weapons[0].fire(this.cowboy);
        }
    }
};
