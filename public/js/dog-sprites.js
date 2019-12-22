const DOG_SRCS = [
  'images/corgi.png',
  'images/bull-terrier.png',
  'images/chihuahua.png',
  'images/cocker-spaniel-black-ribbon.png',
  'images/cocker-spaniel.png',
  'images/cocker-spaniel-dark-collar.png',
  'images/japanese-chin.png',
  'images/mastiff.png',
  'images/pomeranian.png'
];

function createDogSprites() {
  const canvas = document.querySelector('#foreground');
  const context = canvas.getContext('2d');

  return DOG_SRCS.map(src => new Dog(context, src));
}
