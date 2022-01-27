import Arcadians from "arcadians-client-sdk";

let testMode = true;
let testAddress = "0xf0103243f4d22b5696588646b21313d85916a16a";
let arc = new Arcadians(testMode, testAddress);

export default class Home extends Phaser.Scene {
  constructor() {
    super("Home");
  }

  preload() {}

  create() {

    const game = this.game;
    function onUserSelect(selectedNft) {
      game.scene.start("Game", selectedNft.image);
    }

    arc.showNftsWindow(onUserSelect);
  }

  update() {}
}
