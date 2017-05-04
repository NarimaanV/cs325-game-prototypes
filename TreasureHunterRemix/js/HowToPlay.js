BasicGame.HowToPlay = function (game) {

	this.HowToPlayText = null;
    this.style = {fill: "white", align: "center", backgroundColor: "black"};
    this.spaceKey = null;
    this.button = null, this.buttonText = null;

};

BasicGame.HowToPlay.prototype = {

	create: function () {
        this.game.add.text(150, 50, 'Use arrow keys to move!', this.style);
        this.game.add.image(150, 100, 'goalGem');
        this.game.add.text(200, 100, 'Get 3 of these to win!', this.style);
        this.game.add.image(150, 150, 'deathGem');
        this.game.add.text(200, 150, 'Get 3 of these to lose!', this.style);
        this.game.add.image(150, 200, 'shrinkGem');
        this.game.add.text(200, 200, 'This will make your glow smaller!', this.style);
        this.game.add.image(150, 250, 'growGem');
        this.game.add.text(200, 250, 'This will make your glow bigger!', this.style);
        this.game.add.image(150, 300, 'freezeGem');
        this.game.add.text(200, 300, 'This will freeze you for 5 seconds!', this.style);
        
        this.button = this.game.add.button(400, 525, 'button', function() {this.state.start('MainMenu');}, this);
        this.button.anchor.setTo(0.5);
        
        this.buttonText = this.game.add.text(400, 525, 'MAIN MENU', {fill: "white", align: "center", fontSize: 30});
        this.buttonText.anchor.setTo(0.5);
        
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        
        this.input.keyboard.addKeyCapture(this.spaceKey);
        
        this.spaceKey.onDown.add(function() {this.state.start('MainMenu');}, this);

	}

};
