class Game {
  constructor() {
    this.setupMap = this.setupMap.bind(this);
    this.startGameLoop = this.startGameLoop.bind(this);
    this.onSitClick = this.onSitClick.bind(this);
    this.onSleepClick = this.onSleepClick.bind(this);
    this.onLookClick = this.onLookClick.bind(this);
    this.onBallClick = this.onBallClick.bind(this);
    this.onCanvasClick = this.onCanvasClick.bind(this);
    this.onAboutClick = this.onAboutClick.bind(this);

    this.container = document.querySelector('#world-container');
    this.canvas = document.querySelector('#foreground');
    this.context = this.canvas.getContext('2d');
    this.context.imageSmoothingEnabled = false;

    this.clickX = null;
    this.clickY = null;
    const ballImage = new Image();
    ballImage.src = 'images/tennisball.png';
    this.ballSprite = new Sprite(this.context, 9, 9, 0, 0, 1, ballImage);
    this.isBallMode = false;

    this.shouldShowHelpMessage = true;

    this.setupMap();
    window.addEventListener('resize', this.setupMap);

    this.player = new Player(
      this.context,
      CANVAS_WIDTH / 2 - DOG_SPRITE_SIZE_PX / 2,
      CANVAS_HEIGHT / 2 - DOG_SPRITE_SIZE_PX / 2
    );

    const danceButton = document.querySelector('#dance-button');
    danceButton.addEventListener('click', this.onSitClick);

    const sleepButton = document.querySelector('#sleep-button');
    sleepButton.addEventListener('click', this.onSleepClick);

    const lookButton = document.querySelector('#look-button');
    lookButton.addEventListener('click', this.onLookClick);

    const ballButton = document.querySelector('#ball-button');
    ballButton.addEventListener('click', this.onBallClick);
    
    const helpButton = document.querySelector('#help-button');
    helpButton.addEventListener('click', this.onAboutClick);

    this.canvas.addEventListener('click', this.onCanvasClick);

    this.setUpArrowButton('down-button', 'ArrowDown');
    this.setUpArrowButton('up-button', 'ArrowUp');
    this.setUpArrowButton('right-button', 'ArrowRight');
    this.setUpArrowButton('left-button', 'ArrowLeft');

    document.addEventListener(
      'keydown',
      function onDocKeyDown(event) {
        const key = event.key;
        if (ARROW_KEYS.includes(key)) {
          this.shouldShowHelpMessage = false;
          document.removeEventListener('keydown', onDocKeyDown);
        }
      }.bind(this)
    );
  }

  setupMap() {
    this.resize();
    this.createAllRandomDogs();
  }

  createAllRandomDogs() {
    this.others = [];
    const howManyDogs = globalNumberOfRandomDogs();

    for (let i = 0; i < howManyDogs; i++) {
      this.others.push(this.createRandomDog(this.context));
    }
  }

  createRandomDog(context) {
    const initialX =
      getRandomArbitrary(
        0,
        Math.floor(CANVAS_WIDTH / PLAYER_PX_UPDATES_PER_TICK)
      ) * PLAYER_PX_UPDATES_PER_TICK;
    const initialY =
      getRandomArbitrary(
        0,
        Math.floor(CANVAS_HEIGHT / PLAYER_PX_UPDATES_PER_TICK)
      ) * PLAYER_PX_UPDATES_PER_TICK;
    const initialDir = getRandomDir();
    const selectedCharacter = getRandomInt(DOG_SRCS.length);
    return new OtherPlayer(
      context,
      initialX,
      initialY,
      initialDir,
      selectedCharacter
    );
  }

  setUpArrowButton(buttonId, keyName) {
    const arrowButton = document.getElementById(buttonId);
    arrowButton.dataset.origHTML = arrowButton.innerHTML;
    arrowButton.dataset.isHeld = '';
    arrowButton.addEventListener('click', () => {
      this.shouldShowHelpMessage = false;
      arrowButton.dataset.isHeld =
        arrowButton.dataset.isHeld === '' ? 'held' : '';
      if (arrowButton.dataset.isHeld === 'held') {
        this.unclickAllOtherArrowButtons(buttonId, keyName);
        arrowButton.innerHTML = '=';
        this.player.onKeyDown({ key: keyName });
      } else {
        arrowButton.innerHTML = arrowButton.dataset.origHTML;
        this.player.onKeyUp({ key: keyName });
      }
    });
  }

  unclickAllOtherArrowButtons(buttonId, keyName) {
    const buttons = document.querySelectorAll('#movement-controls button');
    for (const button of buttons) {
      if (button.id === buttonId) {
        continue;
      }
      button.innerHTML = button.dataset.origHTML;
      button.dataset.isHeld = '';
    }
    for (const direction of [
      'ArrowDown',
      'ArrowUp',
      'ArrowRight',
      'ArrowLeft'
    ]) {
      if (direction === keyName) continue;
      this.player.onKeyUp({ key: direction });
    }
  }

