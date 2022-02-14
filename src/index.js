import Phaser from "phaser";
import { arc, Home } from "./home";
import Game from "./game";
import End from "./end";

import Leaderboard from './leaderboard'

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

//const leaderboard = new Leaderboard(arc);