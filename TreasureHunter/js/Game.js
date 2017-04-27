
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
    this.glow = null;
    this.player = null;
    this.test = null;
    this.goalGem = null, this.deathGem = null, this.shrinkGem = null, this.growGem = null, this.freezeGem = null;
    this.upKey = null;
    this.downKey = null;
    this.leftKey = null;
    this.rightKey = null;
    this.speed = 120;
    this.playerFrameRate = 10;
    this.playerSpawnX = null, this.playerSpawnY = null;
    this.spawns = null, this.spawn = null;
    this.style = {fill:'white', align:'center', fontSize:50};
    this.livesText = null, this.goalText = null, this.timeText = null;
    this.livesCount = 3, this.goalCount = 0, this.timer = 0;
};

BasicGame.Game.prototype = {

    create: function () {
        this.glow = null;
        this.player = null;
        this.test = null;
        this.goalGem = null, this.deathGem = null, this.shrinkGem = null, this.growGem = null, this.freezeGem = null;
        this.upKey = null;
        this.downKey = null;
        this.leftKey = null;
        this.rightKey = null;
        this.speed = 120;
        this.playerFrameRate = 10;
        this.playerSpawnX = null, this.playerSpawnY = null;
        this.spawns = null, this.spawn = null;
        this.style = {fill:'white', align:'center', fontSize:50};
        this.livesText = null, this.goalText = null, this.timeText = null;
        this.livesCount = 3, this.goalCount = 0, this.timer = 0;
        
        
        this.game.stage.backgroundColor = "#CCCCCC";
        
        this.playerSpawnX = 400;
        this.playerSpawnY = 300;
        
        this.spawns = [];
        
        for(var i = 50; i <= 750; i += 50)
        {
            for (var j = 100; j <= 550; j+= 50)
            {
                // player.x and player.y not defined yet dummy
                if ((i < this.playerSpawnX - 100 || i > this.playerSpawnX + 100) && (j < this.playerSpawnY - 100 || j > this.playerSpawnY + 100))
                {
                    this.spawns.push([i, j]);  
                }
            }
        }
        
        this.spawn = this.game.rnd.integerInRange(0, this.spawns.length - 1);
        this.goalGem = this.game.add.sprite(this.spawns[this.spawn][0], this.spawns[this.spawn][1], 'goalGem');
        this.goalGem.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.goalGem);
        this.spawns.splice(this.spawn, 1);
        
        this.spawn = this.game.rnd.integerInRange(0, this.spawns.length - 1);
        this.deathGem = this.game.add.sprite(this.spawns[this.spawn][0], this.spawns[this.spawn][1], 'deathGem');
        this.deathGem.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.deathGem);
        this.spawns.splice(this.spawn, 1);
        
        this.spawn = this.game.rnd.integerInRange(0, this.spawns.length - 1);
        this.shrinkGem = this.game.add.sprite(this.spawns[this.spawn][0], this.spawns[this.spawn][1], 'shrinkGem');
        this.shrinkGem.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.shrinkGem);
        this.spawns.splice(this.spawn, 1);
        
        this.spawn = this.game.rnd.integerInRange(0, this.spawns.length - 1);
        this.growGem = this.game.add.sprite(this.spawns[this.spawn][0], this.spawns[this.spawn][1], 'growGem');
        this.growGem.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.growGem);
        this.spawns.splice(this.spawn, 1);
        
