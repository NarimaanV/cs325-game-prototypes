
BasicGame.MainMenu = function (game) {

	this.playButton = null;
    this.title = null;
    this.playText = null;
};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.add.image(0, 0, 'background');
        
        this.title = this.add.text(384, 128, "RPS CRASH!", {fill:'white', align:'center', fontSize:80});
        this.title.anchor.setTo(0.5, 0.5);

		this.playButton = this.add.button(384, 400, 'playButton', this.startGame, this);
        this.playButton.anchor.setTo(0.5, 0.5);
        this.playButton.scale.setTo(0.75, 0.75);
        this.playText = this.add.text(384, 400, 'PLAY', {fill:'white', align:'center', fontSize:40});
        this.playText.anchor.setTo(0.5, 0.5);

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {
		//	And start the actual game
		this.state.start('Game');

	}

};
