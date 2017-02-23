
BasicGame.HowToPlay = function (game) {

	this.HowToPlayText = null;
    this.style = {fill: "white", align: "center", backgroundColor: "black"};
    this.spaceKey = null;

};

BasicGame.HowToPlay.prototype = {

	create: function () {
        
        this.add.image(0, 0, 'menuBackground');

		this.instructionText = this.add.text(768/2, 576/2, 'You are a noble warrior cursed by an evil wizard.\nYour very being is fading away before your eyes.\nThe only way to stop the curse is to escape this dungeon.\nSuch a feat is not easy however!\nThe dungeon is full of monsters ready to tear you apart!\nAnd on top of that, you must keep from disappearing\ncompletely before you reach the end of the dungeon.\n\nHow to Play:\nUse the arrow keys to move around\nDodge monsters and make sure you don\'t vanish\n by touching the special anti-magic areas around the\ndungeon. These areas will reset the countdown to your\ndoom! Good luck noble warrior!\nPress Space to return to the Menu.', this.style);
        this.instructionText.anchor.setTo(0.5, 0.5);
        
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        
        this.input.keyboard.addKeyCapture(this.spaceKey);
        
        this.spaceKey.onDown.add(function() {this.state.start('MainMenu');}, this);

	}

};
