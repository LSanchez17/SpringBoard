// add whatever parameters you deem necessary
function constructNote(stringyString, someLetters) {
    //can I build my stringyString with someLetters?
    //stringyString = 'abc'
    //someLetters = 'dcba'
    //a in dcba?, pop
    //b in dcba?, pop
    //c in dcba?, pop, any left? return true;
    //can use regex, but requires more time, but better for more complicated chars
    if(stringyString.length == 0){
        return true;
    };
    if(someLetters.length == 0){
        return false;
    };

    let lettersObject = {}
    for(let char of someLetters){
        if(lettersObject[char]){
            lettersObject[char] += 1;
        }
        else{
            lettersObject[char] = 1;
        }
    };

    let wordObject = {};
    for(let char of stringyString){
        if(wordObject[char]){
            wordObject[char] += 1;
        }
        else{
            wordObject[char] = 1;
        }
    };

    let matches = false;


    for(let key in wordObject){
        matches = false;
        if(wordObject[key] <= lettersObject[key]){
            matches = true;
        }
    };
    return matches;
}

