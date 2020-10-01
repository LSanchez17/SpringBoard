class MathFunctions{
    //Calculates the mode, median, and mean.  Does not require any data at all, 
    //Can simply be called and the class populates itself, if specific answers are wanted
    //Class can receive any of the three math methods and any numeric array
    constructor(method = 'all', numbers = []){
        this.method = method;
        this.numbers = numbers.length ? numbers: this.randomNumbers();
        this.results = this.calculate(this.method, this.numbers);
    }

    doAllThree(){
        let mathStuff = [`Mean: ${this.calculate('mean', this.numbers)}`, 
                        `Median: ${this.calculate('median', this.numbers)}`, 
                        `Mode: ${this.calculate('mode', this.numbers)}`];
        return mathStuff;
    }

    calculate(method, numbers){
        if(method.toLowerCase() === 'mean'){
            return numbers.reduce((a,b) => a+b, 0)/numbers.length;
        }
        else if(method.toLowerCase() === 'median'){
            if(numbers.length % 2 === 0){
                return ((numbers[(numbers.length/2)-1] + (numbers[numbers.length/2]))/2);
            }
            else{
                return numbers[Math.round((numbers.length-1)/2)];
            }
        }
        else if(method.toLowerCase() === 'mode'){
            let mode = {};
            numbers.forEach(item => {
                if(mode[item]){
                    mode[item]++; 
                }
                else{
                    mode[item] = 1;
                }
            })

            //Objects are NOT guaranteed to always be in order ;_;
            let highestTally = Object.keys(mode).map(key => mode[key]);
            let modeSet = new Set(highestTally);

            if(modeSet.size === 1){
                return 'No mode';
            }
           
            highestTally = Math.max.apply(null, highestTally);

            return Object.keys(mode).find(key => mode[key] === highestTally);
        }
        else{
            return this.doAllThree;
        }
    }
    
    randomNumbers(){
        let arr = [];
        let randomLenght = Math.floor(Math.random() * 100);

        while(randomLenght){
            let n = Math.floor(Math.random() * 1000);
            arr.push(n);
            randomLenght--;
        }
        return arr;
    }
}

let testing = new MathFunctions('mode');

module.exports = MathFunctions;