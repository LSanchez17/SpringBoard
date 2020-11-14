import foodArr from './food';
import {choice, remove} from './helpers';

class FruitPicker {

    static fruitful(fruits){
        let fruitPicked = choice(fruits);
        let notThere = remove(fruits, fruitPicked);

        console.log(`Id like one RANDOMFRUIT, please`);
        console.log(`Here you go: ${fruitPicked}`);
        console.log(`Delicious! May I have another?`);
        if(notThere){
            console.log(`Sure, we had an extra one!`);
        }
        else{
            console.log(`Im sorry, we are all out.  We only have ${fruits} left`);
        }
    }
}
console.log(foodArr)
console.log(FruitPicker.fruitful(foodArr));