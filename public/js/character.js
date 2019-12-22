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
      case SIT_RIGHT:
        chosen = this.sitRightSprite || this.downSprite;
      break;
    }
    if (chosen && chosen !== this.sprite) {
      this.sprite = chosen;

      if (direction === SIT_RIGHT) {
        this.sprite.startSpecial();
      }
    }
    if (direction === SIT_RIGHT) {
      this.sprite.updateSit();
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

    this.sitRightSprite = new Sprite(context, width, height, x, y + height * 5, 4, image);
  }
}
