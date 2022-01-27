import background from "./assets/background.png";
import spike from "./assets/spike.png";

export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }
    
    init(imageLink) {
      this.imageLink = imageLink;
    }

  preload() {
    this.load.image("background", background);
    this.load.image("spike", spike);
    this.load.image("selectedAvatar", this.imageLink);
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
    this.spikePool[1].y = this.game.scale.height + spikeHolePosition;
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
      "selectedAvatar"
    );
    this.currentAvatar.body.gravity.y = 800;
    this.currentAvatar.setOrigin(0.5, 0.5);
    this.currentAvatar.setScale(0.2, 0.2);
    this.input.on("pointerdown", this.fly, this);

    this.downSpike = this.add.image(
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

    if (this.currentAvatar.y > this.game.scale.height) {
      location.reload();
    }

  }
}
