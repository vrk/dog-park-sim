const OTHER_PLAYER_DEFAULT_PX_PER_TICK = 1;
const OTHER_PLAYER_RUN_PX_PER_TICK = 2;

class OtherPlayer extends BasePlayer {
  constructor(context, initialX, initialY, initialDir, selectedCharacter) {
    super(context, initialX, initialY, initialDir, selectedCharacter);
    this.goalDirection = initialDir;
    this.distXLeft = 0;
    this.distYLeft = 0;

    this.pxPerTick = OTHER_PLAYER_DEFAULT_PX_PER_TICK;
    this.isRunning = false;
  }
  
  move(distX, distY) {
    this.pxPerTick = OTHER_PLAYER_DEFAULT_PX_PER_TICK;
    this.isRunning = false;

    // let's run sometimes
   if (getRandomInt(5) === 0) {
      this.pxPerTick = OTHER_PLAYER_RUN_PX_PER_TICK;
      this.isRunning = true;
   }

   this.distXLeft = distX - distX % this.pxPerTick;
   this.distYLeft = distY - distY % this.pxPerTick;
  }

  isMidMove() {
    return this.distXLeft !== 0 || this.distYLeft !== 0;
  }

  faceRandomDir() {
    this.goalDirection = getRandomDir();
  }

  sleep() {
    this.goalDirection = SLEEP;
  }

  stayStill() {
    switch (this.direction) {
      case MOVE_UP:
        this.goalDirection = STILL_UP;
        break;
      case SIT_DOWN:
      case MOVE_DOWN:
        this.goalDirection = STILL_DOWN;
        break;
      case RUN_RIGHT:
      case SIT_RIGHT:
      case MOVE_RIGHT:
        this.goalDirection = STILL_RIGHT;
        break;
      case RUN_LEFT:
      case SIT_LEFT:
      case MOVE_LEFT:
        this.goalDirection = STILL_LEFT;
        break;
      default:
        this.goalDirection = STILL_DOWN;
    }
  }

  startPacing() {
    switch (this.direction) {
      case STILL_UP:
        this.goalDirection = MOVE_UP;
        break;
      case SIT_DOWN:
      case STILL_DOWN:
        this.goalDirection = MOVE_DOWN;
        break;
      case SIT_RIGHT:
      case STILL_RIGHT:
        this.goalDirection = MOVE_RIGHT;
        break;
      case SIT_LEFT:
      case STILL_LEFT:
        this.goalDirection = MOVE_LEFT;
        break;
      default:
        this.goalDirection = MOVE_DOWN;
    }
  }

  sit() {
    this.distXLeft = 0;
    this.distYLeft = 0;
    switch (this.direction) {
      case MOVE_UP:
      case MOVE_DOWN:
      case STILL_UP:
      case STILL_DOWN:
        this.goalDirection = SIT_DOWN;
        break;
      case MOVE_LEFT:
      case STILL_LEFT:
        this.goalDirection = SIT_LEFT;
        break;
      case MOVE_RIGHT:
      case STILL_RIGHT:
        this.goalDirection = SIT_RIGHT;
        break;
      default:
        this.goalDirection = SIT_DOWN;
    }
  }

  update() {
    if (Math.abs(this.distXLeft) < this.pxPerTick) {
      this.distXLeft = 0;
    }
    if (Math.abs(this.distYLeft) < this.pxPerTick) {
      this.distYLeft = 0;
    }

    this.direction = this.goalDirection;

    if (this.distXLeft < 0) {
      this.direction = MOVE_LEFT;
      this.distXLeft += this.pxPerTick;
      this.x -= this.pxPerTick;
    } else if (this.distXLeft > 0) {
      this.direction = MOVE_RIGHT;
      this.distXLeft -= this.pxPerTick;
      this.x += this.pxPerTick;
    }

    if (this.distYLeft < 0) {
      this.direction = MOVE_UP;
      this.distYLeft += this.pxPerTick;
      this.y -= this.pxPerTick;
    } else if (this.distYLeft > 0) {
      this.direction = MOVE_DOWN;
      this.distYLeft -= this.pxPerTick;
      this.y += this.pxPerTick;
    }

    this.updateWrapAround();

    this.characters[this.selectedCharacter].update(this.direction);
  }
}
