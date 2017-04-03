
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
    this.bouncy = null;
    this.player = null;
    this.background = null;
    this.speed = 2000
};

BasicGame.Game.prototype = {

    create: function () {
        this.game.stage.backgroundColor = "#FFFFFF";
        this.game.add.tileSprite(0, 0, 768, 5120, 'background');
        this.game.world.setBounds(0, 0, 768, 5120);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.array = [this.change2rock, this.change2paper, this.change2scissors];
        this.player = this.game.add.sprite(400, 300, 'rock');
        this.player.anchor.setTo(0.5, 0.5);

        this.spaceKey = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.game.camera.follow(this.player);
        
        this.upKey = this.game.input.keyboard.addKey(Phaser.KeyCode.UP);
        this.downKey = this.game.input.keyboard.addKey(Phaser.KeyCode.DOWN);
        this.leftKey = this.game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);
        
        this.input.keyboard.addKeyCapture(this.upKey);
        this.input.keyboard.addKeyCapture(this.downKey);
        this.input.keyboard.addKeyCapture(this.leftKey);
        this.input.keyboard.addKeyCapture(this.rightKey);
        
        this.upKey.onDown.add(function() {if (this.player.body.velocity.y == 0) {this.player.body.velocity.y -= this.speed;}}, this);
        this.upKey.onUp.add(function() {if (this.player.body.velocity.y != 0) {this.player.body.velocity.y += this.speed;}}, this);
        
        this.downKey.onDown.add(function() {if (this.player.body.velocity.y == 0) {this.player.body.velocity.y += this.speed;}}, this);
        this.downKey.onUp.add(function() {if (this.player.body.velocity.y != 0) {this.player.body.velocity.y -= this.speed;}}, this);
        
        this.leftKey.onDown.add(function() {if (this.player.body.velocity.x == 0) {this.player.body.velocity.x -= this.speed;}}, this);
        this.leftKey.onUp.add(function() {if (this.player.body.velocity.x != 0) {this.player.body.velocity.x += this.speed;}}, this);
        
        this.rightKey.onDown.add(function() {if (this.player.body.velocity.x == 0) {this.player.body.velocity.x += this.speed;}}, this);
        this.rightKey.onUp.add(function() {if (this.player.body.velocity.x != 0) {this.player.body.velocity.x -= this.speed;}}, this);
    },

    update: function () {
        
    },
    
//    render: function() {
//        this.game.debug.body(this.player);
//    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    },
    
    change2rock: function() {
        this.width = this.game.cache.getImage('rock').width;
        this.height = this.game.cache.getImage('rock').height;
        this.player.loadTexture('rock');
        this.player.body.setSize(this.width, this.height, 0, 0);
    },
    
    change2paper: function() {
        this.width = this.game.cache.getImage('paper').width;
        this.height = this.game.cache.getImage('paper').height;
        this.player.loadTexture('paper');
        this.player.body.setSize(this.width, this.height, 0, 0);
    },
    
    change2scissors: function() {
        this.width = this.game.cache.getImage('scissors').width;
        this.height = this.game.cache.getImage('scissors').height;
        this.player.loadTexture('scissors');
        this.player.body.setSize(this.width, this.height, 0, 0);
    }
};
