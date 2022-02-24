import background from "./assets/background.png";

export default class Home extends Phaser.Scene {
  constructor() {
    super("End");
  }

  init(data) {
    this.score = data.score;
  }

  preload() {
    this.load.image("background", background);
  }

  create() {
    this.backgroundImage = this.add.image(
      this.game.scale.width * 0.5,
      this.game.scale.height * 0.5,
      "background"
    );

    this.topText = this.add.text(
      this.game.scale.width * 0.5,
      this.game.scale.height * 0.2,
      "SCORE",
      {
        fill: "#FFFFFF",
        fontSize: "80px",
        stroke: "#000000",
        strokeThickness: 8,
      }
    );
    this.topText.setOrigin(0.5, 0.5);

    this.scoreText = this.add.text(
      this.game.scale.width * 0.5,
      this.game.scale.height * 0.3,
      "Loading...",
      {
        fill: "#FFFFFF",
        fontSize: "80px",
        stroke: "#000000",
        strokeThickness: 8,
      }
    );
    this.scoreText.setOrigin(0.5, 0.5);

    this.restartText = this.add.text(
      this.game.scale.width * 0.5,
      this.game.scale.height * 0.5,
      "RESTART",
      {
        fill: "#FFFFFF",
        fontSize: "80px",
        stroke: "#000000",
        strokeThickness: 8,
      }
    );
    this.restartText.setOrigin(0.5, 0.5);
    this.restartText.setInteractive({ useHandCursor: true });
    this.restartText.on("pointerdown", this.restartCallback, this);

    this.homeText = this.add.text(
      this.game.scale.width * 0.5,
      this.game.scale.height * 0.8,
      "HOME",
      {
        fill: "#FFFFFF",
        fontSize: "80px",
        stroke: "#000000",
        strokeThickness: 8,
      }
    );
    this.homeText.setOrigin(0.5, 0.5);
    this.homeText.setInteractive({ useHandCursor: true });
    this.homeText.on("pointerdown", this.homeCallback, this);
  }

  restartCallback() {
    this.scene.stop("End");
    this.scene.start("Game");
  }

  homeCallback() {
    this.scene.stop("End");
    this.scene.start("Home");
  }

  update() {
    if (this.scoreText !== undefined && typeof this.score === "number") {
      this.scoreText.setText(this.score.toString());
    }
  }
}
