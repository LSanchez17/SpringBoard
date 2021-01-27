// add whatever parameters you deem necessary
function longestFall(nums) {
  //we create a counter, and a max
  let counter = 1;
  let maxCounter = 0;

  // quick fail case if the array is empty
  if (nums.length === 0) {
    return 0;
  }

  for (let i = 1; i < nums.length; i++) {
    // if current number is smaller than the previous number
    if (nums[i] < nums[i - 1]) {
      //increase the counter
      counter++;
      //change the maximum, to be the differnece of counter and maxcounter
      maxCounter = Math.max(counter, maxCounter);
    } else {
      //if they are not smaller, increase counter by one
      counter = 1;
    }
  }

  // 1 is the default value for a non-empty array
  return maxCounter || 1;
}
