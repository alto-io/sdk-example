import background from "./assets/background.png";
import { arc } from "./index";

export default class Home extends Phaser.Scene {
  constructor() {
    super("Home");
    this.leaderboardWindowElements = [];
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

  createLeaderboardWindow(leaderboardData) {
    let modal = document.createElement("div");
    this.leaderboardWindowElements.push(modal);
    document.body.appendChild(modal);
    modal.id = "modal";
    modal.style.position = "fixed";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.flexWrap = "wrap";
    modal.style.zIndex = "999";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0,0,0,0.25)";

    let content = document.createElement("div");
    this.leaderboardWindowElements.push(content);
    modal.appendChild(content);
    content.id = "content";
    content.style.position = "fixed";
    content.style.display = "flex";
    content.style.alignItems = "center";
    content.style.justifyContent = "center";
    //content.style.flexWrap = "wrap";
    content.style.flexDirection = "column";
    content.style.width = "90%";
    content.style.height = "90%";
    content.style.overflow = "auto";
    content.style.backgroundColor = "rgba(255,255,255,0.75)";
    content.style.boxShadow = "0 0 0.125rem 0.125rem rgba(128,128,128,0.5)";
    content.style.borderRadius = "0.5rem";
    content.style.paddingTop = "2rem";

    let close = document.createElement("div");
    this.leaderboardWindowElements.push(close);
    modal.appendChild(close);
    close.id = "close";
    close.style.position = "absolute";
    close.style.left = "5%";
    close.style.top = "calc(5% - 1rem)";
    close.style.transform = "translate(-50%, -50%)";

    close.style.width = "2rem";
    close.style.height = "2rem";
    close.style.backgroundColor = "#D21404";
    close.style.boxShadow = "0 0 0.125rem 0.125rem rgba(128,128,128,0.5)";
    close.style.borderRadius = "0.5rem";
    close.style.color = "#900D09";
    close.textContent = "\u00D7";
    close.style.fontSize = "1.75rem";
    close.style.fontWeight = "bold";
    close.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
    close.style.textAlign = "center";
    close.style.cursor = "pointer";
    close.style.userSelect = "none";
    close.style.transition = "0.25s";

    close.addEventListener("pointerdown", () => {
      this.deleteLeaderboardWindow();
    });

    close.addEventListener("pointerover", () => {
      close.style.boxShadow = "0 0 0.25rem 0.25rem rgba(210,20,4,0.5)";
    });

    close.addEventListener("pointerout", () => {
      close.style.boxShadow = "0 0 0.125rem 0.125rem rgba(128,128,128,0.5)";
    });

    if (Array.isArray(leaderboardData) === true) {
      for (let i = 0; i < leaderboardData.length; i++) {
        let card = document.createElement("div");
        this.leaderboardWindowElements.push(card);
        content.appendChild(card);
        card.id = "card-content" + i;
        card.style.display = "flex";
        card.style.justifyContent = "center";
        card.style.alignItems = "center";
        card.style.flexDirection = "column";
        card.style.borderRadius = "0.5rem";
        card.style.transition = "0.25s";
        card.style.boxShadow = "0 0 0.125rem 0.125rem rgba(128,128,128,0.5)";
        card.style.margin = "1rem";
        card.style.backgroundColor = "#F5F5F5";

        let playerCenter = document.createElement("div");
        this.leaderboardWindowElements.push(playerCenter);
        card.appendChild(playerCenter);
        playerCenter.id = "player-center" + i;
        playerCenter.style.display = "flex";
        playerCenter.style.justifyContent = "center";
        playerCenter.style.alignItems = "center";
        playerCenter.style.flexDirection = "column";
        playerCenter.style.width = "100%";
        playerCenter.style.height = "25%";

        let player = document.createElement("div");
        this.leaderboardWindowElements.push(player);
        playerCenter.appendChild(player);
        player.id = "player" + i;
        player.textContent = leaderboardData[i].player_address;
        player.style.fontSize = "1rem";
        player.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
        player.style.color = "#808080";

        let contractAddressCenter = document.createElement("div");
        this.leaderboardWindowElements.push(contractAddressCenter);
        card.appendChild(contractAddressCenter);
        contractAddressCenter.id = "contractAddress-center" + i;
        contractAddressCenter.style.display = "flex";
        contractAddressCenter.style.justifyContent = "center";
        contractAddressCenter.style.alignItems = "center";
        contractAddressCenter.style.width = "100%";
        contractAddressCenter.style.height = "25%";

        let contractAddress = document.createElement("div");
        this.leaderboardWindowElements.push(contractAddress);
        contractAddressCenter.appendChild(contractAddress);
        contractAddress.id = "contractAddress" + i;
        contractAddress.textContent = leaderboardData[i].contract_address;
        contractAddress.style.fontSize = "1rem";
        contractAddress.style.fontFamily =
          "'Roboto', Arial, Helvetica, sans-serif";
        contractAddress.style.color = "#808080";

        let tokenIdCenter = document.createElement("div");
        this.leaderboardWindowElements.push(tokenIdCenter);
        card.appendChild(tokenIdCenter);
        tokenIdCenter.id = "tokenId-center" + i;
        tokenIdCenter.style.display = "flex";
        tokenIdCenter.style.justifyContent = "center";
        tokenIdCenter.style.alignItems = "center";
        tokenIdCenter.style.width = "100%";
        tokenIdCenter.style.height = "25%";

        let tokenId = document.createElement("div");
        this.leaderboardWindowElements.push(tokenId);
        tokenIdCenter.appendChild(tokenId);
        tokenId.id = "tokenId" + i;
        tokenId.textContent = leaderboardData[i].token_id;
        tokenId.style.fontSize = "1rem";
        tokenId.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
        tokenId.style.color = "#808080";

        let scoreCenter = document.createElement("div");
        this.leaderboardWindowElements.push(scoreCenter);
        card.appendChild(scoreCenter);
        scoreCenter.id = "score-center" + i;
        scoreCenter.style.display = "flex";
        scoreCenter.style.justifyContent = "center";
        scoreCenter.style.alignItems = "center";
        scoreCenter.style.width = "100%";
        scoreCenter.style.height = "25%";

        let score = document.createElement("div");
        this.leaderboardWindowElements.push(score);
        scoreCenter.appendChild(score);
        score.id = "score" + i;
        score.textContent = leaderboardData[i].score;
        score.style.fontSize = "1rem";
        score.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
        score.style.color = "#808080";
      }
    }
  }

