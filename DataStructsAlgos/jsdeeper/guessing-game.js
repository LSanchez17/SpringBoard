function guessingGame() {
    let randomNumber = Math.floor(Math.random() * 100);
    let gameWin = false;
    let guesses = 0;
    return(function game(guess){
        if(guess > randomNumber && !gameWin){
            guesses++;
            return `${guess} is too high!`;
        }
        if(guess < randomNumber && !gameWin){
            guesses++;
            return `${guess} is too low!`;
        }
        if(guess == randomNumber && !gameWin){
            guesses++;
            gameWin = true;
            return `You win! You found ${randomNumber} in ${guesses} guesses.`;
        }
        if(gameWin){
            return 'The game is over, you already won!';
        }
    });
}
module.exports = { guessingGame };
