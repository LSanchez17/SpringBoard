function insertionSort(arr){
    //start by picking the second element in the array
    
    for(let i=1; i<arr.length; i++){
        let compare = arr[i];
        //how we compare the previous value
        let j = i-1;
        //now compare it and swap if neede until the end of the list
        //if we reach the end of the lsit, our element is where its supposed to be
        while(j > -1 && arr[j] > compare){
            //as long as our pointer is not negative(cant read negative array index)
            //and our 
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = compare;
    }
    return arr;
};

module.exports = insertionSort;
/*
[5,2,3,6,3,10]

compare = 2;
j = (i=1)-1 = 0
while(j(0) > -1 && arr[j](5) > compare(2))
    arr[j(0)+1] = arr[j(0)];
    [5,5,3,5,3,10];
    j--(-1); break loop
arr[-1+1](0) = compare(2);
[2,5,3,5,3,10] 
loop repeats
compare = arr[i(2)] = 3
j = (2-1) = 1
while(j(1) > -1 && arr[j(1)](5) > compare(3))
    arr[j(1)+1] = arr[2] = arr[j(1)] = arr[2] = arr[1]
    [2,5,5,5,3,10]
    j--;
    0 > -1 ? yes
    arr[0] = 2 > compare(3) ? no
    break loop
arr[0+1] = compare(3)
[2,3,4,4,3,10]
*/