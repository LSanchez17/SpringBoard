// add whatever parameters you deem necessary
function pivotIndex(nums) {
  //interesting code to review, not sure if the reccomended break
  //should be used

  //we create a sum of the entire array
  let rightSum = nums.reduce((a, b) => a + b, 0);
  //we create a pointer set to 0
  let leftSum = 0;
  //we initialize a pivot to -1 to assume false
  let pivotIdx = -1;
  //we loop through the array
  for (let i = 0; i < nums.length; i++) {
    //we add the i-th element of the array to the initial pointer at 0
    //if is is equal to our array sum
    //we turn the pivot into the current i-th index
    leftSum += nums[i];
    if (leftSum === rightSum) {
      pivotIdx = i;
      break;
    }
    //otherwise, we subtract from our sum our current number
    rightSum -= nums[i];
  }
  return pivotIdx;
}
