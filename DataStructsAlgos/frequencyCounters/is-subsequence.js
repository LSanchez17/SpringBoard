// add whatever parameters you deem necessary
function isSubsequence(subStr, word) {
    //checks if the chars in the first appear in the second
    //'tello' in 'otello' yes
    let idx = 0;
    // console.log(subStr, word)
    for(let i=0; i<word.length; i++){
        if(word[i] === subStr[idx]){
            // console.log(word[i], subStr[idx])
            idx++;
        }
        if(idx === subStr.length){
            return true;
        }
    }
    return false;
}