//        this.spawn = this.game.rnd.integerInRange(0, this.spawns.length - 1);
//        this.freezeGem = this.game.add.sprite(this.spawns[this.spawn][0], this.spawns[this.spawn][1], 'freezeGem');
//        this.freezeGem.anchor.setTo(0.5);
//        this.game.physics.arcade.enable(this.freezeGem);
//        this.spawns.splice(this.spawn, 1);    
        
        this.player = this.add.sprite(this.playerSpawnX, this.playerSpawnY, 'player');
        this.player.anchor.setTo(0.5);
        
        this.game.physics.arcade.enable(this.player);
        this.player.animations.add('walk-down', [0, 1, 2, 3, 4, 5, 6, 7], null, true);
        this.player.animations.add('walk-right', [24, 25, 26, 27, 28, 29, 30, 31], null, true);
        this.player.animations.add('walk-left', [16, 17, 18, 19, 20, 21, 22, 23], null, true);
        this.player.animations.add('walk-up', [8, 9, this.playerFrameRate, 11, 12, 13, 14, 15], null, true);
        this.player.body.collideWorldBounds = true;
        
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
        
        this.upKey.onDown.add(function() {this.player.animations.play('walk-up', this.playerFrameRate, true); if (this.player.body.velocity.y == 0) {this.player.body.velocity.y -= this.speed;}}, this);
        this.upKey.onUp.add(function() {this.player.animations.stop('walk-up'); if (this.player.body.velocity.y != 0) {this.player.body.velocity.y += this.speed;}}, this);
        
        this.downKey.onDown.add(function() {this.player.animations.play('walk-down', this.playerFrameRate, true); if (this.player.body.velocity.y == 0) {this.player.body.velocity.y += this.speed;}}, this);
        this.downKey.onUp.add(function() {this.player.animations.stop('walk-down'); if (this.player.body.velocity.y != 0) {this.player.body.velocity.y -= this.speed;}}, this);
        
        this.leftKey.onDown.add(function() {this.player.animations.play('walk-left', this.playerFrameRate, true); if (this.player.body.velocity.x == 0) {this.player.body.velocity.x -= this.speed;}}, this);
        this.leftKey.onUp.add(function() {this.player.animations.stop('walk-left'); if (this.player.body.velocity.x != 0) {this.player.body.velocity.x += this.speed;}}, this);
        
        this.rightKey.onDown.add(function() {this.player.animations.play('walk-right', this.playerFrameRate, true); if (this.player.body.velocity.x == 0) {this.player.body.velocity.x += this.speed;}}, this);
        this.rightKey.onUp.add(function() {this.player.animations.stop('walk-right'); if (this.player.body.velocity.x != 0) {this.player.body.velocity.x -= this.speed;}}, this);
        
        this.glow = this.game.add.sprite(this.player.x, this.player.y, 'glow');
        this.glow.anchor.setTo(0.5);
        this.glow.scale.setTo(0.5);
        
        this.livesText = this.game.add.text(0, 0, "Lives: " + this.livesCount, this.style);
        
        this.goalText = this.game.add.text(600, 0, "Jewels: " + this.goalCount, this.style);
        this.goalText.anchor.setTo(0.125, 0);
        
        this.timer = this.game.time.create(false);
        this.timer.start();
        
        this.timeText = this.game.add.text(400, 0, "Time: " + Math.floor(this.timer.seconds), this.style);
        this.timeText.anchor.setTo(0.5, 0);
        
    },

    update: function () {
        this.timeText.setText("Time: " + Math.floor(this.timer.seconds));
        this.glow.x = this.player.x;
        this.glow.y = this.player.y;
        
//        this.game.physics.arcade.overlap(this.player, this.freezeGem, this.playerHitsFreezeGem, null, this);
        
        this.game.physics.arcade.overlap(this.player, this.growGem, function () {this.glow.scale.x *= 2; this.glow.scale.y *= 2; this.growGem.kill();}, null, this);
        
        this.game.physics.arcade.overlap(this.player, this.shrinkGem, function () {this.glow.scale.x /= 2; this.glow.scale.y /= 2; this.shrinkGem.kill();}, null, this);
        
        this.game.physics.arcade.overlap(this.player, this.goalGem, this.playerHitsGoalGem, null, this);
        this.game.physics.arcade.overlap(this.player, this.deathGem, this.playerHitsDeathGem, null, this);
    },
    
    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    },
    
    playerHitsGoalGem: function (player, goalGem)
    {
        this.goalCount++;
        if (this.goalCount === 3)
        {
            this.quitGame();
        }
        else
        {
            this.goalText.setText("Jewels: " + this.goalCount);
            this.goalGem.kill();
            this.spawn = this.game.rnd.integerInRange(0, this.spawns.length - 1);
            this.goalGem.reset(this.spawns[this.spawn][0], this.spawns[this.spawn][1]);
            this.goalGem.anchor.setTo(0.5);
            this.game.physics.arcade.enable(this.goalGem);
            this.spawns.splice(this.spawn, 1);  
        }
    },
    
    playerHitsDeathGem: function (player, deathGem)
    {
        this.livesCount--;
        if (this.livesCount === 0)
        {
            this.quitGame();
        }
        else
        {
            this.livesText.setText("Lives: " + this.livesCount);
            this.deathGem.kill();
            this.spawn = this.game.rnd.integerInRange(0, this.spawns.length - 1);
            this.deathGem.reset(this.spawns[this.spawn][0], this.spawns[this.spawn][1]);
            this.deathGem.anchor.setTo(0.5);
            this.game.physics.arcade.enable(this.deathGem);
            this.spawns.splice(this.spawn, 1);  
        }
    }
    
//    playerHitsFreezeGem: function (player, freezeGem) {
//        this.freezePlayer();
//        this.game.time.events.add(5, this.unfreezePlayer, this);
//    },
//    
//    freezePlayer: function () {
//        this.player.body.velocity.x = 0;
//        this.player.body.velocity.y = 0;
//        this.upKey.onDown.removeAll(this);
//        this.upKey.onUp.removeAll(this);
//        this.downKey.onDown.removeAll(this);
//        this.downKey.onUp.removeAll(this);
//        this.leftKey.onDown.removeAll(this);
//        this.leftKey.onUp.removeAll(this);
//        this.rightKey.onDown.removeAll(this);
//        this.rightKey.onUp.removeAll(this);
//    },
//    
//    unfreezePlayer: function () {
//        this.upKey.onDown.add(function() {this.player.animations.play('walk-up', this.playerFrameRate, true); if (this.player.body.velocity.y == 0) {this.player.body.velocity.y -= this.speed;}}, this);
//        this.upKey.onUp.add(function() {this.player.animations.stop('walk-up'); if (this.player.body.velocity.y != 0) {this.player.body.velocity.y += this.speed;}}, this);
//        
//        this.downKey.onDown.add(function() {this.player.animations.play('walk-down', this.playerFrameRate, true); if (this.player.body.velocity.y == 0) {this.player.body.velocity.y += this.speed;}}, this);
//        this.downKey.onUp.add(function() {this.player.animations.stop('walk-down'); if (this.player.body.velocity.y != 0) {this.player.body.velocity.y -= this.speed;}}, this);
//        
//        this.leftKey.onDown.add(function() {this.player.animations.play('walk-left', this.playerFrameRate, true); if (this.player.body.velocity.x == 0) {this.player.body.velocity.x -= this.speed;}}, this);
//        this.leftKey.onUp.add(function() {this.player.animations.stop('walk-left'); if (this.player.body.velocity.x != 0) {this.player.body.velocity.x += this.speed;}}, this);
//        
//        this.rightKey.onDown.add(function() {this.player.animations.play('walk-right', this.playerFrameRate, true); if (this.player.body.velocity.x == 0) {this.player.body.velocity.x += this.speed;}}, this);
//        this.rightKey.onUp.add(function() {this.player.animations.stop('walk-right'); if (this.player.body.velocity.x != 0) {this.player.body.velocity.x -= this.speed;}}, this);
//    }
};
