var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y + 55;
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
    this.speed = speed;
    this.gameOver = false;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function (dt) {
    if (this.x < this.boundary) {
        this.x += this.speed * dt;
    } else {
        this.x = this.resetPos;
    }
};

Enemy.prototype.render = function () {
    this.x;
    this.y;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Hero {
    constructor() {
        this.live = 5;
        this.score = 0;
        this.x = 0;
        this.y = 0;
        this.jump = 83;
        this.step = 101;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.sprite = "images/char-boy.png";
    }

    update() {
        for (let enemy of allEnemies) {
            if (this.y === enemy.y && (enemy.x + enemy.step / 2 > this.x && enemy.x < this.x + this.step / 2)) {
                this.checkGameOver();
                this.resetPlayer();
                this.deLive();
            }
        }
        if (this.y === -28) {
            var thisIs = this;
            setTimeout(function () {
                thisIs.addScore();
                thisIs.resetPlayer()
            }, 10);
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

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
    }

    deLive() {
        const livesCount = document.querySelector('.live');
        this.live--;
        livesCount.innerHTML = this.live;
    }

    addScore() {
        const scoreCount = document.querySelector('.score');
        this.score += 10;
        scoreCount.innerHTML = this.score;
    }

    resetPlayer() {
        this.y = this.startY;
        this.x = this.startX;
    }

    checkGameOver() {
        if (this.live === 1) {
            this.gameOver = true;
        }
    }

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

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});