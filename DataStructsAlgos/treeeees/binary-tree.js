/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    //had some trouble understanding this one
    if(!this.root){
      return 0;
    }

    const delveShallow = (node) => {
      //if the current node has no kids
      if(node.left === null && node.right === null){
        //return one, once we traverse all the parts of this 2-n tree, we get the smallest value
        return 1;
      }
      if(node.left === null){
        //we have no child on the left, but one on the right, travel down that path next
        //we add one, since we are going down another level
        return delveShallow(node.right) + 1;
      }
      if(node.right === null){
        return delveShallow(node.left) + 1;
      }
      return (
        //call the recursion with both nodes if they both have children
        Math.min(delveShallow(node.left), delveShallow(node.right)) + 1
      );
    }

    return delveShallow(this.root);

  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    //same as before but the longest one now
    if(!this.root){
      return 0;
    }

    const delveDeep = (node) => {
      //if the current node has no kids
      if(node.left === null && node.right === null){
        //return one, once we traverse all the parts of this 2-n tree, we get the smallest value
        return 1;
      }
      if(node.left === null){
        //we have no child on the left, but one on the right, travel down that path next
        //we add one, since we are going down another level
        return delveDeep(node.right) + 1;
      }
      if(node.right === null){
        return delveDeep(node.left) + 1;
      }
      return (
        //call the recursion with both nodes if they both have children
        Math.max(delveDeep(node.left), delveDeep(node.right)) + 1
      );
    }

    return delveDeep(this.root);

  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    //again, lil confused, but working through each line for more understanding
    let result = 0;

    const recursiveSumation = (node) => {
      //exit condition for this recursive function
      //checking if the node is null(no value or children)
      if(node === null){ 
        return 0;
      }

      //we assign two variables
      //one handles the left part of the tree/subtree and the other the right
      let leftSum = recursiveSumation(node.left);
      let rightSum = recursiveSumation(node.right);

      //now, we do math here
      //we get the largest value of either the result itself, the nodes value
      //or the summation of the leftSum and rightSum
      result = Math.max(result, node.val + leftSum + rightSum);

      //again, we return the maximum value of the following items
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    //no we call the function with the root to start
    recursiveSumation(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    //no tree itself
    if(!this.root){
      return null;
    }

    //this uses breadfirst search(left to right along each tree depth)
    let queue = [this.root];
    let closestToValue = null;

    while(queue.length){
      //we remove the first node in the queue so we can access it
      let currentNode = queue.shift();
      //assign the value of the node to this variable
      let currentVal = currentNode.val;
      //Is the current value of this node, greater than our lowerBound passed in?
      let higherThanLowerBound = currentVal > lowerBound;
      //So we are larger than the lowerbound, but are we the smallest value vs 
      //what we assigned outside of this loop
      //the first time it will "mark" it to be reassigned(its a conditional answer)
      //so at first closestToValue IS null, so we will reasign, with a true answer
      let reassignClosestValueVar = currentVal < closestToValue || closestToValue === null;

      //if both of the conditions are true, we are greater than the lowerboud
      //we are also needing to be reassigned, then continue on
      if(higherThanLowerBound && reassignClosestValueVar){
        //now our target smallest value, has to be the current value
        closestToValue = currentVal;
      }

      //do we have any children? if so pack em on!
      if(currentNode.left){
        queue.push(currentNode.left);
      }
      if(currentNode.right){
        queue.push(currentNode.right);
      }
    }

    return closestToValue;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
