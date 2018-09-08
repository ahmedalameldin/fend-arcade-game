// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y + 55;
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
    this.speed = speed;
    this.gameOver = false;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // console.log(`Enemy x: ${this.x} | y: ${this.y}`);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if enemy is not passed boundary
    if (this.x < this.boundary) {
        // move forward
        // increment x by speed * dt
        this.x += this.speed * dt;
    }
    // else
    // reset to start point
    else {
        this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    this.x;
    this.y;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player Class "Hero"
class Hero {

    // Constructor || Properties : x pos, y pos + sprite img
    constructor() {

        this.live = 5;
        this.score = 0;
        // Top left corner of the board
        this.x = 0;
        this.y = 0;

        // Spaces between blocks, this numbers comes from engine.js
        this.jump = 83;
        this.step = 101;

        // Start place on the bottmo middle row
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;

        // update the init location for our player "Hero"
        this.x = this.startX;
        this.y = this.startY;

        // This is the image of the player
        this.sprite = "images/char-boy.png";

    }

    // Methods :

    // update()
    update() {
        // check collasion here
        // did player x and y collide with enemy?
        for (let enemy of allEnemies) {
            // console.log(enemy);
            if (this.y === enemy.y && (enemy.x + enemy.step / 2 > this.x && enemy.x < this.x + this.step / 2)) {
                this.checkGameOver();
                this.resetPlayer();
                this.deLive();
                // console.log('Touch');
            }
        }
        // did the player touch the top row?
        if (this.y === -28) {
            var thisIs = this;
            setTimeout(function () {
                thisIs.addScore();
                thisIs.resetPlayer()
            }, 10); //console.log('winnnnnnnner');
        }
    }

    // Draw player sprite on current x & y position?
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // handleInput()
    // handle keyboard input to move the player x or y
    // @param {string} input - Direction to travel
    handleInput(input) {
        switch (input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= this.jump
                }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                    this.x += this.step
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                    this.y += this.jump
                }
                break;

        }
        //console.log(`Hero x: ${this.x} | y: ${this.y}`);
    }

    // Descrease live by 1 on every colliding
    deLive() {
        const livesCount = document.querySelector('.live');
        this.live--;
        livesCount.innerHTML = this.live;
    }

    // Add 10 points to the score
    addScore() {
        const scoreCount = document.querySelector('.score');
        this.score += 10;
        scoreCount.innerHTML = this.score;
    }

    // Reset Hero position x & y
    resetPlayer() {
        this.y = this.startY;
        this.x = this.startX;
    }

    // check the Lives
    checkGameOver() {
        if (this.live === 1) {
            this.gameOver = true;
            //console.log('Game Over');
        }
    }

    // reset Score and Lives
    reset() {
        const scoreCount = document.querySelector('.score');
        const livesCount = document.querySelector('.live');
        this.score = 0;
        this.live = 5;
        scoreCount.innerHTML = this.score;
        livesCount.innerHTML = this.live;
    }

}

const player = new Hero(),
    bug1 = new Enemy(-101, 0, 200),
    bug2 = new Enemy(-101, 83, 300),
    bug3 = new Enemy(-500, 83, 100),
    bug4 = new Enemy(-300, 166, 400),
    allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});