const Potion = require('./Potion');

const Character = require('./Character');

class Enemy extends Character{
  constructor(name, weapon){

    // see Player.js for notes
    super(name);

    this.weapon = weapon;
    this.potion = new Potion();

  }
  

  // old way to inherit from Character here, 
  // replace by class. see player.js for notes.
  // Enemy.prototype = Object.create(Character.prototype);

  getDescription() {
    return `A ${this.name} holding a ${this.weapon} has appeared!`;
  };
}

module.exports = Enemy;