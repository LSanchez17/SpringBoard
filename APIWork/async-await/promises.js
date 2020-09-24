const NUMBERURL = 'http://numbersapi.com/';
const CARDSURL = 'http://deckofcardsapi.com/api/';
const POKEMONSURL = 'https://pokeapi.co/api/v2/';

class NumberFacts{
    constructor(){
        this.API = 'http://numbersapi.com/';
        this.num = Math.floor(Math.random() * Math.floor(1090));
        this.type = 'trivia';
        this.parentElement = document.querySelector('#numBody');
        this.manyParentElement = document.querySelector('#multipleBody');
        this.fourFactNum = document.querySelector('#fourFacts')
    }

    async numberFact() {
        let url = `${this.API}${this.num}/${this.type}`;
        let response = await axios.get(url)
        
        try{
            this.appendToBody(response.data);
        }
        catch(e){
            console.log(e);
        }
    }

    async multipleNums() {
        let numList = this.getRandomNums();
        if(numList.length == 0){
            numList = this.getRandomNums();
        }
        numList = numList.join(',');
        let url = `${this.API}${numList}/${this.type}`;
        let response = await axios.get(url);
        try{
            this.appendToBodyMultiples(response.data);
        }
        catch(e){
            console.log(e);
        }
    }

    async chainedNumber() {
        let url = `${this.API}${this.num}/${this.type}`;
        let response1 = await axios.get(url)
        let response2 = await axios.get(url)
        let response3 = await axios.get(url)
        let response4 = await axios.get(url)

        let synchronousList = [response1, response2, response3, response4];
        this.appendFourFacts(synchronousList);
    }

    appendToBody(json) {
        this.clearChildren(this.parentElement);

        let div = document.createElement('div');
        let p = document.createElement('p');

        div.classList += 'container-fluid';
        p.classList += 'text-centered';
        p.innerText = json;

        div.appendChild(p);
        this.parentElement.appendChild(div);
    }

    appendToBodyMultiples(json){
        this.clearChildren(this.manyParentElement);

        for(let key in json){
            let div = document.createElement('div');
            let p = document.createElement('p');

            div.classList += 'container-fluid';
            p.classList += 'text-centered';
            p.innerText = json[key];

            div.appendChild(p);
            this.manyParentElement.appendChild(div);
        }
    }

    appendFourFacts(json) {
        this.clearChildren(this.fourFactNum);

        console.log(json)

        json.forEach(item => {
            let div = document.createElement('div');
            let p = document.createElement('p');

            div.classList += 'container-fluid';
            p.classList += 'text-centered';
            p.innerText = item.data;

            div.appendChild(p);
            this.fourFactNum.appendChild(div);
        })
    }
    getRandomNums() {
        let loopLength = Math.floor(Math.random() * 6);
        let numList = [];

        while(loopLength){
            let randomFactNum = Math.floor(Math.random() * 100);
            numList.push(randomFactNum);
            loopLength--;
        }
        return numList;
    }

    clearChildren(parentBody){
        while(parentBody.firstChild){
            parentBody.removeChild(parentBody.firstChild);
        }
    }
}

class DeckOfCards {
    //Non usable if left alone for a week with the API structure
    //Must replace deck ID as it can change with inactivity
    constructor(){
        this.API = 'https://deckofcardsapi.com/api/';
        this.drawCard = 'deck/new/draw/';
        this.continuousDraw = 'deck/8gbpsy3ap7o0/draw/';
        this.shuffle = 'deck/8gbpsy3ap7o0/shuffle/';
        this.placeCardsHere = document.querySelector('#cardBody');
    }

    async getCards(number) {
        let url = `${this.API}${this.drawCard}`;
        if(number === 1){
            try{
                let cardRes = await axios.get(url, { 
                    params: {
                        count: number
                    }
                });
                console.log(`Single Card: ${cardRes.data.cards[0].value} of ${cardRes.data.cards[0].suit}`);
            }
            catch(e){
                console.log(e);
            }
        }
        else if(number >= 2){
            let shuffleMe = `${this.API}${this.shuffle}`;
            let cardUrl = `${this.API}${this.continuousDraw}`;
            let shuffled = await axios.get(shuffleMe);
            try{
                let cardRes = await axios.get(cardUrl, {
                    params: {
                        count: number
                    }
                });
                cardRes.data.cards.forEach((items) => {
                    console.log(`Multiple Draw from one deck: ${items.suit} of ${items.value}`);
                })
            }
            catch(e){
                console.log(e);
            }
        }
        else{
            console.log('invalid parameters');
        }

    }

