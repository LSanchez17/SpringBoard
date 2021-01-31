/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    //creating a node, will give us a new Node class with a value, and 
    //nothing else to point to
    //so let firstNode = new Node('I am #1');
    //gives us NODE(VAL)-->Null
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals){
      this.push(val);
    }
  }


  traverse(){
    let currentNode = this.head;
    while(currentNode){
      // console.log(currentNode);
      currentNode = currentNode.next;
    }
  }
  /** push(val): add new value to end of list. */

  push(val) {
    if(this.length === 0){
      //start of the list;
      this.head = new Node(val);
      this.tail = new Node(val);
      this.length++;
      return;
    }

    let currentNode = this.head;

    while(currentNode){
      if(currentNode.next === null){
        currentNode.next = new Node(val);
        this.tail = currentNode.next;
        this.length++;
        return;
      }
      currentNode = currentNode.next;
    }
  
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    if(this.length === 0){
      this.push(val);
      return;
    }
    
    if(this.length === 1){
      let tempNode = this.head;
      this.head = new Node(val);
      this.head.next = tempNode;
      this.tail = tempNode;
      this.length++;
      return;
    }

    let tempNode = this.head;
    this.head = new Node(val);
    this.head.next = tempNode;
    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    if(this.length === 0){
      return undefined;
    }

    if(this.length === 1){
      let removedNode = this.head.val;
      this.head = null;
      this.tail = null;
      this.length--;
      return removedNode;
    }

    if(this.length === 2){
      let removedNode = this.tail.val;
      this.tail = this.head;
      this.length--;
      return removedNode;
    }

    //remove node and cancel tail for N-list lenght?
    let removedNode = this.tail.val;
    this.tail = null;
    
    let currentNode = this.head;
    while(currentNode.val){
      if(currentNode.next === null){
        this.tail = currentNode;
      }
      currentNode = currentNode.next;
    }
    return removedNode;
  }

  /** shift(): return & remove first item. */

  shift() {
    if(this.length === 0){
      return undefined;
    }

    if(this.length === 1){
      let removedNode = this.head.val;
      this.head = null;
      this.tail = null;
      this.length--;
      return removedNode;
    }

    if(this.length === 2){
      let removedNode = this.head.val;
      this.head = this.tail;
      this.length--;
      return removedNode;
    }
    //N-length list
    let removedNode = this.head.val;
    this.head = this.head.next;
    this.length--;

    return removedNode;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let currentNode = this.head;
    let nodeCount = 0;
    
    while(currentNode){
      if(nodeCount === idx){
        return currentNode.val;
      }

      nodeCount++;
      currentNode = currentNode.next;
    }

    // Loop try
    // for(let i=0; i<this.length; i++){
    //   if(idx === i){
    //     return vals[i].val;
    //   }
    // }
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let currentNode = this.head;
    let nodeCount = 0;

    while(currentNode){
      if(idx === nodeCount){
        currentNode.val = val;
        return currentNode;
      }

      nodeCount++;
      currentNode = currentNode.next;
    // }

    // Loop attempt
    // for(let i=0; i<this.length; i++){
    //   if(idx === i){
    //     vals[i].val = val;
    //   }
    // }
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    //empty list
    if(this.length === 0){
      this.push(val);
      return;
    }

    if(idx >= this.length){
      let newNode = new Node(val);
      let currentNode = this.tail;

      currentNode.next = newNode;
      this.tail = newNode;
      this.length++;
      return;
    }

    let currentNode = this.head;
    let nodeCount = 1;
    let tempNode = null;
    let newNode = new Node(val);

    while(currentNode){
      if(idx === nodeCount){
        tempNode = currentNode.next;
        currentNode.next = newNode;
        newNode.next = tempNode;
        this.length++;
        return;
      }
      nodeCount++;
      currentNode = currentNode.next;
    }

    // Loop attempt
    // for(let i=0; i<this.length; i++){
    //   if(idx === i){
    //     let tempNode = valsp[i-1].next;
    //     vals[i-1].next = val;
    //     vals[i].next =  tempNode;
    //   }
    // }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if(this.length === 0){
      return undefined;
    }

    if(this.length === 1){
      let Node = this.head;
      this.head = null;
      this.tail = null;
      this.length--;

      return Node;
    }

    if(idx === 2){
      if(idx === 0){
        let removedNode = this.head;
        this.head = this.tail;
        this.length--;
        
        return removedNode;
      }
      let removedNode = this.tail;
      this.tail = this.head;
      this.length--;

      return removedNode;
    }

    if(idx >= this.length){
      this.pop();
    }
    let currentNode = this.head;
    let nodeCount = 0;
    let removedNode = null;

    while(currentNode.next){
      //example
      //[1,2,3,4,5] length 5
      //remove index 3
      //[0-1,1-2,2-3,3-4,4-5]
      //so we should lose the number four and get [1,2,3,5]
      //is index-1(2) === nodeCount(0)? at element 1
      //is index-1(2) === nodeCount(1)? at element 2
      //is index-1(2) === nodeCount(2)? at element 3, YES
      //so we remove the pointer to the 4, and instead have 3 point to 5
      //save 3's point to four as the removed node, have 3's next point to 3's next.next(3->4->5)
      //return!
      if(idx-1 === nodeCount){
        //the node after this is what gets booted
        removedNode = currentNode.next;
        //where we are pointing before removed element
        currentNode.next = currentNode.next.next;
        
        removedNode.next = null;
        this.length--;

        return removedNode;
      }
      currentNode = currentNode.next;
      nodeCount++;
    }
    // first try!
    // for(let i=0; i<this.length; i++){
    //   if(idx === i){
    //     let removedNode = vals[i];
    //     vals[i-1].next = vals[i+1];
    //   }
    // }
    // return removedNode;
  }

  /** average(): return an average of all values in the list */

  average() {
    if(this.head === null){
      return 0;
    }

    let currentNode = this.head;
    let average = 0;
    let nodeCount = 0;

    while(currentNode){
      if(typeof currentNode.val === 'number'){
        average += currentNode.val;
      }
      nodeCount++;
      currentNode = currentNode.next;
    }

    return average/nodeCount;
  }
}

module.exports = LinkedList;
