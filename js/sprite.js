const BEATS_PER_FRAME = 10;
const BEATS_PER_SLEEP = BEATS_PER_FRAME * 5;

class Sprite {
  constructor(context, width, height, x, y, numberFrames, image) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.startX = x;
    this.startY = y;
    this.image = image;
    this.totalFrames = numberFrames;
    this.tickCount = 0;
    this.frameCount = 0;
  }

  update() {
    this.tickCount++;
    if (this.tickCount % BEATS_PER_FRAME === 0) {
      this.frameCount = (this.frameCount + 1) % this.totalFrames;
    }
  }

  updateSleep() {
    this.tickCount++;
    if (this.tickCount % BEATS_PER_SLEEP === 0) {
      this.frameCount = (this.frameCount + 1) % this.totalFrames;
    }
  }

  startSpecial() {
    this.tickCount = 0;
    this.frameCount = 0;
  }

  updateSit() {
    this.tickCount++;
    if (this.tickCount % BEATS_PER_FRAME === 0 && this.frameCount < this.totalFrames - 1) {
      this.frameCount = (this.frameCount + 1) % this.totalFrames;
    }
  }

  render(x, y) {
    this.context.drawImage(
      this.image,
      this.startX + this.width * this.frameCount, /* source x */
      this.startY, /* source y */
      this.width,
      this.height,
      x, /* canvas x */
      y, /* canvas y */
      this.width,
      this.height);
  }
}
