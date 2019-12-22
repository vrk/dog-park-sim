/* global MOVE_DOWN, Bijou, Boss, CANVAS_WIDTH,CANVAS_HEIGHT  */

class BasePlayer {
  constructor(context, initialX = 0, initialY = 0, initialDir = MOVE_DOWN, selectedCharacter = 0) {
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.x = initialX;
    this.y = initialY;

    this.context = context;
    this.characters = createDogSprites();
    this.selectedCharacter = selectedCharacter;
    this.direction = initialDir;
    this.dataChannels = [];
  }

  updateWrapAround() {
    if (this.x > CANVAS_WIDTH) {
      this.x = OFFSCREEN_FUDGEROOM;
    }
    if (this.x < OFFSCREEN_FUDGEROOM) {
      this.x = CANVAS_WIDTH;
    }
    if (this.y > CANVAS_HEIGHT) {
      this.y = OFFSCREEN_FUDGEROOM;
    }
    if (this.y < OFFSCREEN_FUDGEROOM) {
      this.y = CANVAS_HEIGHT;
    }
  }

  update() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    this.updateWrapAround();
    this.characters[this.selectedCharacter].update(this.direction);
  }

  render() {
    this.characters[this.selectedCharacter].render(this.x, this.y);
  }
}
