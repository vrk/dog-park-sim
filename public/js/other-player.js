class OtherPlayer extends BasePlayer {
  constructor(context, initialX, initialY, initialDir, selectedCharacter) {
    super(context, initialX, initialY, initialDir, selectedCharacter);
    this.goalX = initialX;
    this.goalY = initialY;
    this.goalDirection = initialDir;

    this.pxPerTick = 1;
  }
  
  move(deltaX, deltaY) {
    this.goalX = Math.floor(this.x + deltaX);
    this.goalY = Math.floor(this.y + deltaY);
    this.goalX -= this.goalX % this.pxPerTick;
    this.goalY -= this.goalY % this.pxPerTick;
    this.updateGoalWrapAround();
  }

  updateGoalWrapAround() {
    if (this.goalX > CANVAS_WIDTH) {
      this.goalX = OFFSCREEN_FUDGEROOM;
    }
    if (this.goalX < OFFSCREEN_FUDGEROOM) {
      this.goalX = CANVAS_WIDTH;
    }
    if (this.goalY > CANVAS_HEIGHT) {
      this.goalY = OFFSCREEN_FUDGEROOM;
    }
    if (this.goalY < OFFSCREEN_FUDGEROOM) {
      this.goalY = CANVAS_HEIGHT;
    }
  }

  update() {
    const xDelta = this.goalX - this.x;
    const yDelta = this.goalY - this.y;

    const forceMoveRight = xDelta < -CANVAS_WIDTH / 2;
    const forceMoveLeft = xDelta > CANVAS_WIDTH / 2;
    if (forceMoveLeft || (xDelta < 0 && !forceMoveRight)) {
      // Need to move left to get to goal.
      this.direction = MOVE_LEFT;
      this.x -= this.pxPerTick;
    } else if (forceMoveRight || (xDelta > 0 && !forceMoveLeft)) {
      // Need to move right to get to goal.
      this.direction = MOVE_RIGHT;
      this.x += this.pxPerTick;
    }

    const forceMoveDown = yDelta < -CANVAS_HEIGHT / 2;
    const forceMoveUp = yDelta > CANVAS_HEIGHT / 2;
    if (forceMoveUp || (yDelta < 0 && !forceMoveDown)) {
      // Need to move up to get to goal.
      this.direction = MOVE_UP;
      this.y -= this.pxPerTick;
    } else if (forceMoveDown || (yDelta > 0 && !forceMoveUp)) {
      // Need to move down to get to goal.
      this.direction = MOVE_DOWN;
      this.y += this.pxPerTick;
    }

    this.updateWrapAround();

    this.characters[this.selectedCharacter].update(this.direction);
  }
}
