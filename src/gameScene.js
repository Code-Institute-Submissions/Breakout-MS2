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

  init() {
    this.gameHasStarted = false;
    this.score = 0;
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

    this.load.audio("brickHitSound", "assets/audio/sound2.wav");
    this.load.audio("playerHitSound", "assets/audio/sound1.wav");
  }

  create() {
    this.createPlayer();
    this.createBall();
    this.createCursors();
    this.createBricks();
    this.createWorldCollsion();
    this.createGameCollision();
    this.createSounds();

    this.gameScoreText = this.add.text(20, 20, `Score: ${this.score}`, {
      fontSize: "32px",
      fill: "#fafafa",
      fontFamily: "Righteous, Tahoma, Geneva",
    });
  }

  createPlayer() {
    this.player = this.physics.add.sprite(400, 560, "player");
  }
  createBall() {
    this.ball = this.physics.add.sprite(400, 525, "ball");
  }
  createCursors() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createBricks() {
    this.blueBricks = this.physics.add.group({
      key: "brick1",
      immovable: true,
      repeat: 10,
      setXY: {
        x: 50,
        y: 250,
        stepX: 70,
      },
    });

    this.greenBricks = this.physics.add.group({
      key: "brick2",
      immovable: true,
      repeat: 10,
      setXY: {
        x: 50,
        y: 210,
        stepX: 70,
      },
    });

    this.purpleBricks = this.physics.add.group({
      key: "brick3",
      immovable: true,
      repeat: 10,
      setXY: {
        x: 50,
        y: 170,
        stepX: 70,
      },
    });

    this.redBricks = this.physics.add.group({
      key: "brick4",
      immovable: true,
      repeat: 10,
      setXY: {
        x: 50,
        y: 130,
        stepX: 70,
      },
    });

    this.yellowBricks = this.physics.add.group({
      key: "brick5",
      immovable: true,
      repeat: 10,
      setXY: {
        x: 50,
        y: 90,
        stepX: 70,
      },
    });
  }

  createWorldCollsion() {
    this.player.setCollideWorldBounds(true);
    this.ball.setCollideWorldBounds(true);
    this.physics.world.checkCollision.down = false;
    this.ball.setBounce(1, 1);
    this.player.setImmovable(true);
  }

  createGameCollision() {
    this.physics.add.collider(
      this.ball,
      this.blueBricks,
      this.smashBrick,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.greenBricks,
      this.smashBrick,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.purpleBricks,
      this.smashBrick,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.redBricks,
      this.smashBrick,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.yellowBricks,
      this.smashBrick,
      null,
      this
    );
    this.physics.add.collider(this.ball, this.yellowBricks, null, this);

    this.physics.add.collider(
      this.ball,
      this.player,
      this.ballHitPlayer,
      null,
      this
    );
  }

  createSounds() {
    this.playerHitSound = "playerHit";
    this.brickHitSound = "brickHit";
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-500);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(500);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.gameHasStarted === false) {
      this.ball.setX(this.player.x);

      if (this.cursors.space.isDown) {
        this.gameHasStarted = true;
        this.ball.setVelocityY(-250);
        this.ball.setVelocityX(-250);
      }
    }
  }

  smashBrick(ball, brick) {
    brick.disableBody(true, true);
    this.sound.play("brickHitSound");

    this.score += 10;
    this.gameScoreText.setText(`Score: ${this.score}`);
  }

  ballHitPlayer(ball, player) {
    this.sound.play("playerHitSound");
    this.ball.setVelocityY(this.ball.body.velocity.y - 10);

    let SetNewVelocityX = Math.abs(this.ball.body.velocity.x) + 5;

    if (this.ball.x < this.player.x) {
      this.ball.setVelocityX(-SetNewVelocityX);
    } else {
      this.ball.setVelocityX(SetNewVelocityX);
    }
  }
}

export default GameScene;
