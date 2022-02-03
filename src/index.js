import Phaser from "phaser";
import Home from "./home";
import Game from "./game";
import End from "./end";

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