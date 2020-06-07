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

function prepareData(category, data, label) {
  category.training = [];
  category.testing = [];

  for (let i = 0; i < total_data; i++) {
    let offset = i * len;
    let threshold = floor(total_data * 0.8);
    if (i < threshold) {
      category.training[i] = data.bytes.subarray(offset, offset + len);
      category.training[i].label = label;
    } else {
      category.testing[i - threshold] = data.bytes.subarray(offset, offset + len);
      category.testing[i - threshold].label = label;
    }

  }
}

function trainEpoch(training) {
  shuffle(training, true);

  // train for one EPOCH
  for (let i = 0; i < training.length; i++) {
    let data = training[i];
    let inputs = data.map(x => x / 255.0);

    let label = training[i].label;
    let targets = [0, 0, 0];
    targets[label] = 1;

    nn.train(inputs, targets);
  }

  log("Completed one EPOCH");
}

function testAll(testing) {
  let correct = 0;
  for (let i = 0; i < testing.length; i++) {
    let data = testing[i];
    let inputs = data.map(x => x / 255.0);

    let label = testing[i].label;
    let guess = nn.predict(inputs);

    // console.log(guess);
    let m = max(guess);
    let classification = guess.indexOf(m);
    // console.log(classification);
    //
    // console.log(label);

    if (classification == label)
      correct++;

  }

  return correct / testing.length;

}

function setup() {
  createCanvas(280, 280);
  background(0);

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


  trainEpoch(training);

  let percent = testAll(testing);

  print("% Correct: " + percent);

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