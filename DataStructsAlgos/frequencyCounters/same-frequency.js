// add whatever parameters you deem necessary
function sameFrequency(numOne, numTwo) {
    numOne = numOne.toString().split('');
    numTwo = numTwo.toString().split('');

    let numOneObj = {};
    let numTwoObj = {};
    let similar = false;

    for(let char of numOne){
        if(numOneObj[char]){
            numOneObj[char]++;
        }
        else{
            numOneObj[char] = 1;
        }
    }

    for(let char of numTwo){
        if(numTwoObj[char]){
            numTwoObj[char]++;
        }
        else{
            numTwoObj[char] = 1;
        }
    }

    // console.log(numOneObj, numTwoObj)

    for(let keys in numOneObj){
        // console.log(`comparing...${numOneObj[keys]} with ${numTwoObj[keys]}`)
        if(numOneObj[keys] === numTwoObj[keys]){
            // console.log('here')
            similar = true;
        }
        else{
            return false;
        }
    }

    return similar;
}