  resize() {
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;
    this.container.style.width = window.innerWidth + 'px';
    this.container.style.height = window.innerHeight + 'px';

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  onLookClick() {
    this.player.changeLook();
  }

  onSitClick() {
    this.player.sit();
  }

  onSleepClick() {
    this.player.sleep();
  }
  
  onAboutClick() {
    const aboutBox = document.getElementById('about');
    aboutBox.hidden = !aboutBox.hidden;
    const aboutButton = document.getElementById('help-button');
    if (aboutBox.hidden) {
      aboutButton.classList.remove('pressed');
    } else {
      aboutButton.classList.add('pressed');
    }
  }

  onBallClick() {
    const danceButton = document.querySelector('#dance-button');
    const sleepButton = document.querySelector('#sleep-button');

    this.isBallMode = !this.isBallMode;
    const ballButton = document.querySelector('#ball-button');
    if (this.isBallMode) {
      ballButton.classList.add('pressed');
      ballButton.innerHTML = '🛑';
      
      danceButton.disabled = true;
      sleepButton.disabled = true;
      
    } else {
      danceButton.disabled = false;
      sleepButton.disabled = false;
      
      ballButton.classList.remove('pressed');
      ballButton.innerHTML = '🎾';
      //cleanup
      this.clickX = null;
      this.clickY = null;
      // stop the dog
      this.player.sit();
    }
  }

  onCanvasClick(event) {
    if (!this.isBallMode) {
      return;
    }
    const elemLeft = this.canvas.offsetLeft;
    const elemTop = this.canvas.offsetTop;
    const x = event.pageX - elemLeft;
    const y = event.pageY - elemTop;
    this.clickX = x;
    this.clickY = y;
  }


  renderOtherPlayers() {
    for (const otherPlayer of this.others) {
      otherPlayer.update();
      otherPlayer.render();
      if (otherPlayer.isMidMove()) {
        continue;
      }

      const diceRollShouldMove = getRandomInt(globalRandomDogMovementFrequency());
      if (diceRollShouldMove === 0) {
        this.moveOtherPlayerToOtherPlace(otherPlayer);
      } else {
        const diceRollStationeryPose = getRandomInt(APPROX_FPS * 3);
        if (diceRollStationeryPose === 0) {
          this.chooseRandomStationeryPose(otherPlayer);
        }
      }
    }
  }

  chooseRandomStationeryPose(otherPlayer) {
    const MAX = 15;
    const whichPose = getRandomInt(MAX);
    switch (whichPose) {
      case 0: 
      case 1: 
        otherPlayer.sleep();
        break;
      case 2: 
      case 3: 
      case 4: 
        otherPlayer.faceRandomDir();
        break;
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        otherPlayer.sit();
        break;
      default:
        otherPlayer.startPacing();
        break;
    }

  }

  moveOtherPlayerToOtherPlace(otherPlayer) {
    if (otherPlayer.isMidMove()) {
      return;
    }
    const stepsWide = CANVAS_WIDTH / 2;
    const stepsTall = CANVAS_HEIGHT / 2;
    let deltaX = getRandomArbitrary(-stepsWide, stepsWide);
    let deltaY = getRandomArbitrary(-stepsTall, stepsTall);

    otherPlayer.move(
      deltaX, deltaY
    );
  }

  renderStartMessage() {
    const x = CANVAS_WIDTH / 2;
    const y = CANVAS_HEIGHT / 2 - 32 - 10;
    this.context.font = '14px monospace';
    this.context.textAlign = 'center';
    this.context.fillText('Use the arrows', x, y);
    this.context.fillText('to move', x, y + 32 * 2 + 25);
  }

  didClickCanvas() {
    return this.clickX !== null && this.clickY !== null;
  }

  startGameLoop() {
    const gameLoop = () => {
      this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      requestAnimationFrame(gameLoop);

      if (this.shouldShowHelpMessage) {
        this.renderStartMessage();
      } else {
        this.renderOtherPlayers();
      }

      if (this.didClickCanvas() && this.isBallMode) {
        this.ballSprite.render(this.clickX, this.clickY);
        if (!this.player.isMoving()) {
          const destX = this.clickX - DOG_SPRITE_SIZE_PX / 2;
          const destY = this.clickY - DOG_SPRITE_SIZE_PX / 2;
          this.player.updateToBall(destX, destY);
        }
      }

      this.player.update();
      this.player.render();
    };
    gameLoop();
  }
}
