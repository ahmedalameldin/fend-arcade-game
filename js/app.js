// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // X pos
    // Y pos
    this.y = 0;
    this.x = 0;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if enemy is not passed boundary
        // move forward
        // increment x by speed * dt
    // else
        // reset to start point
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player Class "Hero"
class Hero {
    constructor() {
        // Top left corner of the board
        this.x = 0;
        this.y = 0;

        // Spaces between blocks, this numbers comes from engine.js
        this.jump = 83;
        this.step = 101;

        // Start place on the bottmo middle row
        this.startX = 202;
        this.startY = 405;

        // update the init location for our player "Hero"
        this.x = this.startX;
        this.y = this.startY;

        // This is the image of the player
        this.sprite = "images/char-boy.png";

    }

    // Constructor

        // Properties :
            // x pos
            // y pos
            // sprite img

        // Methods :

            // update()
                // check collasion here
                // did player x and y collide with enemy?
                // did the player touch the top row?

            // render()
                // Draw player sprite on current x & y position?
                render() {
                    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
                }

            // handleInput()
                // handle keyboard input to move the player x or y
                // @param {string} input - Direction to travel

                handleInput(input) {
                    switch(input) {
                        case 'left' : if (this.x > 0) { this.x -= this.step }
                        break;
                        case 'up' : if (this.y > 0) { this.y -= this.jump }
                        break;
                        case 'right' : if (this.x < this.step * 4) { this.x += this.step }
                        break;
                        case 'down' : if (this.y < this.jump * 4) { this.y += this.jump }
                        break;

                    } console.log(`x: ${this.x} | y: ${this.y}`);
                }

            // Reset
                // Reset the position x & y to the player to old location

}

const player = new Hero();
const bugTest = new Enemy();
const allEnemies = [];
allEnemies.push(bugTest);


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

    // New player object "Hero"

    // init allEnemies array
    // for each enemy create & push Enemy object into above array




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

