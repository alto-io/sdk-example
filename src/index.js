import Phaser from "phaser";
import Arcadians from "arcadians-client-sdk";
import SampleGame from "./sample";

let link;


const config = {
  type: Phaser.AUTO,
  backgroundColor: 0xd595f3,
  parent: "sample-game",
  width: 400,
  height: 400,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: SampleGame,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0,
      },
    },
  },
};

let testMode = true;
let testAddress = "0xf0103243f4d22b5696588646b21313d85916a16a";
let arc = new Arcadians(testMode, testAddress);

function onUserSelect(selectedNft) {
  link = selectedNft.image;
  const game = new Phaser.Game(config);
  game.scene.start("SampleGame", link)
}

arc.showNftsWindow(onUserSelect);