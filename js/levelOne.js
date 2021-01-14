"strict";
/*jshint esversion: 6 */

var levelOne = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "levelOne" });
  },
  init() {
    this.gameHasStarted = false;
    this.gameOver = false;
    this.score = 0;
    this.lives = 3;
    this.fontStyle = {
      fontSize: "32px",
      fontFamily: "Righteous, sans-serif",
    };
  },
  preload() {
    this.load.image("sky4", "assets/images/evening-sky.png");
  },
  create() {
    this.add.image(300, 220, "sky4");
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.createGameText();
    this.createPlayer();
    this.createBall();
    this.createCursors();
    this.createBricks();
    this.createWorldCollsion();
    this.createGameCollision();
    this.createSounds();
    this.createKillerBrick();
  },

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

    this.levelText = this.add.text(670, 20, "Level: 1", this.fontStyle);

    this.livesText = this.add.text(
      670,
      500,
      `Lives: ${this.lives}`,
      this.fontStyle
    );
  },
  createPlayer() {
    this.player = this.physics.add.sprite(400, 560, "player");
    this.player.scaleX = 0.25;
    this.player.scaleY = 0.25;
  },
  createBall() {
    this.ball = this.physics.add.sprite(400, 515, "ball");
    this.ball.scaleX = 0.25;
    this.ball.scaleY = 0.25;
  },
  createCursors() {
    this.cursors = this.input.keyboard.createCursorKeys();
  },
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
  },
  createWorldCollsion() {
    this.player.setCollideWorldBounds(true);
    this.ball.setCollideWorldBounds(true);
    this.physics.world.checkCollision.down = false;
    this.ball.setBounce(1, 1);
    this.player.setImmovable(true);
  },
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

    this.physics.add.collider(
      this.ball,
      this.player,
      this.ballHitPlayer,
      null,
      this
    );
  },
  createSounds() {
    this.playerHitSound = "playerHit";
    this.brickHitSound = "brickHit";
  },
  createKillerBrick() {
    this.killerBrick = this.physics.add.group();
    this.physics.add.overlap(
      this.player,
      this.killerBrick,
      this.hitKillerBrick,
      null,
      this
    );
  },

  update() {
    this.updateBallMoves();
    this.updatePlayerMoves();
    this.updateLoseLives();
    this.updateWinLose();
  },
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
  },
  updatePlayerMoves() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-700);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(700);
    } else {
      this.player.setVelocityX(0);
    }
  },
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
  },
  updateWinLose() {
    if (this.gameLost() === true) {
      this.ball.disableBody(true, true);
      this.gameHasStarted = false;
      this.player.setTint(0xff1111);
      this.time.addEvent({
        delay: 1500,
        loop: false,
        callback: () => {
          this.scene.start("levelLost", this.score);
        },
      });
    } else if (this.gameWon() === true) {
      this.ball.disableBody(true);
      this.gameHasStarted = false;
      this.scene.start("levelComplete", this.score);
    }
  },
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
  },
  ballHitPlayer(ball, player) {
    this.sound.play("playerHitSound");
    this.ball.setVelocityY(this.ball.body.velocity.y - 10);

    const total =
      this.brick1.countActive() +
      this.brick2.countActive() +
      this.brick3.countActive() +
      this.brick4.countActive() +
      this.brick5.countActive();
    if (total < 20) {
      const x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      const killerBrick = this.killerBrick.create(x, 15, "killer");
      killerBrick.setBounce(1.1);
      killerBrick.setCollideWorldBounds(true);
      killerBrick.setVelocityY(-250);
    }
  },
  hitKillerBrick(player, killerBrick) {
    killerBrick.setTexture("boom");
    this.physics.pause();
    killerBrick.disableBody(true);
    this.gameOver = true;
  },
  ballReset() {
    this.ball.setVelocity(0);
    this.ball.setPosition(this.player.x, 515);
    this.gameHasStarted = false;
  },

  gameLost() {
    if (this.gameOver === true) {
      return true;
    }
  },
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
  },
});
