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
    
    var game = new Phaser.Game( 1000, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload()
    {
        game.load.atlasJSONHash('player', 'assets/playerAnim.png', 'assets/playerAnim.json');
        game.load.image('background', 'assets/background.png');
        game.load.image('button', 'assets/button.png');
    }
    
    var player, background, button;
    var upKey;
    var runAnim, jumpAnim;
    var runSpeed = 15, scrollSpeed = -300, jumpSpeed = 300;
    var jumpTimer = 0;
    
    function create()
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 250;
        
        background = game.add.tileSprite(0,0,1000,600,'background');
        game.world.setBounds(0,0,1000,442);
        background.autoScroll(scrollSpeed, 0);
        
        
        player = game.add.sprite(300, 442, 'player');
        player.anchor.setTo(0.5, 1);
        runAnim = player.animations.add('run', Phaser.Animation.generateFrameNames('run', 1, 8,'.png'), null, true);
        jumpAnim = player.animations.add('jump', ['jump1.png','jump2.png','jump3.png','jump4.png','jump1.png',], null);
        player.animations.play('run', runSpeed);
        
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        
        button = game.add.button(500, 520, 'button', function(){button.tint = 0x808080; jump();});
        button.anchor.setTo(0.5, 0.5);
        
        upKey = game.input.keyboard.addKey(Phaser.KeyCode.UP);
        game.input.keyboard.addKeyCapture(upKey);
        upKey.onDown.add(jump);
    }
    
    function update()
    {
        
    }
    
    function jump()
    {
        if (game.time.now > jumpTimer)
        {
            jumpTimer = game.time.now + 2500;
            player.body.velocity.y -= jumpSpeed;
            player.animations.play('jump', 2.1);
            jumpAnim.onComplete.add(function() {player.animations.stop('jump'); player.animations.play('run', runSpeed); button.tint = 0xFFFFFF;});
        }
    }
};
