"strict";
/*jshint esversion: 6 */

//Phaser config settings taken from https://github.com/photonstorm/phaser3-project-template and modified to config this game//

const phaserConfig = {
  type: Phaser.AUTO,
  parent: "game",
  width: 800,
  height: 600,
  scene: [
    PreloadScene,
    levelOne,
    levelTwo,
    levelComplete,
    levelLost,
    gameComplete,
  ],
  scale: {
    mode: Phaser.Scale.RESIZE,
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

const game = new Phaser.Game(phaserConfig);
