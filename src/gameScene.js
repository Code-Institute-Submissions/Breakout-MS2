import { Scene } from "phaser";
import logoImg from "./assets/images/logo.png";
import brick1 from "./assets/images/blue-brick.png";
import brick2 from "./assets/images/green-brick.png";
import brick3 from "./assets/images/purple-brick.png";
import brick4 from "./assets/images/red-brick.png";
import brick5 from "./assets/images/yellow-brick.png";

class GameScene extends Scene {
  constructor() {
    super("game");
  }

  preload() {
    this.load.image("logo", logoImg);
    this.load.image("brick1", brick1);
    this.load.image("brick2", brick2);
    this.load.image("brick3", brick3);
    this.load.image("brick4", brick4);
    this.load.image("brick5", brick5);
  }

  create() {
    const logo = this.add.image(400, 300, "logo");
    this.add.image(200, 200, "brick1");
    this.add.image(250, 450, "brick2");
  }

  update() {}
}

export default GameScene;
