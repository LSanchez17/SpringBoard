// add whatever parameters you deem necessary
function averagePair(arr, average) {
    let keyNumber = average*2;
    for(let i=0; i<arr.length; i++){
        let oppositeNum = keyNumber-arr[i];
        let answer = arr.includes(oppositeNum);
        if(answer){
            return true;
        }
    }
    return false;
}
