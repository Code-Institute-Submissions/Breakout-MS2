import Phaser from "phaser";
import GameScene from "./GameScene";

const config = {
  type: Phaser.AUTO,
  parent: "Milestone 2",
  width: 800,
  height: 600,
  scene: GameScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: false,
      debug: false,
    },
  },
};
export { config };
