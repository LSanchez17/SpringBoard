/** product: calculate the product of an array of numbers. */
const product = (nums) => {
  if(nums.length === 0){
    return 1;
  }

  return nums.pop() * product(nums);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, idx=0, longestIteration=0) {
  // let wordLength = 0;

  // if(words.length === 1){
  //   wordLength = words[0].length;
  // }
  // console.log(wordLength, words)
  // return wordLength < words.shift().length ? longest(words) : wordLength;
  
  //exit condition
  if(idx === words.length){
    return longestIteration;
  }
  //which is bigger, the current word, or the previous longest word
  longestIteration = Math.max(words[idx].length, longestIteration);

  //try again
  return longest(words, idx+1, longestIteration);
}

/** everyOther: return a string with every other letter. */

function everyOther(str, idx=0, newStr='') {
  //exit condition
  if(idx >= str.length){
    return newStr;
  }

  //pass the current other letter
  newStr += str[idx];

  //try again
  return everyOther(str, idx+2, newStr);
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, idx=0) {
  let leftPtr = idx;
  let rightPtr = str.length-1-idx;

  //middle of string
  if(leftPtr >= rightPtr){
    return true;
  }

  if(str[leftPtr] !== str[rightPtr]){
    return false;
  }

  return isPalindrome(str, idx+1);
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, idx=0) {
  //exit condition
  if(idx === arr.length){
    return -1;
  }

  if(arr[idx] === val){
    return idx;
  }

  return findIndex(arr, val, idx+1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, idx=str.length-1, reverseString='') {
  if(idx < 0){
    return reverseString;
  }

  reverseString += str[idx];

  return revString(str, idx-1, reverseString);
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  //we need to check for nested objects, looping with recursion inside loop O_e
  let arr = [];

  for(let key in obj){
    if(typeof obj[key] === 'string'){
      arr.push(obj[key]);
    }
    if(typeof obj[key] === 'object'){
      arr.push(...gatherStrings(obj[key]));
    }
  }

  return arr;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, left=0, right=arr.length) {
  if(left > right){
    //value not found
    return -1;
  }

  //find the dividing point
  let middle = Math.floor((right+left)/2);

  if(arr[middle] === val){
    //is the middle our value?
    return middle;
  }
  //go left
  if(arr[middle] > val){
    //divide the array section again
    return binarySearch(arr, val, left=0, middle-1);
  }
  //go right
  return binarySearch(arr, val, middle+1, right);

}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
