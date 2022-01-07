
// this is the parent object which Player and Enemy
// are going to inherit some of their shared methods from.
// this follows the prototype chain of inheritance by passing
// the character prototype methods and properties down to the 
// player and enemy prototypes which inherit from Character.
class Character {

    // this constructor allows for the Player and enemy classes
    // to inherit these properties with a call to the 
    // super() function.
    constructor(name = '') {
        this.name = name;
        this.health = Math.floor(Math.random() * 10 + 95);
        this.strength = Math.floor(Math.random() * 5 + 7);
        this.agility = Math.floor(Math.random() * 5 + 7);
    }


    isAlive() {
        if (this.health === 0) {
          return false;
        }
        return true;
    }
      
    getHealth() {
        return `${this.name}'s health is now ${this.health}!`;
    }
      
    getAttackValue() {
        const min = this.strength - 5;
        const max = this.strength + 5;
      
        return Math.floor(Math.random() * (max - min) + min);
    }
      
    reduceHealth(health) {
        this.health -= health;
      
        if (this.health < 0) {
          this.health = 0;
        }
    }
}



module.exports = Character;