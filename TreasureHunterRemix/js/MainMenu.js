
BasicGame.MainMenu = function (game) {

    this.titleText = null;
	this.music = null;
	this.button1 = null;
    this.button2 = null;
    this.menuLogo = null;
    this.button1Text = null;
    this.button2Text = null;
    this.style1 = {fill: "white", align: "center", fontSize: 50};
    this.style2 = {fill: "white", align: "center", fontSize: 30};

};

BasicGame.MainMenu.prototype = {

	create: function () {

        this.game.stage.backgroundColor = "#000000";
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
        
        this.titleText = this.game.add.text(400, 200, "Treasure Hunter!", this.style1);
        this.titleText.anchor.setTo(0.5);

		this.button1 = this.add.button(400, 400, 'button', function() {this.state.start('Game');}, this);
        this.button1.anchor.setTo(0.5, 0.5);
        
        this.button1Text = this.add.text(400, 400, 'START', this.style1);
        this.button1Text.anchor.setTo(0.5, 0.5);
        
        this.button2 = this.add.button(400, 525, 'button', function() {this.state.start('HowToPlay');}, this);
        //this.button2.scale.setTo(1.5, 1);
        this.button2.anchor.setTo(0.5, 0.5);
        
        this.button2Text = this.add.text(400, 525, 'HOW TO PLAY', this.style2);
        this.button2Text.anchor.setTo(0.5, 0.5);

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	And start the actual game
		this.state.start('Game');

	}

};
