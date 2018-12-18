/*
This uses a ml5 charRNN model trained on a corpus of religious texts
For more about ml5 see https://ml5js.org/
*/

let charRNN;
let textInput;
let tempSlider;

let modelIsReady = false
let runningInference = false;
let autoGenerating = false;

let currentText = '';

function setup() {
  noCanvas();

  // Create the charRNN generator passing it the model directory
  charRNN = ml5.charRNN('./models/data/', modelReady);

  // Grab the DOM elements
  textInput = select('#textInput');
  tempSlider = select('#tempSlider');

  // DOM element events
  select('#reset').mousePressed(onResetButton);
  select('#generate').mousePressed(onGenerateButton);

  tempSlider.input(updateSliders);
}

// Update the slider values
function updateSliders() {
  select('#temperature').html(tempSlider.value());
}

function modelReady() {
  select('#status').html('Loaded ' + new Date().toLocaleString());
  modelIsReady = true;
}

// Read and seed with full text from input box
function generateWithFullInputText() {
  currentText = textInput.value();
  generate(currentText, false);
}

// Seed with last character of current text, preserving state (stateful LSTM)
function generateWithSingleChar() {
  generate(currentText.slice(-1), true);
}

// Update UI with current text
function updateTextUI() {
  select('#result').html(currentText);
}

// Clear current text, stop auto-generating
function onResetButton() {
  currentText = '';
  updateTextUI();
  autoGenerating = false;
}

// Start auto-generating
function onGenerateButton() {
  if(currentText == '') generateWithFullInputText();
  else generateWithSingleChar();
  autoGenerating = true;
}

// Stop auto-generating
function onStopButton() {
  autoGenerating = false;
}

// Generate new text
function generate(seed, stateful) {
   // prevent starting inference if we've already started another instance
  if(!runningInference) {
    runningInference = true;

    // Update the status log
    select('#status').html('Generating...');

    let data = {
      seed: seed,
      temperature: tempSlider.value(),
      length: 1,
      stateful: stateful,
    };

    // Generate text
    charRNN.generate(data, gotData);

    // When it's finished
    function gotData(err, result) {
      if(result) {
        var str = result.sample;

        // If the result is not a period, add output sample to current text
        var check = str.startsWith(".");
        if (check) {
          autoGenerating = false;
        }

        currentText += str;
        updateTextUI();
      }
      // Update the status log for the model
      status = 'Ready! '
      select('#status').html(status);
      runningInference = false;
    }
  }
}

function draw() {
    if(autoGenerating && modelIsReady) generateWithSingleChar();
}
