/** Node: node for a stack. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

 //a stack of pancakes
 //first pancake is at the bottom :(
 //add another pancake
 //add another
 //cannot remove the first! until we eat the first(top pancake)
 //then the one below it is the new first
 //once we eat all the firsts, we can eat the last one!
 //JS event loop :D

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    if(this.size === 0){
      let newNode = new Node(val);

      this.last = newNode;
      this.first = newNode;
      this.size++;

      return;
    }

    //create the new node, get the top most item
    let newNode = new Node(val);
    let currentNode = this.first;

    //assign a link to the new top stack item, and reasign the first item
    currentNode.next = newNode;
    this.first = newNode;
    this.size++;

    return;
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    if(this.size === 0){
      throw new Error;
    }

    if(this.size === 1){
      let nodeVal = this.first.val;
      
      this.first = null;
      this.last = null;
      this.size--;

      return nodeVal;
    }

    let nodeVal = this.first.val;
    let currentNode = this.last;
    let nodeBeforeTop = null;
    let numberNodes = 0;

    //move from the beginning of the pile(bottom)
    //we reach before the top most node
    //we set that as the new top.
    //and remove its linke from top(first) node.
    
    while(numberNodes < this.size){
      if(currentNode.next === this.first){
        nodeBeforeTop = currentNode;
        nodeBeforeTop.next = null;
        
        this.first = nodeBeforeTop;
        this.size--;

        return nodeVal;
      }

      currentNode = currentNode.next;
     }
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    if(this.size === 0){
      return undefined;
    }
    return this.first.val;
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    if(this.size === 0 && this.last === null){
      return true;
    }
    return false;
  }
}

module.exports = Stack;
