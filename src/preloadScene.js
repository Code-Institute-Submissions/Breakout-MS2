import { Scene } from "phaser";

class PreloadScene extends Scene {
  constructor() {
    super("preload");
  }

  preload() {}
  create() {
    this.gameStartText = this.add.text(
      400,
      300,
      "Ready? Click anywhere to begin!",
      {
        fontSize: "50px",
        fill: "#fafafa",
        fontFamily: "Righteous, Tahoma, Geneva",
      }
    );
    this.gameStartText.setOrigin(0.5);

    this.input.on("pointerdown", () => this.scene.start("game"));
  }
}

export default PreloadScene;
