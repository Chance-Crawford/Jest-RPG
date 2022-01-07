
// A Game object won't interface directly with Potion objects; that's 
// something only the Player and Enemy objects need to know about.
// The inquirer package provides user-friendly options for prompting 
// a user on the command line. The user's answers are then returned in 
// asynchronous callback functions.
const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    // Note that currentEnemy and player are currently undefined. 
    // That's fine. We'll assign them when the initializeGame() method is called. 
    // Including them now simply helps convey which properties a Game object 
    // is intended to have.
    this.currentEnemy;
    this.player;

    Game.prototype.initializeGame = function() {
        this.enemies.push(new Enemy('goblin', 'sword'));
        this.enemies.push(new Enemy('orc', 'baseball bat'));
        this.enemies.push(new Enemy('skeleton', 'axe'));

        // We also need to keep track of which Enemy object is currently 
        // fighting the Player. When the game starts, this would be the 
        // first object in the array.
        this.currentEnemy = this.enemies[0];

        // The last thing initializeGame() needs to do is prompt the 
        // user for their name, which will become the Player name.
        inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        // destructure name from the prompt object
        // This is the perfect case where ES6 arrow shorthand is 
        // necessary versus just being a nicety. 
        // The function keyword would have created a new lexical 
        // scope where "this" no longer references the Game object. 
        // To avoid this problem, use the arrow shorthand for all inquirer 
        // callbacks in this project!
        .then(({ name }) => {
            this.player = new Player(name);

            // test the object creation
            console.log(this.currentEnemy, this.player);
        });
    };
}

module.exports = Game;