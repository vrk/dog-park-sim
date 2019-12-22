class Player extends BasePlayer {
  constructor(context, x, y) {
    super(context, x, y);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    document.addEventListener('keyup', this.onKeyUp);
    document.addEventListener('keydown', this.onKeyDown);

    this.arrowsPressed = [];

    this.prevDir = null;
    this.prevXVelocity = null;
    this.prevYVelocity = null;

    this.needsUpdate = true;
  }

  update() {
    const prevX = this.x;
    const prevY = this.y;

    super.update();

    this.needsUpdate |= prevX !== this.x || prevY !== this.y;
    if (this.needsUpdate) {
      this.needsUpdate = false;
    }
  }

  changeLook() {
    this.selectedCharacter = (this.selectedCharacter + 1) % this.characters.length;
  }

  sitRight() {
    this.direction = SIT_RIGHT;
    this.needsUpdate = true;
  }

  // Private
  onKeyDown(event) {
    const key = event.key;

    const prevX = this.x;
    const prevY = this.y;
    const prevDir = this.direction;

    if (key === 'ArrowLeft') {
      this.xVelocity = -PLAYER_PX_UPDATES_PER_TICK;
      this.arrowsPressed.push(key);
      this.direction = MOVE_LEFT;
    } else if (key === 'ArrowRight') {
      this.xVelocity = PLAYER_PX_UPDATES_PER_TICK;
      this.arrowsPressed.push(key);
      this.direction = MOVE_RIGHT;
    } else if (key === 'ArrowDown') {
      this.yVelocity = PLAYER_PX_UPDATES_PER_TICK;
      this.arrowsPressed.push(key);
      this.direction = MOVE_DOWN;
    } else if (key === 'ArrowUp') {
      this.yVelocity = -PLAYER_PX_UPDATES_PER_TICK;
      this.arrowsPressed.push(key);
      this.direction = MOVE_UP;
    }
    this.needsUpdate |= prevX !== this.x || prevY !== this.y || prevDir !== this.direction;
  }

  onKeyUp(event) {
    const key = event.key;
    this.arrowsPressed = this.arrowsPressed.filter(element => element !== key);
    const prevX = this.xVelocity;
    const prevY = this.yVelocity;
    if (!this.arrowsPressed.includes('ArrowLeft') && !this.arrowsPressed.includes('ArrowRight')) {
      this.xVelocity = 0;
    }
    if (!this.arrowsPressed.includes('ArrowDown') && !this.arrowsPressed.includes('ArrowUp')) {
      this.yVelocity = 0;
    }
    this.needsUpdate |= prevX !== this.xVelocity || prevY !== this.yVelocity;
  }
}
