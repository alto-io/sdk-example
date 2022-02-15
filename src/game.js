import background from "./assets/background.png";
import block from "./assets/block.png";
import * as Colyseus from "colyseus.js";
export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init(data) {
    this.selectedNft = data;
    this.selectedAvatar = data.image;
    this.arcSdk = data.arcSdk;
    //console.log(data.image);
    this.nftData = data;
  }

  async startGameSession() {
    if (!this.selectedNft) {
      console.log("No selected NFT!");
      return;
    }
    // need this to get the correct signer address
    this.arcSdk.testMode = false;
    let playerAddress = null;
    try {
      playerAddress = await this.arcSdk.getCurrentAddress();
    } catch (err) {
      this.arcSdk.testMode = true;
      console.log(err);
      return;
    }

    this.arcSdk.testMode = true;
    this.sessionId = await this.arcSdk.startGameSession(
      playerAddress,
      this.selectedNft.tokenId,
      this.selectedNft.contractAddress
    );
  }

  preload() {
    this.load.image("background", background);
    this.load.image("block", block);
    if (this.textures.exists("playerAvatar") === true) {
      this.textures.remove("playerAvatar");
    }
    this.load.image("playerAvatar", this.selectedAvatar);
  }

  async join() {
    var client = new Colyseus.Client("ws://localhost:2567");

    let room = await client.joinOrCreate("my_room", {
      name: "my_room",
    });

    return room;
  }

  async create() {
    //this.startGameSession()

    this.room = await this.join();

    this.serverObjects = {};

    this.interpolate = 0;
    this.enableInterpolation = false;

    this.room.onMessage("update", (message) => {
      this.interpolate = 0;
      this.enableInterpolation = true;
      this.serverObjects = message;
      this.scoreText.setText(message.score);
      //console.log(message);
    });

    this.room.onMessage("jump", (msg) => {
      console.log(msg);
    });

    this.room.onMessage("gameover", (msg) => {
      this.handleCollision();
    })

    console.log(this.room);


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
    this.input.on("pointerdown", this.makePlayerJump, this);

    this.topBlock = this.add.image(900, -85, "block");
    this.topBlock.setOrigin(0.5, 0.5);

    

    this.bottomBlock = this.add.image(
      900,
      1014,
      "block"
    );
    this.bottomBlock.setOrigin(0.5, 0.5);

    this.invisibleScoreBlock = this.add.image(
      this.game.scale.width * 0.5,
      this.game.scale.height * 0.5,
      "block"
    );
    this.invisibleScoreBlock.setAlpha(0);
    this.invisibleScoreBlock.setOrigin(0.5, 0.5);
    this.invisibleScoreBlock.setVisible(false);

    this.scoreText = this.add.text(
      this.game.scale.width * 0.5,
      this.game.scale.height * 0.1,
      "0",
      {
        fill: "#FFFFFF",
        fontSize: "80px",
        stroke: "#000000",
        strokeThickness: 8,
      }
    );
    this.scoreText.setOrigin(0.5, 0.5);
  }

  makePlayerJump() {
    this.playerVelocityY = this.playerJumpForce;
    this.room.send("jump");
  }

 
  handleCollision() {
    //this.arcSdk.testPostScore(this.sessionId, this.score)
    this.room.leave(true);
    this.scene.start("End", { score: this.scoreText.text });
  }

  update() {
    if (this.player !== undefined) {
      if (this.enableInterpolation === true) {
        this.interpolate += 1;

        this.player.y = Phaser.Math.Linear(
          this.player.y,
          this.serverObjects.player.y,
          this.interpolate / 6
        );

        this.topBlock.x = Phaser.Math.Linear(
          this.topBlock.x,
          this.serverObjects.topBlock.x,
          this.interpolate / 6
        );

        this.topBlock.y = Phaser.Math.Linear(
          this.topBlock.y,
          this.serverObjects.topBlock.y,
          this.interpolate / 6
        );

        this.bottomBlock.x = Phaser.Math.Linear(
          this.bottomBlock.x,
          this.serverObjects.bottomBlock.x,
          this.interpolate / 6
        );

        this.bottomBlock.y = Phaser.Math.Linear(
          this.bottomBlock.y,
          this.serverObjects.bottomBlock.y,
          this.interpolate / 6
        );

        this.invisibleScoreBlock.x = Phaser.Math.Linear(
          this.invisibleScoreBlock.x,
          this.serverObjects.invisibleScoreBlock.x,
          this.interpolate / 6
        );

        this.invisibleScoreBlock.y = Phaser.Math.Linear(
          this.invisibleScoreBlock.y,
          this.serverObjects.invisibleScoreBlock.y,
          this.interpolate / 6
        );

        if (this.interpolate >= 6) {
          this.enableInterpolation = false;
          this.interpolate = 0;
        }
      }
    }
    //this.updatePlayer();
    //this.updateBlocks();
    //this.checkForCollisions();
  }
}
