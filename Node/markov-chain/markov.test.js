const { MarkovMachine } = require('./markov');

test('Should do markov chain with Cat in hat', () => {
    let chain = new MarkovMachine('Cat in hat');
    let chainMap = new Map();
    
    chainMap.set('Cat', ['in']);
    chainMap.set('in', ['hat']);
    chainMap.set('hat', [ null ]);

    expect(chain.makeChains()).toEqual(chainMap);
})

test('Should store words into array,', () => {
    let words = 'This is a a random test';
    let arrayOfWords = {'words': ['This', 'is', 'a', 'a', 'random', 'test']};
    let newMarkov = new MarkovMachine(words);
    
    expect(newMarkov).toEqual(arrayOfWords);
})