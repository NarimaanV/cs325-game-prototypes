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
    
    var game = new Phaser.Game( 1000, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update} );
    
    function preload()
    {
        game.load.atlasJSONHash('player', 'assets/playerAnim.png', 'assets/playerAnim.json');
        game.load.image('background', 'assets/background.png');
        game.load.image('button', 'assets/button.png');
        game.load.image('dog','assets/dog.png');
        game.load.image('hole', 'assets/hole.png');
    }
    
    var player, background, button, buttonText, dog, dogs, hole, holes;
    var runAnim, jumpAnim;
    var runSpeed = 15, scrollSpeed = -300, jumpSpeed = 250; //300
    var jumpDelay = 0, enemyDelay = 0;
    var enemyChoice;
    var gameStart = false, gameEnd = false;
    var intro, outro, style;
    var enterKey;
    var timer;
    
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
        buttonText = game.add.text(500, 550, "JUMP!", {align: "center", fill: "white", fontSize: 50});
        buttonText.anchor.setTo(0.5, 0.5);
        
        style = {fill: "white", align: "center", backgroundColor: "black"};
        
        intro = game.add.text(500, 300, "It's the middle of the night. You're a young doctor called in to perform an\nemergency heart transplant.You go to start your car and find it's dead.\nThe only option is to run to the hospital which is a few minutes away\nif you sprint. At this time of the night there's all sorts of weird stuff out\non the streets. Avoid all obstacles in your way to make it in time and\nsave a life! The only control is the on-screen button to jump.\nGood luck, Doctor! Press Enter to begin.", style);
        
        intro.anchor.setTo(0.5, 0.5);
        
        enterKey = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        game.input.keyboard.addKeyCapture(enterKey);
        
        enterKey.onDown.add(function() {intro.destroy(); timer = game.time.now + 90000; gameStart = true;});
    }
    
    function update()
    {
        if (gameStart)
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
        }
        
        if (game.time.now >= timer)
        {
            endGameWin();
        }
            
        game.physics.arcade.overlap(player, dogs, endGameLoss, null, this);
        game.physics.arcade.overlap(player, holes, endGameLoss, null, this);
    }
    
    function jump()
    {
        if (game.time.now > jumpDelay)
        {
            button.tint = 0x808080;
            buttonText.kill();
            jumpDelay = game.time.now + 2000; // 2500
            player.body.velocity.y -= jumpSpeed;
            player.animations.play('jump', 5/2); // 2.1
            jumpAnim.onComplete.add(function() {player.animations.stop('jump'); player.animations.play('run', runSpeed); button.tint = 0xFFFFFF; buttonText.revive(500, 550)});
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
        gameEnd = true;
        outro = game.add.text(500, 300, "Oh no! You didn't make it to the hospital in time.\nThe patient didn't make it. Refresh if you want to try again.", style);
        outro.anchor.setTo(0.5, 0.5);
    }
    
    function endGameWin()
    {
        holes.destroy();
        dogs.destroy();
        background.stopScroll();
        player.animations.stop('run');
        gameEnd = true;
        outro = game.add.text(500, 300, "Congratulations! You made it to the hospital just in time,\nperformed the transplant, and saved the patient's life!\nRefresh if you want to play again.", style);
        outro.anchor.setTo(0.5, 0.5);
    }
};
