import { Scene } from "phaser";

class Level2Scene extends Scene {
  constructor() {
    super("level2");
  }

  init() {
    this.gameHasStarted = false;
    this.gameOver = false;
    this.score = 0;
    this.lives = 3;
    this.fontStyle = {
      fontSize: "32px",
      fontFamily: "Righteous, Tahoma, Geneva",
    };
  }

  preload() {}

  create() {
    this.add.image(400, 300, "space3");
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.createPlayer();
    this.createBall();
    this.createCursors();
    this.createBricks();
    this.createWorldCollsion();
    this.createGameCollision();
    this.createSounds();
    this.createKillerBrick();
    this.createGameText();
  }

  createGameText() {
    this.gameScoreText = this.add.text(
      20,
      20,
      `Score: ${this.score}`,
      this.fontStyle
    );

    this.gameStartText = this.add.text(
      400,
      350,
      "Press SPACEBAR to Start Game!",
      this.fontStyle
    );
    this.gameStartText.setOrigin(0.5);

    this.levelText = this.add.text(670, 20, "Level: 2", this.fontStyle);

    this.livesText = this.add.text(
      670,
      500,
      `Lives: ${this.lives}`,
      this.fontStyle
    );
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
    this.brick7 = this.physics.add.group({
      key: "brick7",
      immovable: true,
      repeat: 5,
      setScale: { x: 0.25, y: 0.25 },
      setXY: {
        x: 150,
        y: 290,
        stepX: 100,
      },
    });
    this.brick8 = this.physics.add.group({
      key: "brick8",
      immovable: true,
      repeat: 6,
      setScale: { x: 0.25, y: 0.25 },
      setXY: {
        x: 100,
        y: 250,
        stepX: 100,
      },
    });

    this.brick6 = this.physics.add.group({
      key: "brick6",
      immovable: true,
      repeat: 18,
      setScale: { x: 0.25, y: 0.25 },
      setXY: {
        x: 40,
        y: 210,
        stepX: 40,
      },
    });

    this.brick3 = this.physics.add.group({
      key: "brick3",
      immovable: true,
      repeat: 6,
      setScale: { x: 0.25, y: 0.25 },
      setXY: {
        x: 100,
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
      setScale: { x: 0.35, y: 0.25 },
      repeat: 2,
      setXY: {
        x: 260,
        y: 90,
        stepX: 140,
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
      this.brick7,
      this.smashBrick,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.brick8,
      this.smashBrick,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.brick6,
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

    this.physics.add.collider(
      this.ball,
      this.player,
      this.ballHitPlayer,
      null,
      this
    );
  }

  createKillerBrick() {
    this.killerBrick = this.physics.add.group();
    this.physics.add.overlap(
      this.player,
      this.killerBrick,
      this.hitball2,
      null,
      this
    );
  }

  hitKillerBrick(player, killerBrick) {
    this.sound.play("brickHitSound");
    this.gameOver = true;
  }

  createSounds() {
    this.playerHitSound = "playerHit";
    this.brickHitSound = "brickHit";
  }

  update() {
    this.updateBallMoves();
    this.updatePlayerMoves();
    this.updateWinLose();
    this.updateLoseLives();
  }
  updateBallMoves() {
    if (this.gameHasStarted === false) {
      this.ball.setX(this.player.x);

      if (this.cursors.space.isDown) {
        this.gameHasStarted = true;
        this.ball.setVelocityY(-250);
        this.ball.setVelocityX(250);
        this.gameStartText.setVisible(false);
      }
    }
  }

  updatePlayerMoves() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-700);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(700);
    } else {
      this.player.setVelocityX(0);
    }
  }

  updateLoseLives() {
    if (this.ball.y > this.player.y) {
      this.lives--;
      {
        if (this.lives > 0) {
          this.livesText.setText(`Lives: ${this.lives}`);
          this.ballReset();
        } else {
          this.gameOver = true;
        }
      }
    }
  }

  updateWinLose() {
    if (this.gameLost() === true) {
      this.ball.disableBody(true);
      this.gameHasStarted = false;
      this.scene.start("gameover", this.score);
    } else if (this.gameWon() === true) {
      this.ball.disableBody(true);
      this.gameHasStarted = false;
      this.scene.start("gamewon", this.score);
    }
  }

  smashBrick(ball, brick) {
    this.score += 10;
    this.gameScoreText.setText(`Score: ${this.score}`);

    brick.setTexture("boom");
    this.sound.play("brickHitSound");
    brick.disableBody(true, false);

    this.tweens.add({
      targets: brick,
      scaleX: 1,
      scaleY: 1,
      duration: 1000,
      onComplete: () => {
        brick.disableBody(true, true);
      },
    });
  }

  ballHitPlayer(ball, player) {
    this.sound.play("playerHitSound");
    this.ball.setVelocityY(this.ball.body.velocity.y - 15);

    let SetNewVelocityX = Math.abs(this.ball.body.velocity.x) + 15;

    if (this.ball.x < this.player.x) {
      this.ball.setVelocityX(-SetNewVelocityX);
    } else {
      this.ball.setVelocityX(SetNewVelocityX);
    }
    const total =
      this.brick7.countActive() +
      this.brick8.countActive() +
      this.brick6.countActive() +
      this.brick3.countActive() +
      this.brick4.countActive() +
      this.brick5.countActive();

    if (total < 15) {
      const x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      const killerBrick = this.killerBrick.create(x, 15, "killer");
      killerBrick.setBounce(1.1);
      killerBrick.setCollideWorldBounds(true);
      killerBrick.setVelocityY(-250);
    }
  }

  hitKillerBrick(player, killerBrick) {
    this.sound.play("brickHitSound");
    this.gameOver = true;
  }

  ballReset() {
    this.ball.setVelocity(0);
    this.ball.setPosition(this.player.x, 515);
    this.gameHasStarted = false;
  }

  gameLost() {
    if (this.gameOver === true) {
      return true;
    }
  }

  gameWon() {
    const total =
      this.brick7.countActive() +
      this.brick8.countActive() +
      this.brick6.countActive() +
      this.brick3.countActive() +
      this.brick4.countActive() +
      this.brick5.countActive();

    if (total === 0) {
      return true;
    }
  }
}

export default Level2Scene;
