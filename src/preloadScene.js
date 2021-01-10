import { Scene } from "phaser";

class PreloadScene extends Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("sunset", "assets/images/sunset.png");
    this.load.image("space3", "assets/images/space3.png");
    this.load.image("brick1", "assets/images/blue-tile.png");
    this.load.image("brick2", "assets/images/green-tile.png");
    this.load.image("brick3", "assets/images/purple-tile.png");
    this.load.image("brick4", "assets/images/red-tile.png");
    this.load.image("brick5", "assets/images/orange-tile.png");
    this.load.image("brick6", "assets/images/blue-block.png");
    this.load.image("brick7", "assets/images/green-tile.png");
    this.load.image("brick8", "assets/images/purple-tile.png");
    this.load.image("player", "assets/images/player-paddle.png");
    this.load.image("ball", "assets/images/blue-ball.png");
    this.load.image("ball2", "assets/images/diamond.png");

    this.load.audio("brickHitSound", "assets/audio/sound2.wav");
    this.load.audio("playerHitSound", "assets/audio/sound1.wav");
  }
  create() {
    this.add.image(400, 300, "sunset");

    this.gameStartText = this.add.text(400, 200, "Ready To Play?", {
      fontSize: "50px",
      fontFamily: "Righteous, Tahoma, Geneva",
    });

    this.gameStartText.setOrigin(0.5);

    this.gameStartText = this.add.text(
      400,
      300,
      "Click Anywhere For Level 1!",
      {
        fontSize: "50px",
        fontFamily: "Righteous, Tahoma, Geneva",
      }
    );
    this.gameStartText.setOrigin(0.5);

    this.input.on("pointerdown", () => this.scene.start("game"));
  }
}

export default PreloadScene;
