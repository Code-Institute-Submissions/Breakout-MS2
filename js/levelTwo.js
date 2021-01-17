"strict";
/*jshint esversion: 6 */

levelTwo = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "levelTwo" });
  },
  init() {
    this.gameHasStarted = false;
    this.gameOver = false;
    this.score = 0;
    this.lives = 3;
    this.fontStyle = {
      fontSize: "3.2rem",
      fontFamily: "Righteous, sans-serif",
    };
  },
  preload() {},
  create() {
    this.add.image(400, 350, "space3");
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
      400,
      "Press SPACEBAR to Start Game!",
      this.fontStyle
    );
    this.gameStartText.setOrigin(0.5);

    this.levelText = this.add.text(670, 20, "Level: 2", this.fontStyle);

    this.livesText = this.add.text(
      670,
      620,
      `Lives: ${this.lives}`,
      this.fontStyle
    );
  },
  createPlayer() {
    this.player = this.physics.add.sprite(400, 620, "player");
    this.player.scaleX = 0.25;
    this.player.scaleY = 0.25;
  },
  createBall() {
    this.ball = this.physics.add.sprite(400, 565, "ball");
    this.ball.scaleX = 0.25;
    this.ball.scaleY = 0.25;
  },
  createCursors() {
    this.cursors = this.input.keyboard.createCursorKeys();
  },
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
  },
  createWorldCollsion() {
    this.player.setCollideWorldBounds(true);
    this.ball.setCollideWorldBounds(true);
    this.physics.world.checkCollision.down = false;
  },
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
  },
  createSounds() {
    this.playerHitSound = "playerHit";
    this.brickHitSound = "brickHit";
  },
  createKillerBrick() {
    this.killerBrick = this.physics.add.group();
    this.physics.add.collider(
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
        this.ball.setVelocityY(-350);
        this.ball.setVelocityX(350);
        this.gameStartText.setVisible(false);
      }
    }
    this.ball.setBounce(1, 1);
    this.ball.setFriction(0, 0);
  },
  updatePlayerMoves() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-700);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(700);
    } else {
      this.player.setVelocityX(0);
    }
    this.player.setImmovable(true);
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
      this.ball.disableBody(true, true);
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
    this.ball.setVelocityY(this.ball.body.velocity.y - 15);

    const total =
      this.brick7.countActive() +
      this.brick8.countActive() +
      this.brick6.countActive() +
      this.brick3.countActive() +
      this.brick4.countActive() +
      this.brick5.countActive();
    if (total < 30) {
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
    this.ball.setPosition(this.player.x, 565);
    this.gameHasStarted = false;
  },

  gameLost() {
    if (this.gameOver === true) {
      return true;
    }
  },
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
  },
});
