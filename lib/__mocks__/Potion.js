
// In the game, players will have an inventory of potions they can 
// use before each turn. On player creation, we want the inventory to start with two potions. 
// This could be as straightforward as calling new Potion() from within the Player() constructor.

// However, this does present an interesting situation in which one constructor is now 
// dependent on another. Sometimes this is unavoidable, though best practices 
// recommend having constructors do as little work as possible. For instance, if you 
// needed to call an API to help with the creation of your object, you definitely would 
// not want that API logic cluttering up your constructor. It would be better to 
// call the API first, then pass the API data in as arguments.

// For our game, we'll opt to create a new Potion object within the Player() constructor. 
// This gives us a great opportunity to explore how to properly test a function that is, 
// for whatever reasons, dependent on another function.

// Remember, a good test runs in isolation. Proper potion creation should be tested 
// separately from the player. That way, if something breaks with the Potion() 
// constructor, it only affects one test suite (the potion) instead of two (potion and player).

// So if a player creates a potion, how do we isolate the test? That's where mocks 
// come into play. Mocks allow us to fake assumed data, which allows the test at hand to 
// focus only on the logic it cares about.

// Let's create a mock for the Potion() constructor. In the lib directory, 
// create a new directory called __mocks__. Did you notice how the double underscore 
// syntax matches the __tests__ directory?

// In the lib/__mocks__ directory, create a new file called Potion.js. When mocking, 
// Jest will always look for a matching mock file in the same location as the 
// module being mocked. In this case, lib/__mocks__/Potion.js matches lib/Potion.js.

// This is a very simplified version of the Potion() constructor you wrote earlier. 
// The mock doesn't need to incorporate any random logic; it just needs to return 
// valid values that the Player object can later use.
module.exports = function() {
    this.name = 'health';
    this.value = 20;
};