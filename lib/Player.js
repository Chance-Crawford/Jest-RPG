
const Potion = require("../lib/Potion.js");

const Character = require('./Character');

// class keyword is similar to an object constructor function
// such as in potion.js
// classes are used for syntactic sugar and the constructor is defined inside of the class
// with a constructor function. A constructor function only needs to be made if 
// there is an argument that needs to be passed in when a new object from the class is
// being made, otherwise the constructor function can be omitted.

// the "extends" after player shows that the Player class is inheriting from
// the Character class. Therefore all of the methods and functionality defined
// in the Character class is now available to Player as well. Properties
// are not inherited yet though, that will be handled with the "super" function
// further below.
class Player extends Character{
    // This is very similar to the Potion() constructor you created earlier. The 
    // main difference is that the name parameter sets a default empty string if no 
    // name is provided. This is another handy trick that came with ES6!
    constructor(name = ""){

        // If you run the game or the test suites now, after inheriting from Character above, 
        // you'll get the following error: Must call super constructor in derived class 
        // before accessing 'this'. What does that even mean? Because the Player class has 
        // its own constructor() method, JavaScript wants to ensure that the parent constructor 
        // (in this case, the Character class) is properly initialized before Player starts 
        // assigning its own properties like this.inventory.

        // When we call super(name), it passes the name argument to the 
        // constructor() of the Character class, where name and other properties like 
        // health are officially defined. 
        // The Player class will then inherit all of the properties from Character's 
        // constructor after the initialization of the Character constructor from the
        // super() call is finished.
        // Afterwards, the Player class will add any 
        // additional properties like this.inventory to the object.
        // call parent constructor here:
        super(name);

        this.inventory = [new Potion('health'), new Potion()];
    }
    

    // we previously used ES5 inheritance for the player. here is how it was done
    // without classes:
    // Next, we're going to use JavaScript's Object.create() method to set up the 
    // inheritance between Player() and Character(). The Object.create() method is 
    // interesting in that it will create a new object and use the given argument 
    // as the prototype for that new object.

    // This means you can do something like Object.create(Character.prototype) 
    // to take all of the methods that exist on the Character() constructor's prototype 
    // and assign them as the prototype for another object.
    // For this to work, however, you must establish the inheritance before assigning 
    // any other methods to prototype. Otherwise, those methods will get overwritten.
    // inherit prototype methods from Character here:
    // Player.prototype = Object.create(Character.prototype);

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

    // ------------------------------------------------------------------------------


    // returns an object with various player properties
    // when called
    // when using classes, the prototype methods of the class
    // are just written normally. If the Player was not a class
    // and was just a function constructor, you would have to write a 
    // prototype method like this
    // Player.prototype.getStats = function() {...}
    getStats() {
        return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
        };
    };

    // returns the inventory array or false if empty
    getInventory() {
        if (this.inventory.length) {
            return this.inventory;
        }
        return false;
    };

    addPotion(potion) {
        this.inventory.push(potion);
    };

    usePotion(index) {
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