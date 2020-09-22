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

    numberFact() {
        let url = `${this.API}${this.num}/${this.type}`;
        let response = axios.get(url)

        console.log(response);
        
        response
        .then(res => this.appendToBody(res.data))
        .catch(err => console.log(err));
    }

    multipleNums() {
        let numList = this.getRandomNums();
        if(numList.length == 0){
            numList = this.getRandomNums();
        }
        numList = numList.join(',');
        let url = `${this.API}${numList}/${this.type}`;
        let response = axios.get(url);
        response
        .then(res => this.appendToBodyMultiples(res.data))
        .catch(err => console.log(err));
        
    }

    chainedNumber() {
        let url = `${this.API}${this.num}/${this.type}`;
        let response1 = axios.get(url)
        let response2 = axios.get(url)
        let response3 = axios.get(url)
        let response4 = axios.get(url)

        Promise.all([response1, response2, response3, response4])
        .then(values => {
            this.appendFourFacts(values);
        })
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

    getCards(number) {
        let url = `${this.API}${this.drawCard}`;
        if(number === 1){
            let cardRes = axios.get(url, { 
                params: {
                    count: number
                }
            });
    
            cardRes
            .then(res => console.log(`Single Card: ${res.data.cards[0].value} of ${res.data.cards[0].suit}`))
            .catch(err => console.log(err));
        }
        else if(number >= 2){
            let shuffleMe = `${this.API}${this.shuffle}`;
            let cardUrl = `${this.API}${this.continuousDraw}`;
            let shuffled = axios.get(shuffleMe);
            shuffled
            .then(() => {
                let cardsRes = axios.get(cardUrl, {
                    params: {
                        count: number
                    }
                });
                cardsRes
                .then(res => {
                    res.data.cards.forEach((items) => {
                        console.log(`Multiple Draw from one deck: ${items.suit} of ${items.value}`);
                    })
                })
            .catch(err => console.log(err))
            })
        }
        else{
            console.log('invalid parameters');
        }

    }

    oneDeckDepleted(){
        let url = `${this.API}${this.drawCard}`;
        let response = axios.get(url);

        response
        .then(res => {
            if(res.data.remaining > 1){
                let concatString = `${res.data.cards[0].value}${res.data.cards[0].suit}`;
                this.makeItPretty(concatString);
            }
        })
        .catch(err => console.log(err));
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

    getAllPokemons(){
        let response = axios.get(this.API, {
            params:{
                'offset': 0,
                'limit': 1050
            }
        })
        response.then(res => {
            let counter = 3;
            while(counter !== 0){
                let randomPokemon = Math.floor(Math.random() * Math.floor(1050));
                this.getPokemon(res.data.results[randomPokemon]);
                counter--;
            }
        })
    }

    getPokemon(nextRequest){
        let response = axios.get(nextRequest.url);
       
        response
        .then(res => {
            let sprite = res.data.sprites.front_default;
            
            if(sprite === null){
                sprite = res.data.sprites.front_shiny;
            }

            let newResponse = axios.get(res.data.species.url);
            newResponse
            .then((res) => {
                this.prettifyIt(res.data, sprite)
            })
        })
        .catch(err => console.log(err))
        
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
