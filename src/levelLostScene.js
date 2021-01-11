import { Scene } from "phaser";

class levelLostScene extends Scene {
  constructor() {
    super("gameover");

    this.fontStyle = {
      fontSize: "5rem",
      fontFamily: "Righteous, Tahoma, Geneva",
    };
  }
  preload() {}
  create() {
    this.add.image(400, 420, "background");

    this.GameOverText = this.add.text(400, 200, "GAME OVER!", this.fontStyle);

    this.GameOverText.setOrigin(0.5);

    this.GameOverText = this.add.text(
      400,
      300,
      "Click Anywhere To Try Again!",
      this.fontStyle
    );

    this.GameOverText.setOrigin(0.5);

    this.input.on("pointerdown", () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
    });
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (cam, effect) => {
        this.scene.start("game");
      }
    );
  }
}

export default levelLostScene;
