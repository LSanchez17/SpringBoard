class boggleGame{
    constructor(){ 
        this.formSubmit = document.querySelector('#wordguess');
        this.guessSpace = document.querySelector('#guesslist');
        this.wordValidity = document.querySelector('#wordPicked');
        this.timeDisplay = document.querySelector('#timeLeft');
        this.restartButton = document.querySelector('#restart');
        this.scoreHolder = document.querySelector('#score');
        this.GameArea = document.querySelector('#GameArea');
        this.$wordguess = $('#wordguess');
        this.$wordPicked = $('#wordPicked');
        this.$timeLeft = $('#timeLeft');
        this.$finalScore = $('#TEST');
        this.$score = $('#score');
        this.$restart = $('#restartArea');
        this.currentScore = 0;
        this.comparedScore = 0;
        this.gameStart = true;
        this.wordSet = new Set();
        this._HighScore = 0;
        this._timesPlayed = 0;
        this.formSubmit.addEventListener('submit', this.wordSubmit.bind(this));
        this.restartButton.addEventListener('click', this.restartDOM.bind(this));
    }

    beginBoggle(){
        if(this.gameStart){
            //turn on timer, begin countdown
            this.gameStart = false;
            this.beginTimer();
        }
    }

    validWordResult(result, word){
        let JsonTranslated = '';
        let updatedScore = 0;

        if(result === 'ok'){
            JsonTranslated = 'Valid';
            updatedScore = word.length;
            this.currentScore += updatedScore;
        }
        if(result === 'not-on-board'){
            JsonTranslated = 'Not on board';
        }
        if(result === 'not-word'){
            JsonTranslated = 'Invalid';
        }

        // console.log(updatedScore)

        this.scoreHolder.innerText = this.currentScore;
        this.wordValidity.innerText = `The word picked, ${word}, is: ${JsonTranslated}`;
    }

    async getWordValue(word){
        //We use axios to get the initial route, and since this is a post form
        //it submits data that turns the route into a query string, so we can set up
        //axios to add a query string that we dfine as word: word
        const res = await axios.get('/valid-word', {params: {word: word}});
        // console.log(res.data.result)
        let jsonResult = res.data.result;
        // console.log(word)
        this.validWordResult(jsonResult, word);
    }

    async wordSubmit(evt){
        evt.preventDefault();

        let valueOfWord = document.querySelector('#word').value;
        let listAddition = document.createElement('li');
    
        listAddition.innerText = valueOfWord;
    
        let noDupes = this.checkForDupes(valueOfWord);
        if(noDupes){
            this.beginBoggle();
            this.guessSpace.append(listAddition);
            this.getWordValue(valueOfWord);
        }
        if(!noDupes){
            this.wordValidity.innerText = `Word ${valueOfWord} has already been picked!`;
        }
        // console.log(validWord);
    }

    checkForDupes(word){
        if(this.gameStart){
            this.wordSet.clear();
        }

        if(!this.wordSet.has(word)){
            this.wordSet.add(word);
            return true;
        }
        if(this.wordSet.has(word)){
            return false;
        }
    }

    async saveToSession(score, playtime){
        const res = await axios.post('/stats', {score: score, timesplayed: playtime});
        console.log(res);
        return;
    }

    async restartDOM(evt){
        await this.saveToSession(this._HighScore, this._timesPlayed);

        this.gameStart = true;
        this.currentScore = 0;

        this.GameArea.style.display = 'block';
        this.guessSpace.innerText = '';
        this.$restart.toggleClass('d-none');
    }


    gameRestart(){
        //saving current score so we can compare to high score
        this.comparedScore = parseInt(this.$finalScore.text());
        if(!this.gameStart){
            // console.log('jquery')
            this.GameArea.style.display = 'none';
            this.$wordguess.trigger('reset')
            this.$wordPicked.text('')
            this.$timeLeft.text('');
            this.$score.text('');
            this.$restart.toggleClass('d-none');
            if(this.comparedScore <= this.currentScore){
                this.$finalScore.text(this.currentScore)
                this._HighScore = this.currentScore;
            }
        }
    }

    beginTimer(){
        let seconds = 60;
        let clock = setInterval(() => {
            this.timeDisplay.innerHTML = `${seconds--}'' left`;
            if(seconds <= 55){
                clearInterval(clock);
                this._timesPlayed++;
                this.gameRestart();
            }
        }, 1000)
    }
}


