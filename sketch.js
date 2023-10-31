

var mic;
var fft;
var w;

var fade;
var rWidth, rHeight;
var hVal;

function setup() {
  createCanvas(1280, 720);
  mic = new p5.AudioIn();
  mic.start(); //
  fft = new p5.FFT(0.6, 256);
  fft.setInput(mic);

  stroke(255);
  w = (width / fft.bins) * 4;
  strokeCap(SQUARE);
  strokeWeight(w);
  smooth();

  background(0);
  fade = get(0, 0, width, height);

  rWidth = width * 0.99;
  rHeight = height * 0.99;
  hVal = 0;
}

function draw() {
  background(0);

  tint(255, 255, 255, 255);
  image(fade, (width - rWidth) / 2, (height - rHeight) / 2, rWidth, rHeight);
  noTint();

  var spectrum = fft.analyze();

  colorMode(HSB);
  stroke(hVal, 255, 255);
  colorMode(RGB);

  for (var i = 0; i < spectrum.length; i++) {
    line(i * w + w / 2, height, i * w + w / 2, height - spectrum[i]); 
  }

  fade = get(0, 0, width, height);
  stroke(random(255));

  for (var i = 0; i < spectrum.length; i++) {
    line(i * w + w / 2, height, i * w + w / 2, height - spectrum[i]);
  }

  hVal += 2;
  if (hVal > 255) {
    hVal = 0; 
  }
}

