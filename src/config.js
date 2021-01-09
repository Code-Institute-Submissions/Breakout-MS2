import Phaser from "phaser";
import PreloadScene from "./PreloadScene";
import GameScene from "./GameScene";
import levelLostScene from "./levelLostScene";
import levelCompleteScene from "./levelCompleteScene";
import level2Scene from "./level2Scene";

const config = {
  type: Phaser.AUTO,
  parent: "Milestone 2",
  width: 800,
  height: 600,
  scene: [
    PreloadScene,
    GameScene,
    levelLostScene,
    levelCompleteScene,
    level2Scene,
  ],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: false,
      debug: false,
    },
  },
};
export { config };
