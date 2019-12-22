class Game {
  constructor() {
    this.setupMap = this.setupMap.bind(this);
    this.startGameLoop = this.startGameLoop.bind(this);
    this._onSitRightClick = this.onSitRightClick.bind(this);
    this._onLookClick = this.onLookClick.bind(this);

    this.container = document.querySelector('#world-container');
    this.canvas = document.querySelector('#foreground');
    this.context = this.canvas.getContext('2d');
    this.context.imageSmoothingEnabled = false;

    this.shouldShowHelpMessage = true;

    this.setupMap();
    window.addEventListener('resize', this.setupMap);

    this.player = new Player(
      this.context,
      CANVAS_WIDTH / 2 - DOG_SPRITE_SIZE_PX / 2,
      CANVAS_HEIGHT / 2 - DOG_SPRITE_SIZE_PX / 2
    );

    const danceButton = document.querySelector('#dance-button');
    danceButton.addEventListener('click', this.onSitRightClick);

    const lookButton = document.querySelector('#look-button');
    lookButton.addEventListener('click', this.onLookClick);

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

  onSitRightClick() {
    this.player.sitRight();
  }

  renderOtherPlayers() {
    for (const otherPlayer of this.others) {
      otherPlayer.update();
      otherPlayer.render();

      const diceRoll = getRandomInt(1000);
      if (diceRoll === 42) {
        const stepsWide = Math.floor(
          CANVAS_WIDTH / PLAYER_PX_UPDATES_PER_TICK / 2
        );
        const stepsTall = Math.floor(
          CANVAS_HEIGHT / PLAYER_PX_UPDATES_PER_TICK / 2
        );
        let numberStepsX = getRandomArbitrary(-stepsWide, stepsWide);
        let numberStepsY = getRandomArbitrary(-stepsTall, stepsTall);

        otherPlayer.move(
          PLAYER_PX_UPDATES_PER_TICK * numberStepsX,
          PLAYER_PX_UPDATES_PER_TICK * numberStepsY
        );
      }
    }
  }

  renderStartMessage() {
    const x = CANVAS_WIDTH / 2;
    const y = CANVAS_HEIGHT / 2 - 32 - 10;
    this.context.font = '14px monospace';
    this.context.textAlign = 'center';
    this.context.fillText('Use the arrows', x, y);
    this.context.fillText('to move', x, y + 32 * 2 + 25);
  }

  startGameLoop() {
    const gameLoop = () => {
      this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      requestAnimationFrame(gameLoop);

      this.player.update();
      this.player.render();

      if (this.shouldShowHelpMessage) {
        this.renderStartMessage();
      } else {
        this.renderOtherPlayers();
      }
    };
    gameLoop();
  }
}
