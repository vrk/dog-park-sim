// Base class
class Character {
  update(direction) {
    let chosen = null;
    switch (direction) {
      case MOVE_DOWN:
        chosen = this.downSprite;
      break;
      case MOVE_UP:
        chosen = this.upSprite;
      break;
      case MOVE_LEFT:
        chosen = this.leftSprite;
      break;
      case MOVE_RIGHT:
        chosen = this.rightSprite;
      break;

      case STILL_DOWN:
        chosen = this.downStillSprite;
      break;
      case STILL_UP:
        chosen = this.upStillSprite;
      break;
      case STILL_LEFT:
        chosen = this.leftStillSprite;
      break;
      case STILL_RIGHT:
        chosen = this.rightStillSprite;
      break;

      case RUN_RIGHT:
        chosen = this.runRightSprite;
      break;

      case SIT_LEFT:
        chosen = this.sitLeftSprite;
      break;
      case SIT_RIGHT:
        chosen = this.sitRightSprite;
      break;
      case SIT_DOWN:
        chosen = this.sitDownSprite;
      break;

      case SLEEP:
        chosen = this.sleepSprite;
      break;
    }
    if (chosen && chosen !== this.sprite) {
      this.sprite = chosen;

      if (SIT_DIRS.includes(direction)) {
        this.sprite.startSpecial();
      }
    }
    if (SIT_DIRS.includes(direction)) {
      this.sprite.updateSit();
    } else if (direction === SLEEP) {
      this.sprite.updateSleep();
    } else {
      this.sprite.update();
    }
  }

  render(x, y) {
    this.sprite.render(x, y);
  }
}

class Dog extends Character {
  constructor(context, imageSrc, width=64, height=64, x=0, y=8) {
    super();
    const image = new Image();
    image.src = imageSrc;
    this.downSprite = new Sprite(context, width, height, x, y, 4, image);
    this.rightSprite = new Sprite(context, width, height, x, y + height * 1, 4, image);
    this.upSprite = new Sprite(context, width, height, x, y + height * 2, 4, image);
    this.leftSprite = new Sprite(context, width, height, x, y + height * 3, 4, image);

    this.downStillSprite = new Sprite(context, width, height, x, y, 1, image);
    this.rightStillSprite = new Sprite(context, width, height, x, y + height * 1, 1, image);
    this.upStillSprite = new Sprite(context, width, height, x, y + height * 2, 1, image);
    this.leftStillSprite = new Sprite(context, width, height, x, y + height * 3, 1, image);

    this.runRightSprite = new Sprite(context, width, height, x, y + height * 8, 2, image);

    this.sitRightSprite = new Sprite(context, width, height, x, y + height * 5, 4, image);
    this.sitDownSprite = new Sprite(context, width, height, x, y + height * 4, 4, image);
    this.sitLeftSprite = new Sprite(context, width, height, x, y + height * 9, 4, image);

    this.sleepSprite = new Sprite(context, width, height, x, y + height * 7, 2, image);
  }
}
