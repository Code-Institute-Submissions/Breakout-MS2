import { Scene } from "phaser";

class levelCompleteScene extends Scene {
  constructor() {
    super("gamewon");

    this.fontStyle = {
      fontSize: "5rem",
      fontFamily: "Righteous, Tahoma, Geneva",
    };
  }
  preload() {}
  create(data) {
    this.add.image(400, 420, "background");

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
      this.fontStyle
    );

    this.gameWinText.setOrigin(0.5);

    this.gameWinText = this.add.text(
      400,
      400,
      "Click Anywhere For Level 2!",
      this.fontStyle
    );

    this.gameWinText.setOrigin(0.5);

    this.input.on("pointerdown", () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
    });
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (cam, effect) => {
        this.scene.start("level2");
      }
    );
  }
}

export default levelCompleteScene;
