/*
*  Given an array of 1s and 0s which has all 1s first followed by all 0s, 
*  write a function called countZeroes, which returns the number of zeroes in the array.
*  console.log(countZero([1,1,1,1,0,0])) // 2
*  console.log(countZero([1,0,0,0,0])) // 4
*  console.log(countZero([0,0,0])) // 3
*  console.log(countZero([1,1,1,1])) // 0
*/
const countZeroes = (arr) => {
    let totalZero = 0;

    let idx = 0;
    let leftPtr = arr[idx];
    let rightPtr = arr[arr.length-1-idx];

    while(idx !== arr.length){
        idx++;
        if(leftPtr == 0){
            totalZero++;
            leftPtr=arr[idx];
        }
        if(rightPtr == 0){
            totalZero++;
            rightPtr=arr[arr.length-1-idx];
        }
        if(arr.indexOf(leftPtr) === arr.indexOf(rightPtr) && (leftPtr == 0 && rightPtr == 0)){
            totalZero++;
            return totalZero;
        }
    }
    return totalZero;
}

/*
*  Given a sorted array and a number, write a function called sortedFrequency 
*  that counts the occurrences of the number in the array
*  
*  sortedFrequency([1,1,2,2,2,2,3],2) // 4
*  sortedFrequency([1,1,2,2,2,2,3],3) // 1
*  sortedFrequency([1,1,2,2,2,2,3],1) // 2
*  sortedFrequency([1,1,2,2,2,2,3],4) // -1
*/
const sortedFrequency = (arr, targetVal) => {
    let occurence = 0;

    arr.forEach(item => {
        if(item === targetVal){
            occurence++;
        }
    })

    return occurence;
}

/*
* Write a function called findRotatedIndex which accepts a rotated array of
* sorted numbers and an integer. The function should return the index of num
* in the array. If the value is not found, return -1.
*/
const findRotatedIndex = (arr, num) => {
    let idxNum = -1;

    arr.forEach((item,idx) => {
        if(item === num){
            idxNum = idx;
        }
    })
    return idxNum == -1 ? -1: idxNum;
}

/*
* Write a function called findRotationCount which accepts an array of distinct 
* numbers sorted in increasing order. The array has been rotated 
* counter-clockwise n number of times. Given such an array, find the value of n.
*/
const findRotationCount = (arr, arrStart=0, arrEnd=arr.length - 1) =>{
    //recursion in divide n conquer exercises, interesting?
    if(arrEnd < arrStart){
        return 0;
    }
    if(arrEnd === arrStart){
        return arrStart;
    }
    
    let arrMid = Math.floor((arrStart + arrEnd) / 2);

    //Checks for middle element + 1 being the middle
    if(arrMid < arrEnd && arr[arrMid + 1] < arr[arrMid]){
        return arrMid + 1;
    }

    //Checks for middle element being the middle
    if(arrMid > arrStart && arr[arrMid] < arr[arrMid - 1]){
        return arrMid;
    }

    //Which side gets recursed, left or right
    if(arr[arrEnd] > arr[arrMid]){
        return findRotationCount(arr, arrEnd, arrMid - 1);
    }

    return findRotationCount(arr, arrMid+1, arrEnd);
}

/*
* Write a function called findFloor which accepts a sorted array and a 
* value x, and returns the floor of x in the array. The floor of x in 
* an array is the largest element in the array which is smaller than 
* or equal to x. If the floor does not exist, return -1.
*/
const findFloor = (arr, floor) => {
    //we have some edge cases to check for
    //we find the middle of the array, if it matches, cool return it, else proceed
    //if the middle is less than our floor, search the left side
    //if the middle is greater than our floor, search the righ side
    //if nothing matches, return -1
   
    if(arr.length === 0){
        return -1;
    }

    let middle = Math.floor(arr.length/2);
    let highest = 0;

    if(arr[middle] === floor){
        return middle;
    }

    if(floor > arr[middle]){
        //search the left
        for(let i=middle; i<arr.length; i++){
            if(highest < arr[i]){
                highest = arr[i];
            }
            if(arr[i] === floor){
                return arr[i];
            }
            if(arr[i] > floor){
                return arr[i-1];
            }
        }
        if(highest > floor){
            return -1
        }
        return highest;
    }
    if(floor < arr[middle]){
        for(let i=0; i<middle; i++){
            if(highest < arr[i]){
                highest = arr[i];
            }
            if(arr[i] === floor){
                return arr[i];
            }
            if(arr[i] > floor){
                if(arr[i-1]){
                    return arr[i-1];
                }
                return -1;
            }
        }
        if(highest > floor){
            return -1;
        }
        return highest;
    }
    return -1;
}
console.log(findFloor([1,2,8,10,10,12,19], 9)) // 8
console.log(findFloor([1,2,8,10,10,12,19], 20)) // 19
console.log(findFloor([1,2,8,10,10,12,19], 0)) // -1
