
// see google docs javascript - notes, objects

// this is not using the ES6 class keyword as an example of how to write
// an object constructor without the class keyword.
function Potion(name) {

    this.types = ['strength', 'agility', 'health'];
    // If the Potion() constructor is called without any arguments, we will have it 
    // create a new potion with a random type.
    // sets name equal to the name argument or if no argument provided it sets name to
    // one of the random types from the array.
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

    if (this.name === 'health') {
        this.value = Math.floor(Math.random() * 10 + 30);
    } else {
        this.value = Math.floor(Math.random() * 5 + 7);
    }
  }
  
  module.exports = Potion;