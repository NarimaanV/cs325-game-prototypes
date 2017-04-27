
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;
    this.style = {fill:'white', align:'center', fontSize:50};
    this.titleText = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

        this.game.stage.backgroundColor = "#000000";
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
        
        this.titleText = this.game.add.text(400, 200, "Treasure Hunter!", this.style);
        this.titleText.anchor.setTo(0.5);

		this.playButton = this.add.button( 303, 400, 'playButton', this.startGame, this, 'over', 'out', 'down');

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	And start the actual game
		this.state.start('Game');

	}

};
