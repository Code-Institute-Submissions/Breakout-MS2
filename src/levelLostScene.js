import { Scene } from "phaser";

class levelLostScene extends Scene {
  constructor() {
    super("gameover");
  }
  preload() {}
  create() {
    this.GameOverText = this.add.text(400, 200, "GAME OVER!", {
      fontSize: "50px",
      fontFamily: "Righteous, Tahoma, Geneva",
    });

    this.GameOverText.setOrigin(0.5);

    this.GameOverText = this.add.text(
      400,
      300,
      "Click Anywhere To Try Again!",
      {
        fontSize: "50px",
        fontFamily: "Righteous, Tahoma, Geneva",
      }
    );

    this.GameOverText.setOrigin(0.5);

    this.input.on("pointerdown", () => this.scene.start("game"));
  }
}

export default levelLostScene;
