class MarkovMachine {
  // build markov machine; read in text.
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  // set markov chains:
  makeChains() {
    const chains = {};
    // identify the current word and next word from the words array
    for (let i = 0; i < this.words.length - 1; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1];
      
      // if the current word is not in the chain, create an empty array for it and push the nextword into the array
      if (!chains[word]) {chains[word] = [];}
      
      chains[word].push(nextWord);
    }
    
    if (!chains[this.words[this.words.length - 1]]) {
      chains[this.words[this.words.length - 1]] = [null];
    }
    this.chains = chains;
    return this.chains
  }
  // return random text from chains
  makeText(numWords = 100) {
    let output = [];
   
    let currentWord = Object.keys(this.chains)[Math.floor(Math.random() * Object.keys(this.chains).length)];
    // continue pushing new words until numWords is reached or null is reached
    while (output.length < numWords && currentWord !== null) {
      output.push(currentWord);
      const nextWords = this.chains[currentWord];
      currentWord = nextWords[Math.floor(Math.random() * nextWords.length)];
    }
    return output.join(" ");
  }
}

module.exports = { MarkovMachine };