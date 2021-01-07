import { Scene } from "phaser";
import logoImg from "./assets/images/logo.png";
import brick1 from "./assets/images/blue-brick.png";
import brick2 from "./assets/images/green-brick.png";
import brick3 from "./assets/images/purple-brick.png";
import brick4 from "./assets/images/red-brick.png";
import brick5 from "./assets/images/yellow-brick.png";
import player from "./assets/images/player-paddle2.png";
import ball from "./assets/images/white-ball.png";

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
    this.load.image("player", player);
    this.load.image("ball", ball);
  }

  create() {
    this.player = this.add.sprite(400, 560, "player");
  }

  update() {}
}

export default GameScene;
