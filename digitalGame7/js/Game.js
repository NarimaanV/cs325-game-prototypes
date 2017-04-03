
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
};

BasicGame.Game.prototype = {

    create: function () {
        this.game.stage.backgroundColor = "#FFFFFF";
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.array = [this.change2rock, this.change2paper, this.change2scissors];
        this.player = this.game.add.sprite(400, 300, 'rock');
        this.player.anchor.setTo(0.5, 0.5);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);
        this.rightKey.onDown.add(this.change2rock, this);
        this.leftKey = this.game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
        this.leftKey.onDown.add(this.change2paper, this);
        this.upKey = this.game.input.keyboard.addKey(Phaser.KeyCode.UP);
        this.upKey.onDown.add(this.change2scissors, this);
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        this.spaceKey.onDown.add(this.array[0], this)
        this.game.physics.arcade.enable(this.player);
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