    async oneDeckDepleted(){
        let url = `${this.API}${this.drawCard}`;
        let response = await axios.get(url);
        try{
            if(response.data.remaining > 1){
                let concatString = `${response.data.cards[0].value}${response.data.cards[0].suit}`;
                this.makeItPretty(concatString);
            }
        }
        catch(e) {
            console.log(err);
        }
    }

    makeItPretty(cardName) {
        let div = document.createElement('div');
        let img = document.createElement('img');

        div.classList += 'card shadow justify-content-left';
        img.classList +='card-image container-fluid';
        img.src = `images/${cardName}.jpg`;
        div.appendChild(img);
        this.placeCardsHere.appendChild(div);
    }

}

class Pokemons {
    constructor(POKEMONSURL){
        this.API = 'https://pokeapi.co/api/v2/pokemon';
        this.pokemonFacts = document.querySelector('#pokemon');
    }

   async getAllPokemons(){
        let response = await axios.get(this.API, {
            params:{
                'offset': 0,
                'limit': 1050
            }
        })
        try{
            let counter = 3;
            while(counter !== 0){
                let randomPokemon = Math.floor(Math.random() * Math.floor(1050));
                this.getPokemon(response.data.results[randomPokemon]);
                counter--;
            }
        }
        catch(e){
            console.log(e);
        }
    }

    async getPokemon(nextRequest){
        let response = await axios.get(nextRequest.url);
       
        try{
            let sprite = response.data.sprites.front_default;
            
            if(sprite === null){
                sprite = response.data.sprites.front_shiny;
            }

            let newResponse = await axios.get(response.data.species.url);
            try{
                this.prettifyIt(newResponse.data, sprite)
            }
            catch(e){
                console.log(e);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    prettifyIt(json, sprite){
        let div = document.createElement('div');
        let img = document.createElement('img');
        let text = document.createElement('p');
        let name = document.createElement('h2')
        
        div.classList += 'card shadow-lg container-fluid';
        img.classList += 'img-fluid card-img-bottom';
        img.setAttribute('style', 'width:25%; height:25%;')
        text.classList += 'card-text';
        name.classList += 'card-title';
        img.src = sprite;
        name.innerText = json.name;

        json.flavor_text_entries.forEach(flavor => {
            if(flavor.language.name === 'en'){
                text.innerText = flavor.flavor_text;
            }
        })
        
        div.appendChild(name);
        div.appendChild(text);
        div.appendChild(img);

        this.pokemonFacts.appendChild(div)
    }
}


const main = () => {
    let numbers = document.querySelector('#getNums');
    let multipleNumbers = document.querySelector('#lotsNums');
    let fourFactsNum = document.querySelector('#oneNumFour');
    let oneCard = document.querySelector('#getCard');
    let pokemon = document.querySelector('#getPokes');

    //Adds one number fact
    numbers.addEventListener('submit', (e) => {
        e.preventDefault();

        let numCaller = new NumberFacts;
        numCaller.numberFact();
    })

    //Adds multiple(list) number facts
    multipleNumbers.addEventListener('submit', (e) => {
        e.preventDefault();

        let numCaller = new NumberFacts;
        numCaller.multipleNums();
    })

    //Adds four facts of a singular number
    fourFactsNum.addEventListener('submit', (e) => {
        e.preventDefault();

        let numCaller = new NumberFacts;
        numCaller.chainedNumber();
    })

    oneCard.addEventListener('submit', (e) => {
        e.preventDefault();

        let singleCard = new DeckOfCards;
        singleCard.getCards(1);
        singleCard.getCards(3);
        singleCard.oneDeckDepleted();
    })

    pokemon.addEventListener('submit', (e) => {
        e.preventDefault();

        let pokemonDisplay = new Pokemons;
        pokemonDisplay.getAllPokemons();
        
    })
}

main();
