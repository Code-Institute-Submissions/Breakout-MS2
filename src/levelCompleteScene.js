import { Scene } from "phaser";

class levelCompleteScene extends Scene {
  constructor() {
    super("gamewon");
  }
  preload() {}
  create() {
    this.gameWinText = this.add.text(400, 300, "You Won :)", {
      fontSize: "50px",
      fill: "#fafafa",
      fontFamily: "Righteous, Tahoma, Geneva",
    });

    this.gameWinText.setOrigin(0.5);

    this.input.on("pointerdown", () => this.scene.start("level2"));
  }
}

export default levelCompleteScene;
