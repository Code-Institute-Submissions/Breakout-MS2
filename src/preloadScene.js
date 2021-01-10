import { Scene } from "phaser";

class PreloadScene extends Scene {
  constructor() {
    super("preload");
  }

  preload() {}
  create() {
    this.add.text(280, 250, "Level 1!", {
      fontSize: 48,
    });

    this.level1Text = this.add.text(75, 350, "Click anywhere to begin", {
      fontSize: 48,
    });

    this.input.on("pointerdown", () => this.scene.start("game"));
  }
}

export default PreloadScene;
