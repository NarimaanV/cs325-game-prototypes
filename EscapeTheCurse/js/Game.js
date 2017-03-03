
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    
    // Create your own variables.
    this.monster1 = null;
    this.monster2 = null;
    this.monster3 = null;
    this.warrior = null;
    this.player = null;
    this.upKey = null;
    this.downKey = null;
    this.leftKey = null;
    this.rightKey = null;
    this.speed = 200;
    this.invisibleTime = 10;
};

BasicGame.Game.prototype = {

    create: function () {
        //this.stage.backgroundColor = '#ffffff'
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('Dungeon', 'tiles');
        this.map.enableBody = true;
        
        this.groundLayer = this.map.createLayer('Ground');
        this.wallsLayer = this.map.createLayer('Walls');
        this.invisibleReset = this.map.createLayer('Invisible Reset');
        this.endGoal = this.map.createLayer('End Goal');
        this.map.setCollisionBetween(1140, 1141, true, 'Walls');
        this.map.setCollisionBetween(984, 985, true, 'End Goal');
        this.groundLayer.resizeWorld();
        this.game.physics.arcade.enable(this.map);
        
        this.warrior = this.add.sprite(96+48, 1045+48, 'warrior');
        this.warrior.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(this.warrior);
        this.warrior.animations.add('walk-down', [19, 20, 21, 22, 23, 24, 25, 26], null, true);
        this.warrior.animations.add('walk-right', [28, 29, 30, 31, 32, 33, 34, 35], null, true);
        this.warrior.animations.add('walk-left', [10, 11, 12, 13, 14, 15, 16, 17], null, true);
        this.warrior.animations.add('walk-up', [1, 2, 3, 4, 5, 6, 7, 8], null, true);        
        this.warrior.body.collideWorldBounds = true;
        this.warrior.body.setSize(48,73,24,23);
        this.game.camera.follow(this.warrior);
        
        this.monster1 = this.add.sprite(14*96, 3*96, 'monster1');
        this.game.physics.arcade.enable(this.monster1);
        
        this.monster2 = this.add.sprite(1*96, 1*96, 'monster2');
        this.game.physics.arcade.enable(this.monster2);
        
        this.monster3 = this.add.sprite(7*96, 3*96, 'monster3');
        this.game.physics.arcade.enable(this.monster3);
        
        this.upKey = this.game.input.keyboard.addKey(Phaser.KeyCode.UP);
        this.downKey = this.game.input.keyboard.addKey(Phaser.KeyCode.DOWN);
        this.leftKey = this.game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);
        this.enterKey = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        
        this.input.keyboard.addKeyCapture(this.upKey);
        this.input.keyboard.addKeyCapture(this.downKey);
        this.input.keyboard.addKeyCapture(this.leftKey);
        this.input.keyboard.addKeyCapture(this.rightKey);
        this.input.keyboard.addKeyCapture(this.enterKey);
                
        this.upKey.onDown.add(function() {this.warrior.animations.play('walk-up', 10, true); if (this.warrior.body.velocity.y == 0) {this.warrior.body.velocity.y -= this.speed;}}, this);
        this.upKey.onUp.add(function() {this.warrior.animations.stop('walk-up'); if (this.warrior.body.velocity.y != 0) {this.warrior.body.velocity.y += this.speed;}}, this);
        
        this.downKey.onDown.add(function() {this.warrior.animations.play('walk-down', 10, true); if (this.warrior.body.velocity.y == 0) {this.warrior.body.velocity.y += this.speed;}}, this);
        this.downKey.onUp.add(function() {this.warrior.animations.stop('walk-down'); if (this.warrior.body.velocity.y != 0) {this.warrior.body.velocity.y -= this.speed;}}, this);
        
        this.leftKey.onDown.add(function() {this.warrior.animations.play('walk-left', 10, true); if (this.warrior.body.velocity.x == 0) {this.warrior.body.velocity.x -= this.speed;}}, this);
        this.leftKey.onUp.add(function() {this.warrior.animations.stop('walk-left'); if (this.warrior.body.velocity.x != 0) {this.warrior.body.velocity.x += this.speed;}}, this);
        
        this.rightKey.onDown.add(function() {this.warrior.animations.play('walk-right', 10, true); if (this.warrior.body.velocity.x == 0) {this.warrior.body.velocity.x += this.speed;}}, this);
        this.rightKey.onUp.add(function() {this.warrior.animations.stop('walk-right'); if (this.warrior.body.velocity.x != 0) {this.warrior.body.velocity.x -= this.speed;}}, this);
    },

    update: function () {
        
        if (this.warrior.alpha > 1/(60*this.invisibleTime))
        {
            this.warrior.alpha -= 1/(60*this.invisibleTime);
        }
        
        else
        {
            this.quitGame();
        }
        
        
        if (this.monster1.x === 14*96 && this.monster1.y <= 3*96)
        {
            this.game.physics.arcade.moveToXY(this.monster1, 14*96, 10*96, 200);
        }
        
        if (this.monster1.x === 14*96 && this.monster1.y >= 10*96)
        {
            this.game.physics.arcade.moveToXY(this.monster1, 14*96, 3*96, 200);
        }
        
        
        if (this.monster2.x <= 1*96 && this.monster2.y <= 1*96)
        {
            this.game.physics.arcade.moveToXY(this.monster2, 3*96, 1*96, 200);
        }
        
        if (this.monster2.x >= 3*96 && this.monster2.y <= 1*96)
        {
            this.game.physics.arcade.moveToXY(this.monster2, 3*96, 4*96, 200);
        }
        
        if (this.monster2.x >= 3*96 && this.monster2.y >= 4*96)
        {
            this.game.physics.arcade.moveToXY(this.monster2, 1*96, 4*96, 200);
        }
        
        if (this.monster2.x <= 1*96 && this.monster2.y >= 4*96)
        {
            this.game.physics.arcade.moveToXY(this.monster2, 1*96, 1*96, 200);
        }
        
        
        if (this.monster3.x === 7*96 && this.monster3.y <= 3*96)
        {
            this.game.physics.arcade.moveToXY(this.monster3, 7*96, 6*96, 250);
        }
        
        if (this.monster3.x === 7*96 && this.monster3.y >= 6*96)
        {
            this.game.physics.arcade.moveToXY(this.monster3, 7*96, 3*96, 250);
        }
        
        if (this.warrior.x >= 96 && this.warrior.y >= 10*96 && this.warrior.x <= 2*96 && this.warrior.y <= 11*96)
        {
            this.warrior.alpha = 1;
        }
        if (this.warrior.x >= 12*96 && this.warrior.y >= 9*96 && this.warrior.x <= 13*96 && this.warrior.y <= 10*96)
        {
            this.warrior.alpha = 1;
        }
        if (this.warrior.x >= 13*96 && this.warrior.y >= 7*96 && this.warrior.x <= 14*96 && this.warrior.y <= 8*96)
        {
            this.warrior.alpha = 1;
        }
        if (this.warrior.x >= 11*96 && this.warrior.y >= 3*96 && this.warrior.x <= 12*96 && this.warrior.y <= 4*96)
        {
            this.warrior.alpha = 1;
        }
        if (this.warrior.x >= 4*96 && this.warrior.y >= 7*96 && this.warrior.x <= 5*96 && this.warrior.y <= 8*96)
        {
            this.warrior.alpha = 1;
        }
        if (this.warrior.x >= 6*96 && this.warrior.y >= 1*96 && this.warrior.x <= 7*96 && this.warrior.y <= 2*96)
        {
            this.warrior.alpha = 1;
        }
        if (this.warrior.x >= 8*96 && this.warrior.y >= 1*96 && this.warrior.x <= 9*96 && this.warrior.y <= 2*96)
        {
            this.warrior.alpha = 1;
        }
        
        if (this.warrior.x >= 14*96 && this.warrior.y >= 0*96 && this.warrior.x <= 15*96 && this.warrior.y <= 1*96)
        {
            this.quitGame();
        }
        
        this.game.physics.arcade.collide(this.warrior, this.wallsLayer);
        this.game.physics.arcade.overlap(this.warrior, this.monster1, this.quitGame, null, this);
        this.game.physics.arcade.overlap(this.warrior, this.monster2, this.quitGame, null, this);
        this.game.physics.arcade.overlap(this.warrior, this.monster3, this.quitGame, null, this);
    },
    
    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.warrior.destroy();
        this.map.destroy();
        this.monster1.destroy();
        this.monster2.destroy();
        this.monster3.destroy();
        this.state.start('MainMenu');
    }

};
