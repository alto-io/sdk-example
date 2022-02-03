import background from "./assets/background.png";
import block from "./assets/block.png";

export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init(data) {
    this.selectedAvatar = data.image;
    console.log(data.image);
  }

  preload() {
    this.load.image("background", background);
    this.load.image("block", block);
    if (this.textures.exists("playerAvatar") === true) {
      this.textures.remove("playerAvatar");
    }
    this.load.image("playerAvatar", this.selectedAvatar);
  }

  create() {
    this.playerGravity = 0.5;
    this.playerVelocityY = 0;
    this.playerJumpForce = -10;

    this.blocksWidth = 200;
    this.blocksOffsetDistance = 200;
    this.blocksOffset = this.setBlocksGroupOffset(
      -this.blocksOffsetDistance,
      this.blocksOffsetDistance
    );
    this.blocksVerticalDistance = 150;

    this.score = 0;

    this.backgroundImage = this.add.image(
      this.game.scale.width * 0.5,
      this.game.scale.height * 0.5,
      "background"
    );

    this.player = this.add.sprite(
      this.game.scale.width * 0.5,
      this.game.scale.height * 0.5,
      "playerAvatar"
    );
    this.player.setOrigin(0.5, 0.5);
    this.player.setScale(0.4, 0.4);
    this.player.collisionBody = {
      x: this.player.x,
      y: this.player.y,
      width: this.player.width * this.player.scaleX,
      height: this.player.height * this.player.scaleY,
    };
    this.player.updateBody = () => {
      this.player.collisionBody.x = this.player.x;
      this.player.collisionBody.y = this.player.y;
    };
    this.input.on("pointerdown", this.makePlayerJump, this);

    this.topBlock = this.add.image(
      this.game.scale.width + this.blocksWidth * 0.5,
      this.game.scale.height + this.blocksVerticalDistance - this.blocksOffset,
      "block"
    );
    this.topBlock.setOrigin(0.5, 0.5);
    this.topBlock.collisionBody = {
      x: this.topBlock.x,
      y: this.topBlock.y,
      width: this.topBlock.width * this.topBlock.scaleX,
      height: this.topBlock.height * this.topBlock.scaleY,
    };
    this.topBlock.updateBody = () => {
      this.topBlock.collisionBody.x = this.topBlock.x;
      this.topBlock.collisionBody.y = this.topBlock.y;
    };

    this.bottomBlock = this.add.image(
      this.game.scale.width + this.blocksWidth * 0.5,
      0 - this.blocksVerticalDistance - this.blocksOffset,
      "block"
    );
    this.bottomBlock.setOrigin(0.5, 0.5);
    this.bottomBlock.collisionBody = {
      x: this.bottomBlock.x,
      y: this.bottomBlock.y,
      width: this.bottomBlock.width * this.bottomBlock.scaleX,
      height: this.bottomBlock.height * this.bottomBlock.scaleY,
    };
    this.bottomBlock.updateBody = () => {
      this.bottomBlock.collisionBody.x = this.bottomBlock.x;
      this.bottomBlock.collisionBody.y = this.bottomBlock.y;
    };

    this.invisibleScoreBlock = this.add.image(
      this.game.scale.width * 0.5,
      this.game.scale.height * 0.5,
      "block"
    );
    this.invisibleScoreBlock.setAlpha(0);
    this.invisibleScoreBlock.setOrigin(0.5, 0.5);
    this.invisibleScoreBlock.collisionBody = {
      x: this.invisibleScoreBlock.x,
      y: this.invisibleScoreBlock.y,
      width: this.invisibleScoreBlock.width * this.invisibleScoreBlock.scaleX,
      height: this.invisibleScoreBlock.height * this.invisibleScoreBlock.scaleY,
    };
    this.invisibleScoreBlock.updateBody = () => {
      this.invisibleScoreBlock.collisionBody.x = this.invisibleScoreBlock.x;
      this.invisibleScoreBlock.collisionBody.y = this.invisibleScoreBlock.y;
    };
    this.invisibleScoreBlock.scored = false;
    this.invisibleScoreBlock.setVisible(false);

    this.scoreText = this.add.text(
      this.game.scale.width * 0.5,
      this.game.scale.height * 0.1,
      this.score.toString(),
      {
        fill: "#FFFFFF",
        fontSize: "80px",
        stroke: "#000000",
        strokeThickness: 8,
      }
    );
    this.scoreText.setOrigin(0.5, 0.5);
  }

  setBlocksGroupOffset(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  updatePlayer() {
    this.playerVelocityY += this.playerGravity;
    this.player.y += this.playerVelocityY;
    this.player.updateBody();

    if (
      this.player.y + this.player.collisionBody.height * 0.5 >=
      this.game.scale.height
    ) {
      this.handleCollision();
    }

    if (this.player.y - this.player.collisionBody.height * 0.5 <= 0) {
      this.handleCollision();
    }
  }

  updateBlocks() {
    this.topBlock.x -= 5;
    if (this.topBlock.x < -this.topBlock.width * 0.5) {
      this.blocksOffset = this.setBlocksGroupOffset(
        -this.blocksOffsetDistance,
        this.blocksOffsetDistance
      );
      this.topBlock.x = this.game.scale.width + this.topBlock.width * 0.5;
      this.topBlock.y =
        this.game.scale.height +
        this.blocksVerticalDistance -
        this.blocksOffset;
      this.invisibleScoreBlock.scored = false;
    }
    this.topBlock.updateBody();

    if (this.invisibleScoreBlock.scored === false) {
      this.invisibleScoreBlock.x =
        this.topBlock.x + this.invisibleScoreBlock.collisionBody.width * 0.5;
      this.invisibleScoreBlock.updateBody();
    }

    this.bottomBlock.x -= 5;
    if (this.bottomBlock.x < -this.bottomBlock.width * 0.5) {
      this.bottomBlock.x = this.game.scale.width + this.bottomBlock.width * 0.5;
      this.bottomBlock.y = 0 - this.blocksVerticalDistance - this.blocksOffset;
    }
    this.bottomBlock.updateBody();
  }

  makePlayerJump() {
    this.playerVelocityY = this.playerJumpForce;
  }

  detectCollisionBetweenBodies(bodyA, bodyB) {
    if (
      bodyA.x - bodyA.width * 0.5 <= bodyB.x + bodyB.width * 0.5 &&
      bodyA.x + bodyA.width * 0.5 >= bodyB.x - bodyB.width * 0.5 &&
      bodyA.y - bodyA.height * 0.5 <= bodyB.y + bodyB.height * 0.5 &&
      bodyA.y + bodyA.height * 0.5 >= bodyB.y - bodyB.height * 0.5
    ) {
      return true;
    }
  }

  checkForCollisions() {
    if (
      this.detectCollisionBetweenBodies(
        this.player.collisionBody,
        this.topBlock.collisionBody
      ) === true
    ) {
      this.handleCollision();
    }

    if (
      this.detectCollisionBetweenBodies(
        this.player.collisionBody,
        this.bottomBlock.collisionBody
      ) === true
    ) {
      this.handleCollision();
    }

    if (
      this.detectCollisionBetweenBodies(
        this.player.collisionBody,
        this.invisibleScoreBlock.collisionBody
      ) === true
    ) {
      this.invisibleScoreBlock.scored = true;
      this.invisibleScoreBlock.x =
        -this.invisibleScoreBlock.collisionBody.width * 0.5;
      this.invisibleScoreBlock.updateBody();
      this.score += 1;
      this.scoreText.setText(this.score.toString());
    }
  }

  handleCollision() {
    this.scene.start("End", { score: this.score });
  }

  update() {
    this.updatePlayer();
    this.updateBlocks();
    this.checkForCollisions();
  }
}
