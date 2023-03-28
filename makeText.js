const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

async function generateText() {
  // Check if the input source is provided or exit with error
  if (process.argv.length !== 4) {
    console.error('Usage: node makeText.js [file|url] [content]');
    process.exit(1);
  }

  // Define inputs
  const inputType = process.argv[2];
  const content = process.argv[3];

  try {
    let mm;
    if (inputType === 'file') {
      const fileContent = fs.readFileSync(content, 'utf8');
      mm = new MarkovMachine(fileContent);
    } else if (inputType === 'url') {
      const response = await axios.get(content);
      // Create new instance of MarkovMachine
      mm = new MarkovMachine(response.data);
    } else {
      throw new Error(`Invalid input source: ${inputType}`);
    }

    console.log(mm.makeText());
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

generateText();