//////////////////////////////////////////////////////////////////////

// Stuff you might want to change

//////////////////////////////////////////////////////////////////////

// Should generate 1 dog per `RANDOM_DOG_DENSITY` squared.
const RANDOM_DOG_DENSITY = 200;
const MIN_DOGS = 5;

// Note that CANVAS_HEIGHT and CANVAS_WIDTH are mutable globals that aren't set on start
function globalNumberOfRandomDogs() {
  const computedDogs = (CANVAS_HEIGHT * CANVAS_WIDTH) / (RANDOM_DOG_DENSITY * RANDOM_DOG_DENSITY);
  return Math.max(MIN_DOGS, computedDogs);
}

const APPROX_FPS = 60;
const PERCENTAGE_OF_DOG_POPULATION_TO_MOVE = 0.5;
const SECONDS_BETWEEN_MOVEMENTS = 3;

// There will be a dice roll for every dog, every tick. A dog will automatically move 
// 1 / globalRandomDogMovementFrequency() number of ticks.
function globalRandomDogMovementFrequency() {
  const ticksBetweenMovements = SECONDS_BETWEEN_MOVEMENTS * APPROX_FPS * 
    Math.floor(1 / PERCENTAGE_OF_DOG_POPULATION_TO_MOVE);
  return ticksBetweenMovements;
}

//////////////////////////////////////////////////////////////////////

// Stuff you should only change with great caution

//////////////////////////////////////////////////////////////////////

// Dog movements
const MOVE_DOWN = 'down';
const MOVE_UP = 'up';
const MOVE_LEFT = 'left';
const MOVE_RIGHT = 'right';

const SIT_RIGHT = 'sit_right';
const SIT_LEFT = 'sit_left';
const SIT_DOWN = 'sit_down';

const STILL_DOWN = 'still_down';
const STILL_UP = 'still_up';
const STILL_LEFT = 'still_left';
const STILL_RIGHT = 'still_right';

const RUN_LEFT = 'run_left';
const RUN_RIGHT = 'run_right';

const SLEEP = 'sleep';

// Keyboard presses
const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

// Size of the dog sprite. Assuming it's a square.
const DOG_SPRITE_SIZE_PX = 64;

// By how many pixels Y-ward can a character go offscreen.
const OFFSCREEN_FUDGEROOM = -DOG_SPRITE_SIZE_PX / 2;

// Globals... sry for hack
let CANVAS_HEIGHT;
let CANVAS_WIDTH;

const PLAYER_PX_UPDATES_PER_TICK = 2;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const ALL_DIR = [MOVE_DOWN, MOVE_UP, MOVE_LEFT, MOVE_RIGHT];
function getRandomDir() {
  return ALL_DIR[getRandomInt(ALL_DIR.length)];
}

const SIT_DIRS = [SIT_RIGHT, SIT_DOWN, SIT_LEFT];
