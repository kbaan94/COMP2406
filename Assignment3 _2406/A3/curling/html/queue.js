/*
  (c) 2018 Louis D. Nel
  This class represents a first-in last-out queue  elements
*/
class Queue {
  //let collection = []  //NOT ALLOWED WITH CLASSES
  constructor() {
    this.collection = []
  }

  setQueue(t) {

    if (t == null) return;
    if (t.collection != null) {
      for (var i = 0; i < t.collection.length; i++) {
        this.collection[i].x = t.collection[i].x;
        this.collection[i].y = t.collection[i].y;
        this.collection[i].radius = t.collection[i].radius;
        this.collection[i].colour = t.collection[i].colour;
        this.collection[i].velocityX = t.collection[i].velocityX;
        this.collection[i].velocityY = t.collection[i].velocityY;
        this.collection[i].isMoving = t.collection[i].isMoving;
      }
    }
  }
  getCollection(){return this.collection}

  size(){return this.collection.length}

  isEmpty(){return this.size() === 0}

  front(){
    if(this.isEmpty()) return null
    return this.collection[0]
  }

  enqueue(anElement) {
    //add anElemen to the tail for the queue
    this.collection.push(anElement)
  }
  dequeue(){
    //dequeue and return the front element of the queue
    if(this.size() === 0) return null
    let front = this.collection[0]
    this.collection = this.collection.splice(1)
    return front
  }
  addAll(...elements) {
    //add element x if no current element === x
    for(let anElement of elements)
       this.enqueue(anElement)
  }

  remove(anElement) {
    //remove first occurence of element === x
    let position = this.collection.indexOf(anElement)
    if (position > -1) this.collection = this.collection.splice(position, 1)
  }

  contains(anElement) {
    //answer whether set contains element === x
    return this.collection.indexOf(anElement) > -1
  }

  toString() {
    return this.collection.toString()
  }
}
