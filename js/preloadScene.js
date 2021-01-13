"strict";
/*jshint esversion: 6 */

var PreloadScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "PreloadScene" });
  },
  init() {
    this.fontStyle = {
      fontSize: "5rem",
      fontFamily: "Righteous, Tahoma, Geneva",
    };
  },
  preload() {
    this.load.image("sky", "assets/images/sky3.png");
    this.load.image("sky3", "assets/images/sky3.png");
    this.load.image("sky4", "assets/images/evening-sky.png");
    this.load.image("background", "assets/images/background2.png");
    this.load.image("space3", "assets/images/space3.png");
    this.load.image("brick1", "assets/images/blue-tile.png");
    this.load.image("brick2", "assets/images/green-tile.png");
    this.load.image("brick3", "assets/images/purple-tile.png");
    this.load.image("brick4", "assets/images/yellow-tile.png");
    this.load.image("brick5", "assets/images/orange-tile.png");
    this.load.image("brick6", "assets/images/blue-block.png");
    this.load.image("brick7", "assets/images/green-tile.png");
    this.load.image("brick8", "assets/images/purple-tile.png");
    this.load.image("player", "assets/images/player-paddle.png");
    this.load.image("ball", "assets/images/blue-ball.png");
    this.load.image("killer", "assets/images/red-brick.png");
    this.load.image("boom", "assets/images/boom.png");

    this.load.audio("brickHitSound", "assets/audio/sound2.wav");
    this.load.audio("playerHitSound", "assets/audio/sound1.wav");
  },
  create() {
    this.add.image(400, 450, "background");

    this.gameStartText = this.add.text(
      400,
      200,
      "Ready To Play?",
      this.fontStyle
    );

    this.gameStartText.setOrigin(0.5);

    this.gameStartText = this.add.text(
      400,
      300,
      "Click Anywhere For Level 1!",
      this.fontStyle
    );
    this.gameStartText.setOrigin(0.5);

    this.input.on("pointerdown", () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
    });
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (cam, effect) => {
        this.scene.start("gameScene");
      }
    );
  },
  update() {},
});
