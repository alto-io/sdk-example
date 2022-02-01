import background from "./assets/background.png";
import block from "./assets/block.png";
import playerAvatar from "./assets/playerAvatar.png";

export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");

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
  }

  init(imageLink) {
    this.imageLink = imageLink;
  }

  preload() {
    this.load.image("background", background);
    this.load.image("block", block);
    this.load.image("playerAvatar", playerAvatar);
  }

  create() {
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
    this.player.body = {
      x: this.player.x,
      y: this.player.y,
      width: this.player.width * this.player.scaleX,
      height: this.player.height * this.player.scaleY,
    };
    this.player.updateBody = () => {
      this.player.body.x = this.player.x;
      this.player.body.y = this.player.y;
    };
    this.input.on("pointerdown", this.makePlayerJump, this);

    this.topBlock = this.add.image(
      this.game.scale.width + this.blocksWidth * 0.5,
      this.game.scale.height + this.blocksVerticalDistance - this.blocksOffset,
      "block"
    );
    this.topBlock.setOrigin(0.5, 0.5);
    this.topBlock.body = {
      x: this.topBlock.x,
      y: this.topBlock.y,
      width: this.topBlock.width * this.topBlock.scaleX,
      height: this.topBlock.height * this.topBlock.scaleY,
    };
    this.topBlock.updateBody = () => {
      this.topBlock.body.x = this.topBlock.x;
      this.topBlock.body.y = this.topBlock.y;
    };

    this.bottomBlock = this.add.image(
      this.game.scale.width + this.blocksWidth * 0.5,
      0 - this.blocksVerticalDistance - this.blocksOffset,
      "block"
    );
    this.bottomBlock.setOrigin(0.5, 0.5);
    this.bottomBlock.body = {
      x: this.bottomBlock.x,
      y: this.bottomBlock.y,
      width: this.bottomBlock.width * this.bottomBlock.scaleX,
      height: this.bottomBlock.height * this.bottomBlock.scaleY,
    };
    this.bottomBlock.updateBody = () => {
      this.bottomBlock.body.x = this.bottomBlock.x;
      this.bottomBlock.body.y = this.bottomBlock.y;
    };
  }

  setBlocksGroupOffset(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  updatePlayer() {
    this.player.tint = 0xffffff;
    this.playerVelocityY += this.playerGravity;
    this.player.y += this.playerVelocityY;
    this.player.updateBody();
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
    }
    this.topBlock.updateBody();

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
        this.player.body,
        this.topBlock.body
      ) === true
    ) {
      this.handleCollision();
    }

    if (
      this.detectCollisionBetweenBodies(
        this.player.body,
        this.bottomBlock.body
      ) === true
    ) {
      this.handleCollision();
    }
  }

  handleCollision() {
    this.player.tint = 0xff0000;
    //this.scene.pause();
  }

  update() {
    this.updatePlayer();
    this.updateBlocks();
    this.checkForCollisions();
  }
}
