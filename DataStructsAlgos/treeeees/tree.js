/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
  //if no kids, or anything really, return 0
  if(!this.root){
    return 0;
  }
  
  //being witht the root node
  let total = this.root.val;

  //traverse down the nodes
  const recusiveTraversal = (node) => {
    //check for kids
    for(let child of node.children){
      total += child.val;
      //does THIS child have children as well, if so repeat
      if(child.children.length > 0){
        recusiveTraversal(child);
      }
    }
  }

  recusiveTraversal(this.root);
  return total;

  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    //Similar, new condition through traversal

    if(!this.root){
      return 0;
    }

    let totalEvens = this.root.val % 2 === 0 ? this.root.val : 0;

    const recursiveTraversalConditional = (node) => {
      //continue on until no kids are below the kids
      for(let child of node.children){
        //is it even
        if(child.val % 2 === 0){
          totalEvens ++;
        }
        //repeat for this child's kids
        if(child.children.length > 0){
          recursiveTraversalConditional(child);
        }
      }
    }

    recursiveTraversalConditional(this.root);
    return totalEvens;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    //similar as the previous but nore nuance

    if(!this.root){
      return 0;
    }

    let total = this.root.val > lowerBound ? this.root.val : 0;

    const recusiveTraversalConditions = (node) => {
      for(let child of node.children){
        if(child.val > lowerBound){
          total++;
        }
        if(child.children.length > 0){
          recusiveTraversalConditions(child);
        }
      }
    }

    recusiveTraversalConditions(this.root);
    return total;
  }
}

module.exports = { Tree, TreeNode };