  deleteLeaderboardWindow() {
    for (let i = 0; i < this.leaderboardWindowElements.length; i++) {
      this.leaderboardWindowElements[i].parentElement.removeChild(
        this.leaderboardWindowElements[i]
      );
    }
    this.leaderboardWindowElements.length = 0;
    this.leaderboardWindowOpen = false;
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

    let dummyData = [
      {
        created_at: "2022-02-21T21:58:07.332Z",
        player_address: "0x4cb6459930f30b7ca63a37d7075d85d670c97e1e",
        contract_address: "0xc3c8a1e1ce5386258176400541922c414e1b35fd",
        token_id: "14",
        score: 9999,
      },
      {
        created_at: "2022-02-22T10:39:33.860Z",
        player_address: "0x4cb6459930f30b7ca63a37d7075d85d670c97e1e",
        contract_address: "0xc3c8a1e1ce5386258176400541922c414e1b35fd",
        token_id: "14",
        score: 9999,
      },
      {
        created_at: "2022-02-22T11:18:51.779Z",
        player_address: "0x4cb6459930f30b7ca63a37d7075d85d670c97e1e",
        contract_address: "0xc3c8a1e1ce5386258176400541922c414e1b35fd",
        token_id: "14",
        score: 9999,
      },
      {
        created_at: "2022-02-21T21:46:06.603Z",
        player_address: "0x4cb6459930f30b7ca63a37d7075d85d670c97e1e",
        contract_address: "0xc3c8a1e1ce5386258176400541922c414e1b35fd",
        token_id: "14",
        score: 9999,
      },
      {
        created_at: "2022-02-22T10:36:49.144Z",
        player_address: "0x4cb6459930f30b7ca63a37d7075d85d670c97e1e",
        contract_address: "0xc3c8a1e1ce5386258176400541922c414e1b35fd",
        token_id: "14",
        score: 9999,
      },
      {
        created_at: "2022-02-23T16:10:23.220Z",
        player_address: "0x4cb6459930f30b7ca63a37d7075d85d670c97e1e",
        contract_address: "0xc3c8a1e1ce5386258176400541922c414e1b35fd",
        token_id: "14",
        score: 9999,
      },
      {
        created_at: "2022-02-23T16:11:32.167Z",
        player_address: "0x4cb6459930f30b7ca63a37d7075d85d670c97e1e",
        contract_address: "0xc3c8a1e1ce5386258176400541922c414e1b35fd",
        token_id: "14",
        score: 9999,
      },
      {
        created_at: "2022-02-22T11:18:29.072Z",
        player_address: "0x4cb6459930f30b7ca63a37d7075d85d670c97e1e",
        contract_address: "0xc3c8a1e1ce5386258176400541922c414e1b35fd",
        token_id: "14",
        score: 9999,
      },
      {
        created_at: "2022-02-22T10:44:07.205Z",
        player_address: "0x4cb6459930f30b7ca63a37d7075d85d670c97e1e",
        contract_address: "0xc3c8a1e1ce5386258176400541922c414e1b35fd",
        token_id: "14",
        score: 9999,
      },
      {
        created_at: "2022-02-21T16:16:58.783Z",
        player_address: "0x4cb6459930f30b7ca63a37d7075d85d670c97e1e",
        contract_address: "0xc3c8a1e1ce5386258176400541922c414e1b35fd",
        token_id: "14",
        score: 9999,
      },
    ];

    this.createLeaderboardWindow(dummyData);
  }

  update() {}
}
