import { Scene } from "phaser";

class PreloadScene extends Scene {
  constructor() {
    super("preload");
  }

  preload() {}
  create() {
    this.gameStartText = this.add.text(400, 200, "Ready To Play?", {
      fontSize: "50px",
      fontFamily: "Righteous, Tahoma, Geneva",
    });

    this.gameStartText.setOrigin(0.5);

    this.gameStartText = this.add.text(
      400,
      300,
      "Press spacebar For Level 1!",
      {
        fontSize: "50px",
        fontFamily: "Righteous, Tahoma, Geneva",
      }
    );
    this.gameStartText.setOrigin(0.5);

    this.input.keyboard.on("keydown", () => this.scene.start("game"));
  }
}

export default PreloadScene;
