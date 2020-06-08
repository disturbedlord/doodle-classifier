//  total no. of data in each category
const total_data = 1000;
//  total image pixels
const len = 784;

const CAT = 0;
const RAINBOW = 1;
const TRAIN = 2;

let cats = {};
let trains = {};
let rainbows = {};

let nn;

function preload() {
  cats_data = loadBytes('data/cat.bin');
  trains_data = loadBytes('data/train.bin');
  rainbows_data = loadBytes('data/rainbow.bin');
}

function setup() {
  createCanvas(280, 280);
  background(255);

  prepareData(cats, cats_data, CAT);
  prepareData(trains, trains_data, TRAIN);
  prepareData(rainbows, rainbows_data, RAINBOW);

  nn = new NeuralNetwork(len, 64, 3);

  let training = [];
  training = training.concat(cats.training);
  training = training.concat(rainbows.training);
  training = training.concat(trains.training);

  let testing = [];
  testing = testing.concat(cats.training);
  testing = testing.concat(rainbows.training);
  testing = testing.concat(trains.training);

  let epochCounter = 0;

  let trainButton = select("#train");
  trainButton.mousePressed(() => {
    trainEpoch(training);
    epochCounter++;
    console.log("Epoch: " + epochCounter);
  });


  let testButton = select("#test");
  testButton.mousePressed(() => {
    let percent = testAll(testing);
    // epochCounter++;
    console.log("Percent: " + nf(percent, 2, 2) + "%");
  });

  let clearButton = select("#clear");
  clearButton.mousePressed(() => {
    background(255);
  });


  let guessButton = select("#guess");
  guessButton.mousePressed(() => {
    let inputs = [];
    let img = get();
    img.resize(28, 28);
    console.log(img);
    img.loadPixels();

    for (let i = 0; i < len; i++) {
      let bright = img.pixels[i * 4];
      inputs[i] = (255 - bright) / 255.0;
    }

    console.log(inputs);

  });


  // for (let i = 0; i < 1; i++) {
  //   trainEpoch(training);
  //   print("Epoch: " + (i + 1));
  //   let percent = testAll(testing);
  //   print("% Correct: " + percent);
  // }
  // display doodle's
  // let total = 100;
  // for(let n = 0;n<total ;n++){
  //     let img = createImage(28 , 28);
  //     img.loadPixels();
  //     let offset = n * 784;
  //     for(let i = 0;i<784;i++){
  //       let val = 255 - cats.bytes[i + offset];
  //       img.pixels[i * 4 + 0] = val;
  //       img.pixels[i * 4 + 1] = val;
  //       img.pixels[i * 4 + 2] = val;
  //       img.pixels[i * 4 + 3] = 255;
  //
  //     }
  //     img.updatePixels();
  //     let x = (n % 10) * 28;
  //     let y = floor(n / 10) * 28;
  //     image(img , x , y);
  // }
}

function draw() {
  strokeWeight(8);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}