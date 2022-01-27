import Arcadians from "arcadians-client-sdk";
import background from "./assets/background.png";

    let testMode = true;
    let testAddress = "0xf0103243f4d22b5696588646b21313d85916a16a";
    let arc = new Arcadians(testMode, testAddress, 50);

export default class Home extends Phaser.Scene {
  constructor() {
    super("Home");
  }

  preload() {
    this.load.image("background", background);
  }

  onClick() {
    let game = this.game;
      function onUserSelect(selectedNft) {
        if (typeof selectedNft === "object") {
          game.scene.stop("Home");
          game.scene.start("Game", selectedNft.image);
        }
        else {
          console.log("User rejected selection!");
        }
      }
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
        fill: "#000000",
        fontSize: "80px",
        backgroundColor: "#FFF000",
      }
    );
    this.connectButton.setOrigin(0.5, 0.5);
    this.connectButton.setInteractive({ useHandCursor: true });
    this.connectButton.on("pointerdown", this.onClick, this);
  }

  update() {}
}
