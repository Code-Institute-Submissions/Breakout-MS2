"strict";
/*jshint esversion: 6 */

const phaserConfig = {
  type: Phaser.AUTO,
  parent: "game",
  width: 800,
  height: 600,
  scene: [PreloadScene, levelOne, levelTwo, levelComplete, levelLost],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: false,
      debug: true,
    },
  },
};

const game = new Phaser.Game(phaserConfig);
