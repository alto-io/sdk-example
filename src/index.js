import Phaser from "phaser";
import Arcadians from "arcadians-client-sdk";
import  Home from "./home";
import Game from "./game";
import End from "./end";

const testMode = false;
const testAddress = "0xf0103243f4d22b5696588646b21313d85916a16a";
const nftsLimit = 50;
const gameId = "0cd69241-531c-4698-bf17-454dd6cb1ab4";
const apiUrl = "https://lb-dev.gmfrens.games";

export const arc = new Arcadians(testMode, testAddress, nftsLimit, gameId, apiUrl);

const config = {
  type: Phaser.AUTO,
  backgroundColor: 0xd595f3,
  parent: "sample-game",
  width: 800,
  height: 800,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Home, Game, End],
};

const game = new Phaser.Game(config);
game.scene.start("Home");