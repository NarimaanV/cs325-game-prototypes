
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
    this.player = null;
    this.upKey = null;
    this.downKey = null;
    this.leftKey = null;
    this.rightKey = null;
    this.speed = 400;
};

BasicGame.Game.prototype = {

    create: function () {
        this.player = this.add.sprite(300, 200, 'player');
        this.player.animations.add('walk-down', Phaser.Animation.generateFrameNames('walkDown', 1, 4,'.png'), null, true);
        this.player.animations.add('walk-right', Phaser.Animation.generateFrameNames('walkRight', 1, 4,'.png'), null, true);
        this.player.animations.add('walk-left', Phaser.Animation.generateFrameNames('walkLeft', 1, 4,'.png'), null, true);
        this.player.animations.add('walk-up', Phaser.Animation.generateFrameNames('walkUp', 1, 4,'.png'), null, true);
        this.stage.backgroundColor = '#ffffff'
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.enable([this.player]);
        this.player.body.collideWorldBounds = true;
        this.player.body.setSize(60,80,-5,-5);
        
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
        
        this.enterKey.onDown.add(this.quitGame, this);
        
        this.upKey.onDown.add(function() {this.player.animations.play('walk-up', 10, true); if (this.player.body.velocity.y == 0) {this.player.body.velocity.y -= this.speed;}}, this);
        this.upKey.onUp.add(function() {this.player.animations.stop('walk-up'); if (this.player.body.velocity.y != 0) {this.player.body.velocity.y += this.speed;}}, this);
        
        this.downKey.onDown.add(function() {this.player.animations.play('walk-down', 10, true); if (this.player.body.velocity.y == 0) {this.player.body.velocity.y += this.speed;}}, this);
        this.downKey.onUp.add(function() {this.player.animations.stop('walk-down'); if (this.player.body.velocity.y != 0) {this.player.body.velocity.y -= this.speed;}}, this);
        
        this.leftKey.onDown.add(function() {this.player.animations.play('walk-left', 10, true); if (this.player.body.velocity.x == 0) {this.player.body.velocity.x -= this.speed;}}, this);
        this.leftKey.onUp.add(function() {this.player.animations.stop('walk-left'); if (this.player.body.velocity.x != 0) {this.player.body.velocity.x += this.speed;}}, this);
        
        this.rightKey.onDown.add(function() {this.player.animations.play('walk-right', 10, true); if (this.player.body.velocity.x == 0) {this.player.body.velocity.x += this.speed;}}, this);
        this.rightKey.onUp.add(function() {this.player.animations.stop('walk-right'); if (this.player.body.velocity.x != 0) {this.player.body.velocity.x -= this.speed;}}, this);
    },

    update: function () {
        
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.player.destroy();
        this.state.start('MainMenu');
    }

};
