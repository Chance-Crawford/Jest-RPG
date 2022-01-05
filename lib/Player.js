
const Potion = require("../lib/Potion.js");

// This is very similar to the Potion() constructor you created earlier. The 
// main difference is that the name parameter sets a default empty string if no 
// name is provided. This is another handy trick that came with ES6!
function Player(name = '') {
    this.name = name;
  
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    this.inventory = [new Potion('health'), new Potion()];

    // when putting methods in an object constructor, there is 2 different ways to do it.
    // one way to do it is using "this" such as, this.getStats = function(){...}
    // the other is using prototype such as, Player.prototype.getStats = function(){...}

    // Run the test again. It still passes! So what's the difference? Which one is 
    // preferable? At a glance, using this.methodName probably makes more sense. 
    // It clearly shows that you are creating methods for each player. Unfortunately, 
    // that's also the problem: it creates new methods for each player. 
    // If you have a game that creates 100 Player objects, your code will 
    // create a hundred getStats() methods.

    // When using prototype, however, you are only creating the method once on the constructor 
    // itself. New player objects simply inherit the method from the constructor 
    // rather than having their own instances of that method. Such inheritance can 
    // traverse multiple levels, meaning if the method being called doesn't exist on 
    // Player(), JavaScript will look for it on the next constructor up the chain. 
    // In this case, the next constructor would be the built-in Object data type.
    // In JavaScript, this is known as the prototype chain.

    // returns an object with various player properties
    // when called
    Player.prototype.getStats = function() {
        return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
        };
    };

    // returns the inventory array or false if empty
    Player.prototype.getInventory = function() {
        if (this.inventory.length) {
            return this.inventory;
        }
        return false;
    };

    Player.prototype.getHealth = function() {
        return `${this.name}'s health is now ${this.health}!`;
    };

    Player.prototype.isAlive = function() {
        if (this.health === 0) {
          return false;
        }
        return true;
    };

    Player.prototype.reduceHealth = function(health) {
        this.health -= health;
      
        if (this.health < 0) {
          this.health = 0;
        }
    };

    Player.prototype.getAttackValue = function() {
        const min = this.strength - 5;
        const max = this.strength + 5;
      
        return Math.floor(Math.random() * (max - min) + min);
    };

    Player.prototype.addPotion = function(potion) {
        this.inventory.push(potion);
    };

    Player.prototype.usePotion = function(index) {
        // gets inventory of the current Player object.
        // The .splice() method removes items from an array and returns 
        // the removed item(s) as a new array. 
        // Thus, two things are happening here: 
        // the original inventory array has 1 Potion removed at the specified 
        // index value and put into a new "removed items" array. then the Potion at 
        // index [0] of this "removed items" array is saved in a potion variable.
        // Both .push() and .splice() are methods on the Array prototype. This means 
        // that even built-in JavaScript data types are constructors themselves!
        const potion = this.getInventory().splice(index, 1)[0];
      
        switch (potion.name) {
          case 'agility':
            this.agility += potion.value;
            break;
          case 'health':
            this.health += potion.value;
            break;
          case 'strength':
            this.strength += potion.value;
            break;
        }
    };
}
  

module.exports = Player;