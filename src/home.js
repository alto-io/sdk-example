import Arcadians from "arcadians-client-sdk";
import background from "./assets/background.png";

const testMode = true;
const testAddress = "0xf0103243f4d22b5696588646b21313d85916a16a";
export const gameId = '0cd69241-531c-4698-bf17-454dd6cb1ab4'
const sdkApiUrl = 'http://localhost:3001'

export const arc = new Arcadians(testMode, testAddress, 50, gameId, sdkApiUrl);
export class Home extends Phaser.Scene {
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
          ...selectedNft,
          arcSdk: arc,
        });
      } else {
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
