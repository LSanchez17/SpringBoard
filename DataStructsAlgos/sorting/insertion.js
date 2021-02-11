function insertionSort(arr){
    //start by picking the second element in the array
    
    for(let i=1; i<arr.length; i++){
        let compare = arr[i];
        //how we compare the previous value
        let j = i-1;
        //now compare it and swap if neede until the end of the list
        //if we reach the end of the lsit, our element is where its supposed to be
        while(j > -1 && arr[j] > compare){
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = compare;
    }
    return arr;
};

module.exports = insertionSort;