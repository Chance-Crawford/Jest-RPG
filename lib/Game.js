
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
        // destructure name property from the returned prompt object
        // to get name value
        // This is the perfect case where ES6 arrow shorthand is 
        // necessary versus just being a nicety. 
        // The function keyword would have created a new lexical 
        // scope where "this" no longer references the Game object. 
        // To avoid this problem, use the arrow shorthand for all inquirer 
        // callbacks in this project!
        .then(({ name }) => {
            this.player = new Player(name);

            this.startNewBattle();
        });
    };

    // The startNewBattle() method will be called to kick off the first 
    // battle and then called again anytime a new round starts.
    Game.prototype.startNewBattle = function() {
        if (this.player.agility > this.currentEnemy.agility) {
          this.isPlayerTurn = true;
        } else {
          this.isPlayerTurn = false;
        }

        // Next, we need to display the Player stats. Earlier, we created 
        // (and tested!) a method called getStats() that returned an object. 
        // We could console-log each property from this object line by line, 
        // but there's another console method we can use to print a formatted table of data.
        console.log('Your stats are as follows:');
        console.table(this.player.getStats());

        console.log(this.currentEnemy.getDescription());

        this.battle();
    };


    // The battle() method is the main event of the game that will run an indefinite 
    // number of times. Each time, it will either be the Player turn or the Enemy turn.
    Game.prototype.battle = function() {
        if (this.isPlayerTurn) {
            // player prompts will go here
            inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potion']
            })
            // destructure response object to get the chosen action
            // from the action property.
            .then(({ action }) => {
                if (action === 'Use potion') {
                    // the getInventory() method returns false if the player 
                    // inventory is empty.
                    //  If the inventory is empty, immediately 
                    // return to end the Player turn.
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potions!");

                        return this.checkEndOfBattle();
                    }
                    
                    inquirer
                    .prompt({
                        type: 'list',
                        message: 'Which potion would you like to use?',
                        name: 'action',
                        // the usePotion() method we set up and tested earlier 
                        // requires the index of the object in the array 
                        // (e.g., usePotion(0)). How can we preserve the indexes if the 
                        // inquirer package only returns a string value?

                        // choices displays choices from an array like 
                        // ['choice1', 'choice2']

                        // One solution would be to populate the choices array with strings 
                        // that contain the Potion name and its index (e.g., '1: health'), 
                        // then strip out the index after the user has chosen. We can do 
                        // this using the Array.prototype.map() method.
                        // Note that the map() callback has a second optional 
                        // parameter to capture the index of the item.
                        choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                    })
                    .then(({ action }) => {
                        // When the user selects a Potion, the returned value will be a 
                        // string like '2: agility'. We can use the String.prototype.split() 
                        // method, though, to split on the ': ', giving us an array with the 
                        // number and Potion name (e.g., ['2', 'agility']). Subtracting 1 
                        // from the number will put us back at the original array index.
                        const potionDetails = action.split(': ');
                    
                        this.player.usePotion(potionDetails[0] - 1);
                        console.log(`You used a ${potionDetails[1]} potion.`);

                        this.checkEndOfBattle();
                    });

                } else {
                    // player attacks the enemy
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());

                    this.checkEndOfBattle();
                }
                });

        } else {
            // enemy is attacking the player
            const damage = this.currentEnemy.getAttackValue();
            this.player.reduceHealth(damage);
        
            console.log(`You were attacked by the ${this.currentEnemy.name}`);
            console.log(this.player.getHealth());

            this.checkEndOfBattle();
        }
    };

    // This checkEndOfBattle() method will need to run immediately after 
    // the Player or Enemy has taken their turn.
    // It's important to define these conditions, because we'll have to 
    // call our checkEndOfBattle() after each one. We can't just call 
    // checkEndOfBattle() at the end of battle(). The inquirer prompts are 
    // asynchronous, so we must wait for their promises to be resolved and perform our 
    // "end turn" logic in their callbacks.
    Game.prototype.checkEndOfBattle = function() {

        if (this.player.isAlive() && this.currentEnemy.isAlive()) {
            // if both are alive, switch the status of player turn
            // so that the turn changes.
            this.isPlayerTurn = !this.isPlayerTurn;
            // battle again with the opposite contestant attacking.
            this.battle();
        }
        // Player is still alive but the Enemy has been defeated
        // If this is the case, the Player is awarded a Potion, 
        // and the roundNumber increases.
        else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
            console.log(`You've defeated the ${this.currentEnemy.name}`);
          
            this.player.addPotion(this.currentEnemy.potion);
            console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);
          
            this.roundNumber++;
          
            // a new battle should start if there are eneimies still
            // left to fight.
            if (this.roundNumber < this.enemies.length) {
                this.currentEnemy = this.enemies[this.roundNumber];
                this.startNewBattle();
            } else {
                // // However, it's possible there are no more enemies to fight, in which case 
                // the Player has won the overall game.
                console.log('You win!');
            }
        }
        // Finally, the Player might have been defeated, marking the end of the game.
        else {
            console.log("You've been defeated!");
        }
    };
}

module.exports = Game;