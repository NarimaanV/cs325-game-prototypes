
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
    this.background = null;
    this.speed = 4;
    this.enemies = null, this.enemy = null;
    this.delay = 0;
    this.score = 0;
};

BasicGame.Game.prototype = {

    create: function () {
        this.game.stage.backgroundColor = "#FFFFFF";
        this.background = this.game.add.tileSprite(0, 0, 768, 512, 'background');
        this.game.world.setBounds(0, 0, 768, 512);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.array = ['rock', 'paper', 'scissors'];
        this.player = this.game.add.sprite(768/2, 128*3, this.array[Math.floor(Math.random() * 3)]);
        this.player.anchor.setTo(0.5, 0.5);
        
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.game.camera.follow(this.player);
        
        this.upKey = this.game.input.keyboard.addKey(Phaser.KeyCode.UP);
        this.leftKey = this.game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);
        
        this.input.keyboard.addKeyCapture(this.upKey);
        this.input.keyboard.addKeyCapture(this.leftKey);
        this.input.keyboard.addKeyCapture(this.rightKey);

        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemies.createMultiple(30 , 'rock');
        this.enemies.setAll('anchor.x', 0.5);
        this.enemies.setAll('anchor.y', 0.5);
        
        for (var i = 0; i < 6; i++)
        {
            this.enemy = this.enemies.getFirstExists(false);
            
            if (this.enemy)
            {
                this.enemy.reset(768 - i*140, 128);
                this.enemy.body.velocity.x = -50;
                this.change(this.enemy, this.array[Math.floor(Math.random() * 3)]);
            }
        }
        
        for (var i = 0; i < 6; i++)
        {
            this.enemy = this.enemies.getFirstExists(false);
            
            if (this.enemy)
            {
                this.enemy.reset(768 - i*140, -128);
                this.enemy.body.velocity.x = -50;
                this.change(this.enemy, this.array[Math.floor(Math.random() * 3)]);
            }
        }
    },

    update: function () {
        if (this.upKey.isDown)
        {
            this.movePlayerUp();
        }
        
        if (this.downKey.isDown)
        {
            this.movePlayerDown();
        }
        
        if (this.leftKey.isDown)
        {
            this.player.position.x -= this.speed;
        }
        
        if (this.rightKey.isDown)
        {
            this.player.position.x += this.speed;
        }
        
        this.enemies.forEachAlive(this.enemyHandler, this);
        
        this.game.physics.arcade.overlap(this.player, this.enemies, this.collisionHandler, null, this);
    },
    
    enemyHandler: function(enemy) {
        if (enemy.x <= -36.5)
        {
            enemy.x = 768 + 36.5;
        }
        
        if (enemy.y >= 512 + 50)
        {
            enemy.kill();
        }
    },

    quitGame: function(pointer) {
        this.player.destroy();
        this.enemies.destroy();
        this.background.destroy();
        this.state.start('MainMenu');

    },
    
    collisionHandler: function(player, enemy) {
        if (player.key === enemy.key)
        {
            return;    
        }
        
        else if (player.key === 'rock' && enemy.key === 'paper')
        {
            this.quitGame();
        }
        
        else if (player.key === 'paper' && enemy.key === 'rock')
        {
            enemy.kill();
            this.change(player, 'rock');
        }
        
        else if (player.key === 'scissors' && enemy.key === 'rock')
        {
            this.quitGame();
        }
        
        else if (player.key === 'rock' && enemy.key === 'scissors')
        {
            enemy.kill();
            this.change(player, 'scissors');
        }
        
        else if (player.key === 'paper' && enemy.key === 'scissors')
        {
            this.quitGame();
        }
        
        else if (player.key === 'scissors' && enemy.key === 'paper')
        {
            enemy.kill();
            this.change(player, 'paper');
        }
    },
    
    change: function(object, name) {
        object.loadTexture(name);
        object.body.setSize(75, 100, 0, 0);
    },
    
    movePlayerUp: function() {
        this.background.tilePosition.y += this.speed;
        if (this.background.tilePosition.y % 256 === 128 && this.game.time.now > this.delay)
        {
            for (var i = 0; i < 6; i++)
            {
                this.enemy = this.enemies.getFirstExists(false);

                if (this.enemy)
                {
                    this.enemy.reset(768 - i*140, -260);
                    this.enemy.body.velocity.x = -50;
                    this.change(this.enemy, this.array[Math.floor(Math.random() * 3)]);
                }
            }
            this.delay = this.game.time.now + 1000;
        }
        this.enemies.forEachAlive(function(enemy) {enemy.position.y += this.speed;}, this);
    },

    movePlayerDown: function() {
        this.background.tilePosition.y -= this.speed;
        this.enemies.forEachAlive(function(enemy) {enemy.position.y -= this.speed;}, this);
    }
};
