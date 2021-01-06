import { Scene } from "phaser";
import logoImg from "./assets/images/logo.png";

class GameScene extends Scene {
  constructor() {
    super("game");
  }

  preload() {
    this.load.image("logo", logoImg);
  }

  create() {
    const logo = this.add.image(400, 300, "logo");
  }

  update() {}
}

export default GameScene;
