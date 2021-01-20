"strict";
/*jshint esversion: 6 */

/* code from line 6 to line 9 taken from https://www.thepolyglotdeveloper.com/2020/09/switch-between-scenes-phaser-game/ to enable scene movement*/

levelOne = new Phaser.Class({
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
      fontSize: "3.2rem",
      fontFamily: "Righteous, sans-serif",
    };
    this.scale = 0.25;
  },
  /* Pleaload the scene background*/
  preload() {
    this.load.image("sky4", "assets/images/evening-sky.png");
  },
  /* Load the scene background and create all game methods within the create function*/
  create() {
    this.add.image(300, 350, "sky4");
    /* code line 30 taken from https://blog.ourcade.co/posts/2020/phaser-3-fade-out-scene-transition*/
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

    /* function counts all active brricks - used to determine game won log*/
    this.activeBricks = () =>
      this.brick1.countActive() +
      this.brick2.countActive() +
      this.brick3.countActive() +
      this.brick4.countActive() +
      this.brick5.countActive();
  },

  /*Creates & positions all game displayed text for this scene*/
  createGameText() {
    this.gameScoreText = this.add.text(
      20,
      20,
      `Score: ${this.score}`,
      this.fontStyle
    );

    this.gameStartText = this.add
      .text(400, 400, "Press SPACEBAR to Start Game!", this.fontStyle)
      .setOrigin(0.5);

    this.levelText = this.add.text(670, 20, "Level: 1", this.fontStyle);

    this.livesText = this.add.text(
      670,
      600,
      `Lives: ${this.lives}`,
      this.fontStyle
    );
  },

  /* Creates and positions player starting point*/
  createPlayer() {
    this.player = this.physics.add.sprite(400, 620, "player");
    this.player.scaleX = this.scale;
    this.player.scaleY = this.scale;
  },

  /* Creates and positions ball starting point*/
  createBall() {
    this.ball = this.physics.add.sprite(400, 565, "ball");
    this.ball.scaleX = this.scale;
    this.ball.scaleY = this.scale;
  },

  /* Method to enable keyboard curser keys for game movement*/
  createCursors() {
    this.cursors = this.input.keyboard.createCursorKeys();
  },

  /* creates, positions and displays brick layout*/
  createBricks() {
    this.brick1 = this.physics.add.group({
      key: "brick1",
      immovable: true,
      repeat: 2,
      setScale: { x: this.scale, y: this.scale },
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
      setScale: { x: this.scale, y: this.scale },
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
      setScale: { x: this.scale, y: this.scale },
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
      setScale: { x: this.scale, y: this.scale },
      setXY: {
        x: 150,
        y: 130,
        stepX: 100,
      },
    });

    this.brick5 = this.physics.add.group({
      key: "brick5",
      immovable: true,
      setScale: { x: this.scale, y: this.scale },
      repeat: 5,
      setXY: {
        x: 150,
        y: 90,
        stepX: 100,
      },
    });
  },

  /* Enables game parameters so ball and player stay within the game boundaries*/
  createWorldCollsion() {
    this.player.setCollideWorldBounds(true);
    this.ball.setCollideWorldBounds(true);
    this.physics.world.checkCollision.down = false;
  },

  /* Enables parameters for game collision events*/
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

  /* Creates sound effects ready to be called upon on defined game collision events*/
  createSounds() {
    this.playerHitSound = "playerHit";
    this.brickHitSound = "brickHit";
    this.gameLostSound = "gameLostSound";
  },

  /* Creates killer bricks (falling bricks)*/
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

  /* update function methods*/
  update() {
    this.updatedCursorMoves();
    this.updateBallMoves();
    this.updatePlayerMoves();
    this.updateLoseLives();
    this.updateWinLose();
  },

  /* Enables keyboard controls*/
  updatedCursorMoves() {
    this.PlayerMoveleft = this.cursors.left.isDown;
    this.PlayerMoveRight = this.cursors.right.isDown;
    this.spacebarIsDown = this.cursors.space.isDown;
  },

  /* Updates logic for ball movement within the game + starting parameters*/
  updateBallMoves() {
    if (this.gameHasStarted === false) {
      this.ball.setX(this.player.x);

      if (this.spacebarIsDown) {
        this.gameHasStarted = true;
        this.ball.setVelocityY(-350);
        this.ball.setVelocityX(350);
        this.gameStartText.setVisible(false);
      }
    }
    this.ball.setBounce(1, 1);
    this.ball.setFriction(0, 0);
  },

  /* Updates logic for player movement & speed within the game + starting parameters*/
  updatePlayerMoves() {
    if (this.PlayerMoveleft) {
      this.player.setVelocityX(-700);
    } else if (this.PlayerMoveRight) {
      this.player.setVelocityX(700);
    } else {
      this.player.setVelocityX(0);
    }
    this.player.setImmovable(true);
  },

  /* Updates logic for loosing lives & game over if all lifes lost*/
  updateLoseLives() {
    if (this.ball.y > this.player.y) {
      this.lives--;
      this.sound.play("lifeLostSound");
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

  /* calls gameLost and gameWon functions to determine game results and game next steps*/
  updateWinLose() {
    if (this.gameLost() === true) {
      this.ball.disableBody(true, true);
      this.gameHasStarted = false;
      this.player.setTint(0xff1111);
      /* code from line 296 to line 29 taken from https://blog.ourcade.co/posts/2020/phaser-3-fade-out-scene-transition*/
      this.time.addEvent({
        delay: 1500,
        loop: false,
        callback: () => {
          /* moves user to next scene in the game, passes previous games high score to new scene*/
          this.scene.start("levelLost", this.score);
        },
      });
    } else if (this.gameWon() === true) {
      this.ball.disableBody(true);
      this.gameHasStarted = false;
      this.sound.play("gameWonSound");
      this.scene.start("levelComplete", this.score);
    }
  },

  /* removes brick on collision event, updates scre, creates explosion animation effect*/
  smashBrick(ball, brick) {
    this.score += 25;
    this.gameScoreText.setText(`Score: ${this.score}`);
    this.sound.play("brickHitSound");
    brick.disableBody(true, true);

    const explode = {
      key: "explode1",
      frames: "boom",
      frameRate: 20,
    };

    this.anims.create(explode);
    this.brickExplode();
  },

  /* creates sound effect on ball/brick collison, increases ball speed, creates parameters for falling brick logic*/
  ballHitPlayer(ball, player) {
    this.sound.play("playerHitSound");
    this.ball.setVelocityY(this.ball.body.velocity.y - 10);

    /*Code from line 336 to 344 taken from https://phaser.io/tutorials/making-your-first-phaser-3-game/part10*/
    if (this.activeBricks() < 20) {
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

  /* Updates game logic on brick/player collision - ends game*/
  hitKillerBrick(player, killerBrick) {
    this.playerExplode();
    this.physics.pause();
    this.sound.play("gameLostSound");
    killerBrick.disableBody(true, true);
    this.gameOver = true;
  },

  /* places ball back above the player to resume game in event ball is lost*/
  ballReset() {
    this.ball.setVelocity(0);
    this.ball.setPosition(this.player.x, 565);
    this.gameHasStarted = false;
  },

  /* Mothod creates explosion animation on ball/brick collision event*/
  brickExplode() {
    this.add.sprite(this.ball.x, this.ball.y, "boom").play("explode1");
  },

  /* Mothod creates explosion animation on brick/player collision event*/
  playerExplode() {
    this.add.sprite(this.player.x, this.player.y, "boom").play("explode1");
  },

  /* game lost function*/
  gameLost() {
    if (this.gameOver === true) {
      return true;
    }
  },

  /* game Won function*/
  gameWon() {
    if (this.activeBricks() === 0) {
      return true;
    }
  },
});
