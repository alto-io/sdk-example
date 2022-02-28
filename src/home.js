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
    content.style.flexDirection = "column";
    content.style.width = "90%";
    content.style.height = "90%";
    content.style.overflow = "auto";
    content.style.backgroundColor = "rgba(255,255,255,0.75)";
    content.style.boxShadow = "0 0 0.125rem 0.125rem rgba(128,128,128,0.5)";
    content.style.borderRadius = "0.5rem";

    let close = document.createElement("div");
    this.leaderboardWindowElements.push(close);
    modal.appendChild(close);
    close.id = "close";
    close.style.position = "absolute";
    close.style.left = "5%";
    close.style.top = "5%";
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
        let cardContainer = document.createElement("div");
        this.leaderboardWindowElements.push(cardContainer);
        content.appendChild(cardContainer);
        cardContainer.id = "cardContainer-content" + i;
        cardContainer.style.display = "flex";
        cardContainer.style.justifyContent = "center";
        cardContainer.style.alignItems = "center";
        cardContainer.style.borderRadius = "0.5rem";
        cardContainer.style.boxShadow =
          "0 0 0.125rem 0.125rem rgba(128,128,128,0.5)";
        cardContainer.style.margin = "1rem";
        cardContainer.style.backgroundColor = "#F5F5F5";

        let cardLeft = document.createElement("div");
        this.leaderboardWindowElements.push(cardLeft);
        cardContainer.appendChild(cardLeft);
        cardLeft.id = "cardLeft-content" + i;
        cardLeft.style.display = "flex";
        cardLeft.style.justifyContent = "center";
        cardLeft.style.alignItems = "center";
        cardLeft.style.flexDirection = "column";
        cardLeft.style.padding = "1rem";

        let playerLeftCenter = document.createElement("div");
        this.leaderboardWindowElements.push(playerLeftCenter);
        cardLeft.appendChild(playerLeftCenter);
        playerLeftCenter.id = "playerLeft-center" + i;
        playerLeftCenter.style.display = "flex";
        playerLeftCenter.style.justifyContent = "flex-start";
        playerLeftCenter.style.alignItems = "center";
        playerLeftCenter.style.width = "100%";
        playerLeftCenter.style.height = "25%";

        let playerLeft = document.createElement("div");
        this.leaderboardWindowElements.push(playerLeft);
        playerLeftCenter.appendChild(playerLeft);
        playerLeft.id = "playerLeft" + i;
        playerLeft.textContent = "PLAYER ADDRESS:";
        playerLeft.style.fontSize = "1rem";
        playerLeft.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
        playerLeft.style.color = "#808080";

        let contractAddressLeftCenter = document.createElement("div");
        this.leaderboardWindowElements.push(contractAddressLeftCenter);
        cardLeft.appendChild(contractAddressLeftCenter);
        contractAddressLeftCenter.id = "contractAddressLeft-center" + i;
        contractAddressLeftCenter.style.display = "flex";
        contractAddressLeftCenter.style.justifyContent = "flex-start";
        contractAddressLeftCenter.style.alignItems = "center";
        contractAddressLeftCenter.style.width = "100%";
        contractAddressLeftCenter.style.height = "25%";

        let contractAddressLeft = document.createElement("div");
        this.leaderboardWindowElements.push(contractAddressLeft);
        contractAddressLeftCenter.appendChild(contractAddressLeft);
        contractAddressLeft.id = "contractAddressLeft" + i;
        contractAddressLeft.textContent = "CONTRACT ADDRESS:";
        contractAddressLeft.style.fontSize = "1rem";
        contractAddressLeft.style.fontFamily =
          "'Roboto', Arial, Helvetica, sans-serif";
        contractAddressLeft.style.color = "#808080";

        let tokenIdLeftCenter = document.createElement("div");
        this.leaderboardWindowElements.push(tokenIdLeftCenter);
        cardLeft.appendChild(tokenIdLeftCenter);
        tokenIdLeftCenter.id = "tokenIdRight-center" + i;
        tokenIdLeftCenter.style.display = "flex";
        tokenIdLeftCenter.style.justifyContent = "flex-start";
        tokenIdLeftCenter.style.alignItems = "center";
        tokenIdLeftCenter.style.width = "100%";
        tokenIdLeftCenter.style.height = "25%";

        let tokenIdLeft = document.createElement("div");
        this.leaderboardWindowElements.push(tokenIdLeft);
        tokenIdLeftCenter.appendChild(tokenIdLeft);
        tokenIdLeft.id = "tokenIdLeft" + i;
        tokenIdLeft.textContent = "TOKEN ID:";
        tokenIdLeft.style.fontSize = "1rem";
        tokenIdLeft.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
        tokenIdLeft.style.color = "#808080";

        let scoreLeftCenter = document.createElement("div");
        this.leaderboardWindowElements.push(scoreLeftCenter);
        cardLeft.appendChild(scoreLeftCenter);
        scoreLeftCenter.id = "scoreLeft-center" + i;
        scoreLeftCenter.style.display = "flex";
        scoreLeftCenter.style.justifyContent = "flex-start";
        scoreLeftCenter.style.alignItems = "center";
        scoreLeftCenter.style.width = "100%";
        scoreLeftCenter.style.height = "25%";

        let scoreLeft = document.createElement("div");
        this.leaderboardWindowElements.push(scoreLeft);
        scoreLeftCenter.appendChild(scoreLeft);
        scoreLeft.id = "scoreRight" + i;
        scoreLeft.textContent = "SCORE:";
        scoreLeft.style.fontSize = "1rem";
        scoreLeft.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
        scoreLeft.style.color = "#808080";

        let cardRight = document.createElement("div");
        this.leaderboardWindowElements.push(cardRight);
        cardContainer.appendChild(cardRight);
        cardRight.id = "cardRight-content" + i;
        cardRight.style.display = "flex";
        cardRight.style.justifyContent = "center";
        cardRight.style.alignItems = "center";
        cardRight.style.flexDirection = "column";
        cardRight.style.padding = "1rem";

        let playerRightCenter = document.createElement("div");
        this.leaderboardWindowElements.push(playerRightCenter);
        cardRight.appendChild(playerRightCenter);
        playerRightCenter.id = "playerRight-center" + i;
        playerRightCenter.style.display = "flex";
        playerRightCenter.style.justifyContent = "flex-start";
        playerRightCenter.style.alignItems = "center";
        playerRightCenter.style.width = "100%";
        playerRightCenter.style.height = "25%";

        let playerRight = document.createElement("div");
        this.leaderboardWindowElements.push(playerRight);
        playerRightCenter.appendChild(playerRight);
        playerRight.id = "playerRight" + i;
        playerRight.textContent = leaderboardData[i].player_address;
        playerRight.style.fontSize = "1rem";
        playerRight.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
        playerRight.style.color = "#808080";

        let ccontractAddressRightCenter = document.createElement("div");
        this.leaderboardWindowElements.push(ccontractAddressRightCenter);
        cardRight.appendChild(ccontractAddressRightCenter);
        ccontractAddressRightCenter.id = "contractAddressRight-center" + i;
        ccontractAddressRightCenter.style.display = "flex";
        ccontractAddressRightCenter.style.justifyContent = "flex-start";
        ccontractAddressRightCenter.style.alignItems = "center";
        ccontractAddressRightCenter.style.width = "100%";
        ccontractAddressRightCenter.style.height = "25%";

        let contractAddressRight = document.createElement("div");
        this.leaderboardWindowElements.push(contractAddressRight);
        ccontractAddressRightCenter.appendChild(contractAddressRight);
        contractAddressRight.id = "contractAddressRight" + i;
        contractAddressRight.textContent = leaderboardData[i].contract_address;
        contractAddressRight.style.fontSize = "1rem";
        contractAddressRight.style.fontFamily =
          "'Roboto', Arial, Helvetica, sans-serif";
        contractAddressRight.style.color = "#808080";

        let tokenIdRightCenter = document.createElement("div");
        this.leaderboardWindowElements.push(tokenIdRightCenter);
        cardRight.appendChild(tokenIdRightCenter);
        tokenIdRightCenter.id = "tokenIdRight-center" + i;
        tokenIdRightCenter.style.display = "flex";
        tokenIdRightCenter.style.justifyContent = "flex-start";
        tokenIdRightCenter.style.alignItems = "center";
        tokenIdRightCenter.style.width = "100%";
        tokenIdRightCenter.style.height = "25%";

        let tokenIdRight = document.createElement("div");
        this.leaderboardWindowElements.push(tokenIdRight);
        tokenIdRightCenter.appendChild(tokenIdRight);
        tokenIdRight.id = "tokenIdRight" + i;
        tokenIdRight.textContent = leaderboardData[i].token_id;
        tokenIdRight.style.fontSize = "1rem";
        tokenIdRight.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
        tokenIdRight.style.color = "#808080";

        let scoreRightCenter = document.createElement("div");
        this.leaderboardWindowElements.push(scoreRightCenter);
        cardRight.appendChild(scoreRightCenter);
        scoreRightCenter.id = "scoreRight-center" + i;
        scoreRightCenter.style.display = "flex";
        scoreRightCenter.style.justifyContent = "flex-start";
        scoreRightCenter.style.alignItems = "center";
        scoreRightCenter.style.width = "100%";
        scoreRightCenter.style.height = "25%";

        let scoreRight = document.createElement("div");
        this.leaderboardWindowElements.push(scoreRight);
        scoreRightCenter.appendChild(scoreRight);
        scoreRight.id = "scoreRight" + i;
        scoreRight.textContent = leaderboardData[i].score;
        scoreRight.style.fontSize = "1rem";
        scoreRight.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";
        scoreRight.style.color = "#808080";
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

    this.leaderboardButton = this.add.text(
      this.game.scale.width * 0.5,
      this.game.scale.height * 0.8,
      "LEADERBOARD",
      {
        fill: "#FFFFFF",
        fontSize: "80px",
        stroke: "#000000",
        strokeThickness: 8,
      }
    );
    this.leaderboardButton.setOrigin(0.5, 0.5);
    this.leaderboardButton.setInteractive({ useHandCursor: true });
    this.leaderboardButton.on("pointerdown", this.leadearboardCallback, this);
  }

  async leadearboardCallback() {
    const leadearboardData = await arc.fetchLeaderboard();
    this.createLeaderboardWindow(leadearboardData);
  }

  update() {}
}
