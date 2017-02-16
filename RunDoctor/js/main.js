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
    
    var game = new Phaser.Game( 1000, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render} );
    
    function preload()
    {
        game.load.atlasJSONHash('player', 'assets/playerAnim.png', 'assets/playerAnim.json');
        game.load.image('background', 'assets/background.png');
        game.load.image('button', 'assets/button.png');
        game.load.image('dog','assets/dog.png');
        game.load.image('hole', 'assets/hole.png');
    }
    
    var player, background, button, dog, dogs, hole, holes;
    var runAnim, jumpAnim;
    var runSpeed = 15, scrollSpeed = -300, jumpSpeed = 250; //300
    var jumpDelay = 0, enemyDelay = 0;
    var enemyChoice;
    
    function create()
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 250;
        
        background = game.add.tileSprite(0,0,1000,600,'background');
        game.world.setBounds(0, 0, 1000, 442);
        background.autoScroll(scrollSpeed, 0);
        
        
        player = game.add.sprite(300, 442, 'player');
        player.anchor.setTo(0.5, 1);
        runAnim = player.animations.add('run', Phaser.Animation.generateFrameNames('run', 1, 8,'.png'), null, true);
        jumpAnim = player.animations.add('jump', ['jump1.png','jump2.png','jump3.png','jump4.png','jump1.png',], null);
        player.animations.play('run', runSpeed);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;

        dogs = game.add.group();
        dogs.enableBody = true;
        dogs.physicsBodyType = Phaser.Physics.ARCADE;
        dogs.createMultiple(5, 'dog');
        dogs.setAll('anchor.x', 0.5);
        dogs.setAll('anchor.y', 1);
        dogs.setAll('outOfBoundsKill', true);
        dogs.setAll('checkWorldBounds', true);
        
        holes = game.add.group();
        holes.enableBody = true;
        holes.physicsBodyType = Phaser.Physics.ARCADE;
        holes.createMultiple(5, 'hole');
        holes.setAll('anchor.x', 0.5);
        holes.setAll('anchor.y', 0);
        holes.setAll('outOfBoundsKill', true);
        holes.setAll('checkWorldBounds', true);
        holes.setAll('alpha', 0.75);
        
        button = game.add.button(500, 550, 'button', jump);
        button.anchor.setTo(0.5, 0.5);
    }
    
    function update()
    {
        enemyChoice = Math.floor(Math.random() * 2);
        
        if (enemyChoice === 0)
        {
            spawnDog();
        }
        
        else
        {
            spawnHole();
        }
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER))
        {
            game.state.start(game.state.current);
        }
        
        game.physics.arcade.overlap(player, dogs, endGameWin, null, this);
        game.physics.arcade.overlap(player, holes, endGameWin, null, this);
    }
    
    function render()
    {
        //game.debug.body(player);
//        dogs.forEachAlive(renderGroup, this);
//        holes.forEachAlive(renderGroup, this);
    }
    
    function renderGroup(member)
    {
        game.debug.body(member);
    }
    
    function jump()
    {
        if (game.time.now > jumpDelay)
        {
            button.tint = 0x808080;
            jumpDelay = game.time.now + 2000; // 2500
            player.body.velocity.y -= jumpSpeed;
            player.animations.play('jump', 5/2); // 2.1
            jumpAnim.onComplete.add(function() {player.animations.stop('jump'); player.animations.play('run', runSpeed); button.tint = 0xFFFFFF;});
        }
    }
    
    function spawnDog()
    {
        if (game.time.now > enemyDelay)
        {
            
            dog = dogs.getFirstExists(false);
            
            if (dog)
            {
                dog.reset(1000, 450);
                dog.body.acceleration.y = -250;
                dog.body.velocity.x = -600;
                enemyDelay = game.time.now + Math.floor((Math.random()*3)+3)*1000;
            }
        }
    }
    
    function spawnHole()
    {
        if (game.time.now > enemyDelay)
        {
            
            hole = holes.getFirstExists(false);
            
            if (hole)
            {
                hole.reset(1000, 442);
                hole.body.setSize(146, 1, -2, -1);
                hole.body.acceleration.y = -250;
                hole.body.velocity.x = -300;
                enemyDelay = game.time.now + Math.floor((Math.random()*3)+3)*1000;
            }
        }
    }
    
    function endGameLoss()
    {
        player.destroy();
        holes.destroy();
        dogs.destroy();
        background.stopScroll();
    }
    
    function endGameWin()
    {
        holes.destroy();
        dogs.destroy();
        background.stopScroll();
        player.body.velocity.x = 500;
    }
};
