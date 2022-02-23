import background from "./assets/background.png";
import block from "./assets/block.png";
import { arc } from "./index";
import * as Colyseus from "colyseus.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init(data) {
    this.selectedNft = data.selectedNft;
    this.selectedAvatar = data.selectedNft.image;
    this.currentAddress = data.selectedNft.currentAddress;
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
    var client = new Colyseus.Client("wss://flg-2y.colyseus.de:443"); // new Colyseus.Client("ws://localhost:2567");
    let room = await client.joinOrCreate("my_room", {
      name: "my_room",
    });
    return room;
  }

  async create() {

    this.sessionId = await arc.startGameSession(
      this.selectedNft.currentAddress,
      this.selectedNft.tokenId,
      this.selectedNft.contractAddress
    );

    this.serverObjects = {};
    this.interpolate = 0;
    this.enableInterpolation = false;
    this.interpolationSteps = 6;

    this.room = await this.join();
    this.room.onMessage("update", (message) => {
      this.interpolate = 0;
      this.enableInterpolation = true;
      this.serverObjects = message;
    });
    this.room.onMessage("jump", (msg) => {});
    this.room.onMessage("gameover", (msg) => {
      this.gameOver();
    });

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

    this.bottomBlock = this.add.image(900, 1014, "block");
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

    this.roomText = this.add.text(
      0,
      this.game.scale.height,
      "Loading...",
      {
        fill: "#FFFFFF",
        fontSize: "30px",
        stroke: "#000000",
        strokeThickness: 3,
      }
    );
    this.roomText.setOrigin(0, 1);
  }

  makePlayerJump() {
    this.room.send("jump");
  }

  gameOver() {
    arc.testPostScore(this.sessionId, 9999);
    this.room.leave(true);
    this.scene.stop("Game");
    this.scene.start("End", { score: this.serverObjects.score });
  }

  update() {
    if (this.player !== undefined) {
      if (this.enableInterpolation === true) {
        this.interpolate += 1;

        this.player.y = Phaser.Math.Linear(
          this.player.y,
          this.serverObjects.player.y,
          this.interpolate / this.interpolationSteps
        );

        if (Math.abs(this.topBlock.x - this.serverObjects.topBlock.x) >= 100) {
          this.topBlock.x = this.serverObjects.topBlock.x;
          this.topBlock.y = this.serverObjects.topBlock.y;

          this.bottomBlock.x = this.serverObjects.bottomBlock.x;
          this.bottomBlock.y = this.serverObjects.bottomBlock.y;

          this.invisibleScoreBlock.x = this.serverObjects.invisibleScoreBlock.x;
          this.invisibleScoreBlock.y = this.serverObjects.invisibleScoreBlock.y;
        } else {
          this.topBlock.x = Phaser.Math.Linear(
            this.topBlock.x,
            this.serverObjects.topBlock.x,
            this.interpolate / this.interpolationSteps
          );

          this.topBlock.y = Phaser.Math.Linear(
            this.topBlock.y,
            this.serverObjects.topBlock.y,
            this.interpolate / this.interpolationSteps
          );

          this.bottomBlock.x = Phaser.Math.Linear(
            this.bottomBlock.x,
            this.serverObjects.bottomBlock.x,
            this.interpolate / this.interpolationSteps
          );

          this.bottomBlock.y = Phaser.Math.Linear(
            this.bottomBlock.y,
            this.serverObjects.bottomBlock.y,
            this.interpolate / this.interpolationSteps
          );

          this.invisibleScoreBlock.x = Phaser.Math.Linear(
            this.invisibleScoreBlock.x,
            this.serverObjects.invisibleScoreBlock.x,
            this.interpolate / this.interpolationSteps
          );

          this.invisibleScoreBlock.y = Phaser.Math.Linear(
            this.invisibleScoreBlock.y,
            this.serverObjects.invisibleScoreBlock.y,
            this.interpolate / this.interpolationSteps
          );
        }

        if (this.interpolate >= this.interpolationSteps) {
          this.enableInterpolation = false;
          this.interpolate = 0;
        }
      }

      if (this.serverObjects.score !== undefined) {
        this.scoreText.setText(this.serverObjects.score.toString());
        this.roomText.setText("roomId: "+this.room.id.toString());
      }

    }
  }
}
