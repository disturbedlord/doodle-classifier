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
  return 100 * correct / testing.length;
}