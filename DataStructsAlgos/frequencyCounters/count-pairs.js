// add whatever parameters you deem necessary
function countPairs(arr, pairValue) {
    //find pairs that equal pairValue, no dupilcates, may 
    //have more than one pair
    //pairValue: 6
    //[3,1,5,4,2]
    //pairs(1,5) && (2,4)
    //returns 2 pairs

    //can be refactored to run faster, if we are allotted 
    //the memory to create a hash map/table
    let pairs = [];
    let idx = 0;
    
    while(idx < arr.length){
        //current item in array
        let currNum = arr[idx];
        //The other item we need to find
        let missingPair = pairValue-currNum;
        //Does it exist, if it does its defined below
        let otherElement = arr.find(item => item === missingPair);
        //is it already inside the array? no duplicates
        let included = pairs.includes(currNum);
        // console.log(included)
        // console.log(otherElement, currNum)
        if(otherElement){
            if(!included && (otherElement !== currNum)){
                pairs.push(otherElement, currNum);
            }
        }
        idx++;
    }
    // console.log(pairs)
    return pairs.length == 0 ? 0 : pairs.length/2;
}
