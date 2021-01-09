import { Scene } from "phaser";

class GameScene extends Scene {
  constructor() {
    super("game");
  }

  init() {
    this.gameHasStarted = false;
    this.gameOver = false;
    this.score = 0;
  }

  preload() {
    this.load.image("sunset", "assets/images/sunset.png");
    this.load.image("space3", "assets/images/space3.png");
    this.load.image("logoImg", "assets/images/logo.png");
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

    this.createPlayer();
    this.createBall();
    this.createCursors();
    this.createBricks();
    this.createWorldCollsion();
    this.createGameCollision();
    this.createSounds();
    this.createBall2();

    ////////////////////////////////////
    this.gameScoreText = this.add.text(20, 20, `Score: ${this.score}`, {
      fontSize: "32px",
      fill: "#fafafa",
      fontFamily: "Righteous, Tahoma, Geneva",
    });

    ////////////////////////////////////
    this.gameStartText = this.add.text(
      400,
      300,
      "Press SPACEBAR to Start Game!",
      {
        fontSize: "50px",
        fill: "#fafafa",
        fontFamily: "Righteous, Tahoma, Geneva",
      }
    );
    this.gameStartText.setOrigin(0.5);

    //////////////////////////////////////
    //ADD LEVEL TEXT
    this.levelText = this.add.text(670, 20, "Level: 1", {
      fontSize: "32px",
      fill: "#fafafa",
      fontFamily: "Righteous, Tahoma, Geneva",
    });
  }

  createPlayer() {
    this.player = this.physics.add.sprite(400, 560, "player");
    this.player.scaleX = 0.25;
    this.player.scaleY = 0.25;
  }
  createBall() {
    this.ball = this.physics.add.sprite(400, 515, "ball");
    this.ball.scaleX = 0.25;
    this.ball.scaleY = 0.25;
  }
  createCursors() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createBricks() {
    this.brick1 = this.physics.add.group({
      key: "brick1",
      immovable: true,
      repeat: 2,
      setScale: { x: 0.25, y: 0.25 },
      setXY: {
        x: 295,
        y: 250,
        stepX: 100,
      },
    });

    this.brick2 = this.physics.add.group({
      key: "brick2",
      immovable: true,
      repeat: 5,
      setScale: { x: 0.25, y: 0.25 },
      setXY: {
        x: 150,
        y: 210,
        stepX: 100,
      },
    });

    this.brick3 = this.physics.add.group({
      key: "brick3",
      immovable: true,
      repeat: 5,
      setScale: { x: 0.25, y: 0.25 },
      setXY: {
        x: 150,
        y: 170,
        stepX: 100,
      },
    });

    this.brick4 = this.physics.add.group({
      key: "brick4",
      immovable: true,
      repeat: 5,
      setScale: { x: 0.25, y: 0.25 },
      setXY: {
        x: 150,
        y: 130,
        stepX: 100,
      },
    });

    this.brick5 = this.physics.add.group({
      key: "brick5",
      immovable: true,
      setScale: { x: 0.25, y: 0.25 },
      repeat: 5,
      setXY: {
        x: 150,
        y: 90,
        stepX: 100,
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
      this.brick1,
      this.smashBrick,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.brick2,
      this.smashBrick,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.brick3,
      this.smashBrick,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.brick4,
      this.smashBrick,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.brick5,
      this.smashBrick,
      null,
      this
    );
    this.physics.add.collider(this.ball, this.brick5, null, this);

    this.physics.add.collider(
      this.ball,
      this.player,
      this.ballHitPlayer,
      null,
      this
    );
  }

  createBall2() {
    this.ball2s = this.physics.add.group();
    this.physics.add.overlap(
      this.player,
      this.ball2s,
      this.hitball2,
      null,
      this
    );
  }

  hitball2(player, ball2) {
    this.sound.play("brickHitSound");
    this.gameOver = true;
  }

  createSounds() {
    this.playerHitSound = "playerHit";
    this.brickHitSound = "brickHit";
  }

  update() {
    if (this.gameLost() === true) {
      this.ball.disableBody(true);
      this.gameHasStarted = false;
      this.scene.start("gameover");
    } else if (this.gameWon() === true) {
      this.ball.disableBody(true);
      this.gameHasStarted = false;
      this.scene.start("gamewon");
    }

    //////////////////////////////////////////////////////
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-500);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(500);
    } else {
      this.player.setVelocityX(0);
    }
    //////////////////////////////////////////////////////
    if (this.gameHasStarted === false) {
      this.ball.setX(this.player.x);

      if (this.cursors.space.isDown) {
        this.gameHasStarted = true;
        this.ball.setVelocityY(-250);
        this.ball.setVelocityX(-250);
        this.gameStartText.setVisible(false);
      }
    }
  }

  smashBrick(ball, brick) {
    this.sound.play("brickHitSound");
    brick.disableBody(true, false);

    this.score += 10;
    this.gameScoreText.setText(`Score: ${this.score}`);

    const tween = this.tweens.add({
      targets: brick,
      alpha: { from: 1, to: 0 },
      ease: "Bounce",
      duration: 100,
      repeat: 3,
      onComplete: () => {
        brick.disableBody(true, true);
      },
    });
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

    if (this.brick1.countActive(true) < 3) {
      const x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      const ball2 = this.ball2s.create(x, 15, "ball2");
      ball2.setBounce(1.1);
      ball2.setCollideWorldBounds(true);
      ball2.setVelocityY(-150);
    }
  }
  // Lose the game
  gameLost() {
    if (this.ball.body.y > this.player.body.y || this.gameOver === true) {
      return true;
    }
  }

  // win the game
  gameWon() {
    const total =
      this.brick1.countActive() +
      this.brick2.countActive() +
      this.brick3.countActive() +
      this.brick4.countActive() +
      this.brick5.countActive();

    if (total === 0) {
      return true;
    }
  }
}

export default GameScene;
