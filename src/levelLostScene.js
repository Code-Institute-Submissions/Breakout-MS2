import { Scene } from "phaser";

class levelLostScene extends Scene {
  constructor() {
    super("gameover");
  }
  preload() {}
  create() {
    this.GameOverText = this.add.text(400, 300, "Game Over!", {
      fontSize: "70px",
      fill: "#fafafa",
      fontFamily: "Righteous, Tahoma, Geneva",
    });

    this.GameOverText.setOrigin(0.5);

    this.input.on("pointerdown", () => this.scene.start("preload"));
  }
}

export default levelLostScene;
