
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
};

BasicGame.Game.prototype = {

    create: function () {
        this.player = this.add.sprite(300, 200, 'player');
        this.player.animations.add('walk-down', Phaser.Animation.generateFrameNames('walkDown', 1, 4,'.png'), null, true);
        this.player.animations.add('walk-right', Phaser.Animation.generateFrameNames('walkRight', 1, 4,'.png'), null, true);
        this.player.animations.add('walk-left', Phaser.Animation.generateFrameNames('walkLeft', 1, 4,'.png'), null, true);
        this.player.animations.add('walk-up', Phaser.Animation.generateFrameNames('walkUp', 1, 4,'.png'), null, true);
        this.stage.backgroundColor = '#ffffff'
    },

    update: function () {
        this.input.keyboard.addKeyCapture(Phaser.Keyboard.UP);
        this.input.keyboard.addKeyCapture(Phaser.Keyboard.DOWN);
        this.input.keyboard.addKeyCapture(Phaser.Keyboard.LEFT);
        this.input.keyboard.addKeyCapture(Phaser.Keyboard.RIGHT);
        this.input.keyboard.addKeyCapture(Phaser.Keyboard.ENTER);
        
        if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER))
        {
            this.quitGame();
        }
        
        if (this.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            this.player.animations.play('walk-up', 10, true);
            this.player.y -= 5;
        }
        
        else
        {
            this.player.animations.stop('walk-up');
        }
        
        if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            this.player.animations.play('walk-down', 10, true);
            this.player.y += 5;
        }
        
        else
        {
            this.player.animations.stop('walk-down');
        }
        
        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            this.player.animations.play('walk-left', 10, true);
            this.player.x -= 5;
        }
        
        else
        {
            this.player.animations.stop('walk-left');
        }
        
        if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            this.player.animations.play('walk-right', 10, true);
            this.player.x += 5;
        }
        
        else
        {
            this.player.animations.stop('walk-right');
        }
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
