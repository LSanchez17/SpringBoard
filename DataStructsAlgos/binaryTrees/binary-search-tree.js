/*
*  Theres an issue where a neverneding stack call happens on my machine
*  Not quite sure why? even with using the solution code, it runs endlessly
*  To be furthered studied later
*/

class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if(this.root === null){
      this.root = new Node(val);
      return this;
    }

    let node = this.root;
    
    //Doesn't work for all cases :(
    //Attemp #1
    // while(node){
    //   if(!node.right){
    //     node.right = new Node(val);
    //     return this.root;
    //   } 
    //   if(!node.left){
    //     node.left = new Node(val);
    //     return this.root;
    //   }

    //   if(node.left){
    //     node = node.left;
    //   }
    //   else{
    //     node = node.right;
    //   }
    // }

    while(true){
      //if our value is less than our current node, go left
      if(val < node.val){
        //does this node have a left child?
        if(node.left === null){
          //create one for it
          node.left = new Node(val);
          return this;
        }
        else{
          //otherwise traverse the left child and repeat
          node = node.left;
        }
      }
      //if our value is greater than our current node, go right
      else if(val > node.right){
        if(node.right === null){
          node.right = new Node(val);
          return this;
        }
        else{
          node = node.right;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, currentNode = this.root) {
    if(!this.root){
      this.root = new Node(val);
      return this.root;
    }

    //this works but doesnt account for keeping a tree in order!
    // let currNode = this.root;
    // const recursiveInsert = (node) => {
    //   if(!node.right){
    //     node.right = new Node(val);
    //     return this.root;
    //   } 
    //   if(!node.left){
    //     node.left = new Node(val);
    //     return this.root;
    //   }

    //   recursiveInsert(node.left);
    //   recursiveInsert(node.right);
    // }

    // return recursiveInsert(currNode);

    /*
    *  A more organized tree outline
    */

    //this one makes the tree "balanced in values"
    if(val < currentNode.val){
      //does there exist a left node?
      if(!currentNode.left){
        //fill it and we are done
        currentNode.left = new Node(val);
        return this;
      }
      //otherwise keep calling the left children of any new nodes
      return this.insertRecursively(val, currentNode.left);
    }
    //Repeat, but to the right
    else{
      if(!currentNode.right){
        currentNode.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, currentNode.right);
    }

  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    //Works! woohoo!
    if(!this.root){
      return undefined;
    };

    let currNode = this.root;

    while(currNode){
      if(currNode.val === val){
        return currNode;
      }
      if(currNode.val > val){
        currNode = currNode.left;
      }
      else{
        currNode = currNode.right;
      }
    }

    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, currentNode = this.root) {
    if(!this.root){
      return undefined;
    };


    //Works, but doesn't account for a structured search approach
    //binary trees are in an order, not like regular trees!
    // const recurseMe = (node) => {
    //   if(node.val === val){
    //     return node;
    //   }
    //   if(node.left){
    //     recurseMe(node.left);
    //   }
    //   if(node.right){
    //     recurseMe(node.right);
    //   }
    // }

    // recurseMe(this.root);
    // return undefined;

    //if our value is less than the current node, go left
    if (val < currentNode.val) {
      //is this the end of the left traversal?
      if (currentNode.left === null) return undefined;
      //repeat the process!
      return this.findRecursively(val, currentNode.left);
    } 
    //if our value is greater than the current node, go right
    else if (val > currentNode.val) {
      if (currentNode.right === null) return undefined;
      return this.findRecursively(val, currentNode.right);
    }
    return currentNode;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    if(!this.root){
      return undefined;
    }

    let currNode = this.root;
    let visited = [];
  
    const traverseMe = (node) => {
      visited.push(node.val);
        //close, but no exit condition!
        // if(node.left){
        //   traverseMe(node.left);
        // }
        // if(node.right){
        //   traverseMe(node.right);
        // }
      
      //this goes left if there is both a node, left
      //the left hand expression HAS to exist, so therefore we call it
      node.left && traverseMe(node.left);
      //same but for the right
      node.right && traverseMe(node.right);
      return;
    }
    
    traverseMe(currNode);
    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    if(!this.root){
      return undefined;
    }

    let currNode = this.root;
    let visited = [];
  
    const traverseMe = (node) => {
      // if(node.left){
      //   traverseMe(node.left);
      // }
      // visited.push(node.val);
      // if(node.right){
      //   traverseMe(node.right);
      // }

      node.left && traverse(node.left); // go left if there's a left
      visited.push(node.val); // visit
      node.right && traverse(node.right); // go right if there's a right
      return;
    }

    traverseMe(currNode);
    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    if(!this.root){
      return undefined;
    }

    let currNode = this.root;
    let visited = [];
  
    const traverseMe = (node) => {
      // if(node.left){
      //   traverseMe(node.left);
      // }
      // if(node.right){
      //   traverseMe(node.right);
      // }
      // visited.push(node.val);

      node.left && traverse(node.left); // go left if there's a left
      node.right && traverse(node.right); // go right if there's a right
      visited.push(node.val); // visit
      return;
    }

    traverseMe(currNode);
    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    if(!this.root){
      return undefined;
    }

    //we use a queue structure here!
    let queue = [];
    let values = [];

    //we add to the queue the root
    queue.push(this.root);

    //while there are items in our queue
    //this now follows the similar structure of a n-ary tree travesal
    //minues the iteration for children nodes
    while(queue.length){
      //remove the first item in the queue
      node = queue.shift();
      //add the values to the list of valeus
      values.push(node.val);

      //does there exist a left child?
      if(node.left){
        //add it to the queue
        queue.push(node.left);
      }
      //does there exist a right child?
      if(node.right){
        //add it to the queue
        queue.push(node.right);
      }
    }

    return values;
  }
}

module.exports = BinarySearchTree;
