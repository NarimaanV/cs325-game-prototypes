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
    
    var game = new Phaser.Game( 1000, 500, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload()
    {
        this.load.atlasJSONHash('player', 'assets/playerAnim.png', 'assets/playerAnim.json');
        this.load.image('background', 'assets/background.jpg')
    }
    
    var player, background;
    
    function create()
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 250;
        
        background = game.add.tileSprite(0,0,1000,500,'background');
        game.world.setBounds(0,0,1000,390);
        player = game.add.sprite(100, 390, 'player');
        player.anchor.setTo(0, 1);
        player.animations.add('run', Phaser.Animation.generateFrameNames('run', 1, 8,'.png'), null, true);
        player.animations.add('jump', Phaser.Animation.generateFrameNames('jump', 1, 4,'.png'), null, true);
        player.animations.play('run', 10);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        
        //player.animations.play('jump', 5);
        background.autoScroll(-100, 0);
    }
    
    function update()
    {
        
    }
};
