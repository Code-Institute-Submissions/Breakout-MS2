"strict";
/*jshint esversion: 6 */

/* code from line 6 to line 9 taken from https://www.thepolyglotdeveloper.com/2020/09/switch-between-scenes-phaser-game/ to enable scene movement*/

levelComplete = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "levelComplete" });
  },
  init() {
    this.fontStyle = {
      fontSize: "5rem",
      fontFamily: "Righteous, sans-serif",
    };
    this.smallFont = {
      fontSize: "3rem",
      fontFamily: "Righteous, sans-serif",
    };
  },
  preload() {},
  create(data) {
    this.add.image(400, 520, "background");

    this.gameWinText = this.add
      .text(400, 200, "Congratulations! You Rock!", this.fontStyle)
      .setOrigin(0.5);

    this.gameWinText = this.add
      .text(400, 300, `You Scored ${data} Points`, this.smallFont)
      .setOrigin(0.5);

    this.gameWinText = this.add
      .text(400, 400, "Click Anywhere For The Next Level!", this.smallFont)
      .setOrigin(0.5);

    this.input.on("pointerdown", () => {
      /* code from line 39 to line 43 taken from https://blog.ourcade.co/posts/2020/phaser-3-fade-out-scene-transition*/
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
