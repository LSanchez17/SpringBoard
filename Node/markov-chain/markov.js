/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
      // TODO
      let chain = new Map();

      for(let i = 0; i < this.words.length; i++){
        let currWord = this.words[i];
        let nextWord = this.words[i+1] || null;

        if(chain.has(currWord)){
          chain.get(currWord).push(nextWord);
        }
        else{
          chain.set(currWord, [nextWord])
        }
      }
      return chain;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let Markov = Array.from(this.makeChains().keys())
    let text = [];

    while(numWords){
      let randomPick = Math.floor(Math.random() * Markov.length);
      text.push(Markov[randomPick]);
      numWords--;
    }
    return text.join(' ');
  }
}

let mm = new MarkovMachine('the cat in the hat');

module.exports = {
  MarkovMachine
};
