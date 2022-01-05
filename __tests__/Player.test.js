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