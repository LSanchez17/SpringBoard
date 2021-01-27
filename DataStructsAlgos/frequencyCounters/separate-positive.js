// add whatever parameters you deem necessary
function separatePositive(numArr) {
    //take out the negatives to right side
    //positives to right side
    if(numArr.every(num => num > 0)){
        return numArr;
    }

    if(numArr.every(num => num < 0)){
        return numArr;
    }

    let leftPtr = 0;
    let rightPtr = numArr.length-1;

    while(leftPtr < rightPtr){
        if(numArr[leftPtr] < 0 && numArr[rightPtr] > 0){
            let temp = numArr[leftPtr];
            numArr[leftPtr] = numArr[rightPtr];
            numArr[rightPtr] = temp;

            leftPtr++;
            rightPtr--;
        }
        else{
            if(numArr[leftPtr] > 0){
                leftPtr++;
            }
            else{
                rightPtr--;
            }
        }
    }
    return numArr;
}
