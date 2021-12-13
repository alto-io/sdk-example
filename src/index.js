import { ethers } from "ethers";
import axios from "axios";
import Phaser from "phaser";
import background from "./assets/background.png";
import spike from "./assets/spike.png";

if (typeof window.ethereum !== "undefined") {
  let connectButton = document.createElement("button");
  connectButton.setAttribute("id", "connectButton");
  connectButton.innerHTML = "Connect";
  document.body.appendChild(connectButton);

  let renderAddress = document.createElement("div");
  renderAddress.setAttribute("id", "renderAddress");
  renderAddress.innerHTML = "Please connect first!";
  document.body.appendChild(renderAddress);

  let renderNetwork = document.createElement("div");
  renderNetwork.setAttribute("id", "renderNetwork");
  renderNetwork.innerHTML = "Check network";
  document.body.appendChild(renderNetwork);

  let address;

  let myAvatar = document.createElement("img");
  document.body.appendChild(myAvatar);

  function setNetwork(networkId) {
    const networks = [
      "Ethereum Main Network (Mainnet)",
      "Ropsten Test Network",
      "Rinkeby Test Network",
      "Goerli Test Network",
      "Kovan Test Network",
    ];

    if (networkId === "0x1") {
      return networks[0];
    }

    if (networkId === "0x3") {
      return networks[1];
    }

    if (networkId === "0x4") {
      return networks[2];
    }

    if (networkId === "0x5") {
      return networks[3];
    }

    if (networkId === "0x2a") {
      return networks[4];
    }

    return "Undetected";
  }

  connectButton.addEventListener("click", () => {
    getAddress();
  });

  async function getAddress() {
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((result) => {
        address = result;
        renderAddress.innerHTML = result;
        axios
          .get(
            "https://api.arcadians.io/" + Math.floor(1 + Math.random() * 2999)
          )
          .then((result) => {
            console.log(result.data.image);
            myAvatar.setAttribute("src", result.data.image);
            myAvatar.setAttribute("width", "200px");
            myAvatar.setAttribute("height", "200px");

            class SampleGame extends Phaser.Scene {
              constructor() {
                super("SampleGame");
              }

              preload() {
                this.load.image("background", background);
                this.load.image("spike", spike);
                this.load.image("useAvatar", myAvatar.src);
              }

              fly() {
                this.currentAvatar.body.velocity.y = -300;
              }

              getRightmostSpike() {
                let rightmostSpike = 0;
                this.spikeGroup.getChildren().forEach(function (spike) {
                  rightmostSpike = Math.max(rightmostSpike, spike.x);
                });
                return rightmostSpike;
              }

              placeSpikes(addScore) {
                let rightmost = this.getRightmostSpike();
                let spikeHolePosition = Phaser.Math.Between(-100, 100);
                this.spikePool[0].x =
                  rightmost +
                  this.spikePool[0].getBounds().width +
                  Phaser.Math.Between(220, 280);
                this.spikePool[0].y = 0 + spikeHolePosition;
                this.spikePool[0].setOrigin(0.5, 0.5);
                this.spikePool[0].scaleY = -1;
                this.spikePool[1].x = this.spikePool[0].x;
                this.spikePool[1].y =
                  this.game.scale.height + spikeHolePosition;
                this.spikePool[1].setOrigin(0.5, 0.5);
                this.spikePool = [];
                if (addScore) {
                  //this.updateScore(1);
                }
              }

              create() {
                this.backgroundImage = this.add.image(
                  this.game.scale.width * 0.5,
                  this.game.scale.height * 0.5,
                  "background"
                );

                this.currentAvatar = this.physics.add.sprite(
                  this.game.scale.width * 0.5,
                  this.game.scale.height * 0.5,
                  "useAvatar"
                );
                this.currentAvatar.body.gravity.y = 800;
                this.currentAvatar.setOrigin(0.5, 0.5);
                this.currentAvatar.setScale(0.2, 0.2);
                this.input.on("pointerdown", this.fly, this);

                /* let downSpike = this.add.image(
                  this.game.scale.width * 0.8,
                  this.game.scale.height * 1,
                  "spike"
                );

                this.topSpike = this.add.image(
                  this.game.scale.width * 0.8,
                  this.game.scale.height * 0,
                  "spike"
                );

                this.topSpike.setRotation(Math.PI); */

                this.spikeGroup = this.physics.add.group();
                this.spikePool = [];
                for (let i = 0; i < 4; i++) {
                  this.spikePool.push(this.spikeGroup.create(0, 0, "spike"));
                  this.spikePool.push(this.spikeGroup.create(0, 0, "spike"));
                  this.placeSpikes(false);
                }
                this.spikeGroup.setVelocityX(-125);
              }

              update() {
                this.spikeGroup.getChildren().forEach(function (spike) {
                  if (spike.getBounds().right < 0) {
                    this.spikePool.push(spike);
                    if (this.spikePool.length == 2) {
                      this.placeSpikes(true);
                    }
                  }
                }, this);
              }
            }

            const config = {
              type: Phaser.AUTO,
              backgroundColor: 0xd595f3,
              parent: "sample-game",
              width: 400,
              height: 400,
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

            const game = new Phaser.Game(config);
          });
      })
      .catch((result) => {
        renderAddress.innerHTML = result.message;
        console.log(result);
      });
    const chainId = await ethereum.request({ method: "eth_chainId" });
    console.log(chainId);
    renderNetwork.innerHTML = setNetwork(chainId);
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  ethereum.on("accountsChanged", (accounts) => {
    if (accounts.length === 0) {
      renderAddress.innerHTML = "Disconnected";
      renderNetwork.innerHTML = "Undetected";
      window.location.reload();
    } else {
      renderAddress.innerHTML = accounts[0];
      ethereum.request({ method: "eth_chainId" }).then((chainId) => {
        renderNetwork.innerHTML = setNetwork(chainId);
      });
    }
  });

  ethereum.on("chainChanged", (chainId) => {
    renderNetwork.innerHTML = setNetwork(chainId);
    window.location.reload();
  });
} else {
  alert("Please install MetaMask!");
}
