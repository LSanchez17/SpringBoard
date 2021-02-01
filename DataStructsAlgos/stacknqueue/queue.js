/** Node: node for a queue. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */
// First In, First out
// first person in line is the first and the last, then the second person comes in
// first person is still in line, second person is now last
// third person rolls up
// first person is still in line, second person is also in line, but no longer the last, third person is last now.
// first person enters, passes their title of first to second person

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */
  //DONE
  enqueue(val) {
    // console.log(`Queue length: ${this.size}`)
    //queue is empty, first item is last
    if(this.size === 0){
      let newNode = new Node(val);
      this.first = newNode;
      this.last = newNode;
      this.size++;

      return;
    }

    //node to be added to the end.
    let newNode = new Node(val);
    let lastNode = this.last;

    //The last node is the new one.
    this.last = newNode;
    //the previous node points to the last one!
    lastNode.next = this.last;

    this.size++;

    return;
    // Attempted through loop below, simplified above

    /* if(this.size === 1){
    *   this.last = new Node(val);
    *   this.first.next = this.last;
    *   this.size++;
    * }
    *
    * queue has more than two items in it
    * let currentNode = this.first;
    * 
    * while(currentNode.next){
    *  if(currentNode.next === this.last){
    *     let newNode = new Node(val);
    *     this.last.next = newNode;
    *     this.last = newNode;
    *     this.size++;
    *     return undefined;
    *   }
    *   currentNode = currentNode.next;
    * }
    */

  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    //while queue is empty, throw error, cant remove empty
    if(this.size === 0){
      throw new Error;
    }
    if(this.size === 1){
      let returnedValue = this.first;
      this.first = null;
      this.last = null;
      this.size--;

      return returnedValue.val;
    }

    let currentNode = this.first;

    this.first = currentNode.next;
    this.size--;

    return currentNode.val;
  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    return this.first.val;
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    if(this.size === 0 && this.first === null){
      return true;
    }
    return false;
  }
}

module.exports = Queue;
