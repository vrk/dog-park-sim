const DOG_SRCS = [
  'images/corgi.png',
  'images/bull-terrier.png',
  'images/chihuahua.png',
  'images/cocker-spaniel-black.png',
  'images/cocker-spaniel-dark.png',
  'images/cocker-spaniel-light.png',
  'images/japanese-chin-dark.png',
  'images/japanese-chin-light.png',
  'images/mastiff.png',
  'images/pom.png',
  'images/pom-small-black.png',
  'images/pom-small-brown.png',
  'images/pom-small-light.png',
  'images/russian-wolfhound-brown.png',
  'images/russian-wolfhound-white.png',
  'images/russian-wolfhound-white-brown.png',
  'images/corgi-small.png'
];

function createDogSprites() {
  const canvas = document.querySelector('#foreground');
  const context = canvas.getContext('2d');

  return DOG_SRCS.map(src => new Dog(context, src));
}
