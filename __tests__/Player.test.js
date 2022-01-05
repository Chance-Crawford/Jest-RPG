
// see google docs node.js - notes, jest
const Player = require('../lib/Player');

const Potion = require('../lib/Potion');

// The require() line imports the Potion() constructor into the test, 
// establishing Potion as a usable variable (otherwise new Potion() would 
// throw an error). Then jest.mock() mocks/replaces the constructor's implementation 
// with our faked data.

// Now if new Potion() is ever called within the test file itself or 
// (more importantly) any of the subsequent modules attached to the test, the mocked 
// data will be returned.

// see this in action by using 
// console.log(new Potion());

// The name will always be 'health', and the value will always be 20, 
// because our mocked potion replaced the real Potion() constructor. 
// This means we can rest easy knowing that our player tests are no longer tied to 
// the Potion() constructor's existence or how it's implemented.
jest.mock('../lib/Potion');


test('creates a player object', () => {
    // it's important to create a new instance of the object we're 
    // testing in every test to give that test a fresh start.
    const player = new Player('Dave');
  
    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    // player object should have a property called inventory
    // that contains an array that has at least one object.
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});


test("gets player's stats as an object", () => {
    const player = new Player('Dave');
  
    // Here, we're checking that player.getStats() returns an object 
    // with four specific properties.
    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});


test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');
  
    expect(player.getInventory()).toEqual(expect.any(Array));
  
    // On player creation, the inventory should already have something in it, 
    // so a call to player.getInventory() should return an array. There's also 
    // the case of an empty inventory needing to return false. You can simulate 
    // an empty array yourself by setting player.inventory = [] before the next 
    // expect() runs.
    player.inventory = [];
  
    expect(player.getInventory()).toEqual(false);
});


test("gets player's health value", () => {
    const player = new Player('Dave');
  
    // The expect.stringContaining() method is an expect method that we can use to make 
    // sure our string includes our player's health. This is preferred in this case 
    // because we might need flexibility to change how the player's health will be displayed. 
    // This way, if that change happens, we won't need to update our test as well.
    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});


test('checks if player is alive or not', () => {
    const player = new Player('Dave');
  
    expect(player.isAlive()).toBeTruthy();
  
    // Here, we're updating the value of our Player health halfway through the test so 
    // that we can check for both conditions: true and false.
    player.health = 0;
  
    expect(player.isAlive()).toBeFalsy();
});

// Now we can write another test to handle the reduceHealth() method to see if 
// the correct amount of health is being subtracted from the Player health property:
test("subtracts from player's health", () => {
    const player = new Player('Dave');
    const oldHealth = player.health;
  
    player.reduceHealth(5);
  
    expect(player.health).toBe(oldHealth - 5);
  
    player.reduceHealth(99999);
  
    expect(player.health).toBe(0);
});

test("gets player's attack value", () => {
    const player = new Player('Dave');

    // As mentioned previously, it's hard to test for randomness within a range.
    // so we hard set a value of 10 for the property.
    player.strength = 10;
  
    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

// checks if a potion was added correctly
// and addPotion() works as it should.
test('adds a potion to the inventory', () => {
    const player = new Player('Dave');
    const oldCount = player.inventory.length;
  
    // Note that again, we're using the Potion mock
    // We are only focused on testing whether or not our Player 
    // has added the Potion to its inventory. If we used the actual Potion, 
    // then our test would no longer be an isolated unit test.
    player.addPotion(new Potion());
  
    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

// tests usePotion() to remove potion from inventory
test('uses a potion from inventory', () => {
    const player = new Player('Dave');
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;
  
    player.usePotion(1);
  
    expect(player.inventory.length).toBeLessThan(oldCount);
});