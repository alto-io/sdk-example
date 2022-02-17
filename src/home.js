import background from "./assets/background.png";
import { arc } from "./index";

export default class Home extends Phaser.Scene {
  constructor() {
    super("Home");
  }

  preload() {
    this.load.image("background", background);
  }

  onClick() {
    let game = this.game;
    const onUserSelect = async (selectedNft) => {
      if (typeof selectedNft === "object") {
        game.scene.stop("Home");
        game.scene.start("Game", {
          selectedNft,
        });
      } else {
        console.log("User rejected selection!");
      }
    };
    arc.showNftsWindow(onUserSelect);
  }

  create() {
    this.backgroundImage = this.add.image(
      this.game.scale.width * 0.5,
      this.game.scale.height * 0.5,
      "background"
    );

    this.connectButton = this.add.text(
      this.game.scale.width * 0.5,
      this.game.scale.height * 0.5,
      "CONNECT",
      {
        fill: "#FFFFFF",
        fontSize: "80px",
        stroke: "#000000",
        strokeThickness: 8,
      }
    );
    this.connectButton.setOrigin(0.5, 0.5);
    this.connectButton.setInteractive({ useHandCursor: true });
    this.connectButton.on("pointerdown", this.onClick, this);
  }

  update() {}
}
