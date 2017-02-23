
BasicGame.MainMenu = function (game) {

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

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('gameMusic', 0.5, true);
		if (!this.music.isPlaying)
        {
            this.music.play();
        }

		this.add.image(0, 0, 'menuBackground');
        this.menuLogo = this.add.image(768/2, 150, 'menuLogo');
        this.menuLogo.anchor.setTo(0.5, 0.5);

		this.button1 = this.add.button(768/2, 400, 'button', function() {this.state.start('Game'); this.music.stop();}, this);
        this.button1.anchor.setTo(0.5, 0.5);
        
        this.button1Text = this.add.text(768/2, 400, 'START', this.style1);
        this.button1Text.anchor.setTo(0.5, 0.5);
        
        this.button2 = this.add.button(768/2, 500, 'button', function() {this.state.start('HowToPlay'); this.music.stop();}, this);
        //this.button2.scale.setTo(1.5, 1);
        this.button2.anchor.setTo(0.5, 0.5);
        
        this.button2Text = this.add.text(768/2, 500, 'HOW TO PLAY', this.style2);
        this.button2Text.anchor.setTo(0.5, 0.5);

	}
};
