import { Scene } from "phaser";

class levelCompleteScene extends Scene {
  constructor() {
    super("gamewon");
  }
  preload() {}
  create() {
    this.gameWinText = this.add.text(400, 200, "Congratulations! You Rock!", {
      fontSize: "50px",
      fontFamily: "Righteous, Tahoma, Geneva",
    });

    this.gameWinText.setOrigin(0.5);

    this.gameWinText = this.add.text(400, 300, "Press spacebar For Level 2!", {
      fontSize: "50px",
      fontFamily: "Righteous, Tahoma, Geneva",
    });

    this.gameWinText.setOrigin(0.5);

    this.input.keyboard.on("keydown", () => this.scene.start("level2"));
  }
}

export default levelCompleteScene;
