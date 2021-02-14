class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let node of vertexArray){
      this.nodes.add(node);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {    
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    if(this.nodes.has(vertex)){
      this.nodes.delete(vertex);
    }

    let currentNodes = this.nodes.entries;

    for(let node in currentNodes){
      if(node.adjacent.has(vertex)){
        node.adjacent.delete(vertex);
      }
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let needToVisit = [start];
    let seenNodes = new Set(needToVisit);
    let result = [];

    while(needToVisit.length){
      //get start Node/future nodes
      let currNode = needToVisit.pop();

      //add to our list
      result.push(currNode.value);

      //for each node that is connected to this one
      for(let neighboor of currNode.adjacent){
        //have we visited this node before?
        if(!seenNodes.has(neighboor)){
          //if we havent visite this node, add it to our stack
          needToVisit.push(neighboor);
          seenNodes.add(neighboor);
        }
      }
    }

    console.log(result)
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let needToVisit = [start];
    let seenNodes = new Set(needToVisit);
    let result = [];

    while(needToVisit.length){
      //get start Node/future nodes
      let currNode = needToVisit.shift();

      //add to our list
      result.push(currNode.value);

      //for each node that is connected to this one
      for(let neighboor of currNode.adjacent){
        //have we visited this node before?
        if(!seenNodes.has(neighboor)){
          //if we havent visite this node, add it to our stack
          needToVisit.push(neighboor);
          seenNodes.add(neighboor);
        }
      }
    }

    console.log(result)
    return result;
  }
}

module.exports = {Graph, Node}