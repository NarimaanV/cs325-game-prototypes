
BasicGame.Preloader = function (game) {

	this.loadingBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.stage.backgroundColor = '#ffffff'
		this.loadingBar = this.add.sprite(384, 288, 'loadingBar');
        this.loadingBar.anchor.setTo(0.5, 0);

		//	This sets the loadingBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.loadingBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('titlePage', 'assets/title.jpg');
		this.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
		this.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
		//	+ lots of other required assets here
        this.load.image( 'logo', 'assets/phaser.png' );
        
        this.load.spritesheet( 'warrior', 'assets/warriorMedium.png', 96, 96);
        this.game.load.tilemap('tilemap', 'assets/DungeonTileMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/tileSheet.png');
        this.game.load.image('monster1', 'assets/monster1.png');
        this.game.load.image('monster2', 'assets/monster2.png');
        this.game.load.image('monster3', 'assets/monster3.png');
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.loadingBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
