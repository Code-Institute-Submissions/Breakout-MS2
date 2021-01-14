"strict";
/*jshint esversion: 6 */

var levelComplete = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "levelComplete" });
  },
  init() {
    this.fontStyle = {
      fontSize: "5rem",
      fontFamily: "Righteous, Tahoma, Geneva",
    };
    this.smallFont = {
      fontSize: "3rem",
      fontFamily: "Righteous, Tahoma, Geneva",
    };
  },
  preload() {},
  create(data) {
    this.add.image(400, 520, "background");

    this.gameWinText = this.add.text(
      400,
      200,
      "Congratulations! You Rock!",
      this.fontStyle
    );

    this.gameWinText.setOrigin(0.5);

    this.gameWinText = this.add.text(
      400,
      300,
      `You Scored ${data} Points`,
      this.smallFont
    );

    this.gameWinText.setOrigin(0.5);

    this.gameWinText = this.add.text(
      400,
      400,
      "Click Anywhere For The Next Level!",
      this.smallFont
    );

    this.gameWinText.setOrigin(0.5);

    this.input.on("pointerdown", () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
    });
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (cam, effect) => {
        this.scene.start("levelTwo");
      }
    );
  },
});