$(document).ready(function() {
    let newGame = new boggleGame();

//     /* let formEvent = document.querySelector('#wordguess');
//     / let guessSpace = document.querySelector('#guesslist');
//     / let wordValidity = document.querySelector('#wordPicked');
//     / let scoreHolder = document.querySelector('#score');
//     / let timeDisplay = document.querySelector('#timeLeft');
//     / let restartButton = document.querySelector('#restart');
//     / let currentScore = 0;
//     / let gameStart = true;
//     */ let firstTime = false;

//     if(gameStart)
//     {
//         formEvent.addEventListener('submit', (e)=>{
//             e.preventDefault();

//             if(firstTime !== true){
//                 firstTime = true;
//                 beginTimer();
//             }

//             let valueOfWord = document.querySelector('#word').value;
//             let listAddition = document.createElement('li');
        
//             listAddition.innerText = valueOfWord;
//             guessSpace.append(listAddition);

//             validWord = getWordValue(valueOfWord);
//             // console.log(validWord);
//         })

//         async function getWordValue(word) {
//         //We use axios to get the initial route, and since this is a post form
//         //it submits data that turns the route into a query string, so we can set up
//         //axios to add a query string that we dfine as word: word
//             const res = await axios.get('/valid-word', {params: {word: word}});
//         //console.log(res.data.result)
//             let jsonResult = res.data.result;
      
//         validWordResult(jsonResult, word);
//         }

//         function validWordResult(result, word){
//             JsonTranslated = '';
//             updatedScore = 0;

//             if(result == 'ok'){
//                 JsonTranslated = 'Valid';
//                 updatedScore = word.length;
//                 currentScore += updatedScore;
//             }
//             if(result == 'not-on-board'){
//                 JsonTranslated = 'Not on board';
//             }
//             if(result == 'not-word'){
//                 JsonTranslated = 'Invalid';
//             }

//             scoreHolder.innerText = currentScore;
//             wordValidity.innerText = `The word picked, ${word}, is: ${JsonTranslated}`;
//         }

//         function beginTimer(){
//             let seconds = 0;
//             let clock = setInterval(function() {
//                 timeDisplay.innerHTML = `${seconds++}''`;
//                 // console.log('test')
//                 if(seconds >= 4){
//                     // console.log('test fail')
//                     gameStart = false;
//                     clearInterval(clock);
//                     gameRestart();
//                 }
//             }, 1000)
//         }
//     }

//     function gameRestart(){
//         if(!gameStart){
//             $('#wordguess').toggleClass('d-none');
//             $('#wordguess').trigger('reset')
//             $('#wordPicked').toggleClass('d-none');
//             $('#wordPicked').text('')
//             $('#gameStats').toggleClass('d-none');
//             $('#timeDisplay').hide();
//             $('#timeLeft').text('')
//             $('#finalScore').toggleClass('d-none');
//             $('#score').text('');
//             $('#finalScore').text(`High Score: ${currentScore}`)
//             $('#restartArea').toggleClass('d-none');
//         }
//     }

//     restartButton.addEventListener('click', (e) => {
//         gameStart = true;
//         firstTime = false;
//         currentScore = 0;
//         $('#restartArea').toggleClass('d-none')
//         $('#wordguess').toggleClass('d-none');
//         $('#wordPicked').toggleClass('d-none');
//         $('#gameStats').toggleClass('d-none');
//         $('#timeDisplay').show();
//     })
// })
})