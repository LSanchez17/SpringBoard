function merge(arr1, arr2){
    let result = [];
    let leftPtr = 0;
    let rightPtr = 0;

    while(leftPtr < arr1.length && rightPtr < arr2.length){
        if(arr1[leftPtr] < arr2[rightPtr]){
            result.push(arr1[leftPtr]);
            leftPtr++;
        }
        else{
            result.push(arr2[rightPtr]);
            rightPtr++;
        }
    }
    while(leftPtr < arr1.length){
        result.push(arr1[leftPtr]);
        leftPtr++;
    }
    while(rightPtr < arr2.length){
        result.push(arr2[rightPtr]);
        rightPtr++;
    }

    return result;
}

function mergeSort(arr){
    if(arr.length <= 1){
        return arr;
    }

    let mid = Math.floor(arr.length/2);
    let left = mergeSort(arr.slice(0,mid));
    let right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

module.exports = { merge, mergeSort};