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
    startLogin();
  });

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const abi = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [],
      name: "MAX_ENTRIES",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address[]", name: "entries", type: "address[]" },
        { internalType: "bool", name: "isOG", type: "bool" },
      ],
      name: "addToPresale",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "baseURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_num", type: "uint256" }],
      name: "buy",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "buysPerAddress",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "getApproved",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "operator", type: "address" },
      ],
      name: "isApprovedForAll",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxBuysPerAddress",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxMint",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxPrebuysPerAddress",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxPresaleMint",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxTotalPresale",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_to", type: "address" }],
      name: "ogEligible",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "ogPrice",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "ownerOf",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "prebuysPerAddress",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_num", type: "uint256" }],
      name: "presale",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "presalePaused",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "price",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
        { internalType: "bytes", name: "_data", type: "bytes" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "salePaused",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_to", type: "address" },
        { internalType: "uint256", name: "_num", type: "uint256" },
      ],
      name: "seedPromo",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_num", type: "uint256" }],
      name: "seedPromoToOwner",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "operator", type: "address" },
        { internalType: "bool", name: "approved", type: "bool" },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "val", type: "uint256" }],
      name: "setMaxMint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "val", type: "uint256" }],
      name: "setMaxPrebuysPerAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "val", type: "uint256" }],
      name: "setMaxPresale",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bool", name: "val", type: "bool" }],
      name: "setPresalePauseStatus",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bool", name: "val", type: "bool" }],
      name: "setSalePauseStatus",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "baseURI", type: "string" }],
      name: "setURI",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
      name: "tokenByIndex",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "uint256", name: "index", type: "uint256" },
      ],
      name: "tokenOfOwnerByIndex",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "tokenURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_to", type: "address" }],
      name: "whitelistEligible",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const contractAddress = "0xc3C8A1E1cE5386258176400541922c414e1B35Fd";
  const erc721 = new ethers.Contract(contractAddress, abi, provider);

  async function findOwnedNFTs() {
    const chainId = await ethereum.request({ method: "eth_chainId" });
    renderNetwork.innerHTML = setNetwork(chainId);

    let accounts = await provider.listAccounts();
    let address = accounts[0];
    renderAddress.innerHTML = address;

    let ownedNFTs = await erc721.balanceOf(address);
    let ownedNFTsDecimal = parseInt(ownedNFTs._hex, 16);

    if (ownedNFTsDecimal <= 0) {
      console.log("You don't own any NFTs!");
      return;
    } else {
      console.log(`You own ${ownedNFTsDecimal} NFT(s) !`);
    }

    let tokenImageData = [];

    for (let i = 0; i < ownedNFTsDecimal; i++) {
      let currentToken = await erc721.tokenOfOwnerByIndex(address, i);
      let currentTokenId = parseInt(currentToken._hex, 16);
      let currentTokenURI = await erc721.tokenURI(currentTokenId);
      console.log(
        `Loading token ${
          i + 1
        } of ${ownedNFTsDecimal} with the id ${currentTokenId}`
      );

      let currentMetadata = await axios.get(currentTokenURI);

      tokenImageData.push(currentMetadata.data.image);

      let currentAvatar = document.createElement("img");
      document.body.appendChild(currentAvatar);
      currentAvatar.setAttribute("src", currentMetadata.data.image);
      currentAvatar.setAttribute("width", "200px");
      currentAvatar.setAttribute("height", "200px");
    }

    console.log(tokenImageData);
  }


  async function startLogin() {
    ethereum.request({ method: "eth_requestAccounts" }).then(() => {
      connectButton.style.display = "none";
      findOwnedNFTs();
    });
  }

  async function getAddress() {
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((result) => {
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

            /*            class SampleGame extends Phaser.Scene {
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
                  this.updateScore(1);
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

                let downSpike = this.add.image(
                  this.game.scale.width * 0.8,
                  this.game.scale.height * 1,
                  "spike"
                );

                this.topSpike = this.add.image(
                  this.game.scale.width * 0.8,
                  this.game.scale.height * 0,
                  "spike"
                );

                this.topSpike.setRotation(Math.PI);

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

            const game = new Phaser.Game(config);*/
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
