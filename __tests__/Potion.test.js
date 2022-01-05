const Potion = require("../lib/Potion.js");


test('creates a health potion object', () => {
    // invoke the constructor function to create a new potion object
    // and pass it the string "health" as a parameter
    const potion = new Potion();
    
    // expect is a method from jest that runs a function with any parameters
    // or property
    // inside the parentheses , it takes the 
    // result returned from the value in the parentheses and checks it to
    // be equal or to be a particular value.
    expect(potion.name).toEqual(expect.any(String));
    expect(potion.name.length).toBeGreaterThan(0);
    // The expect.any() method takes a constructor as an argument. Here, 
    // we're expecting that the value property is created with a Number() constructor. 
    // In this instance, we allow the value to be any number, rather than a number in a 
    // range so that the test has more flexibility. This general test allows us to 
    // avoid testing the random number generator hundreds of times to make sure that it works.
    expect(potion.value).toEqual(expect.any(Number));
});