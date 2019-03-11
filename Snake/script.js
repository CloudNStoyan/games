let canvas = document.getElementById('canvas');
let context = canvas.getContext("2d");
        
context.fillStyle = "black";
context.fillRect(0, 0, canvas.width, canvas.height);
        
setInterval(engine, 1000/15);
document.addEventListener("keydown", switchDirection);
//Info
let trailColor = "lime";
let headColor = "lime";
let backgroundColor = "black";
let fruitColor = "gold";
//Fruit
let fruitSpawned = false;
let currentFruitPosition = [15,15];
let direction = [1, 0];
let directionHistory = [];
        
let trails = -1;
let x = 0;
let y = 0;
        
function switchDirection(key) {
    switch(key.keyCode) {
        case 37:
        //Left
        if (direction[0] == 0) {
            direction = [-1, 0];
        }
        break;
        case 39:
        if (direction[0] == 0) {
            direction = [1, 0];
        }
        //Right
        break;
        case 38:
        //Up
        if (direction[1] == 0) {
            direction = [0, -1];
        }
        break;
        case 40:
        //Down
        if (direction[1] == 0) {
            direction = [0, 1];
        }
        break;
    }        
}

function engine() {
    drawBox(x, y, headColor);

    if (x == currentFruitPosition[0] && y == currentFruitPosition[1]) {
        fruitSpawned = false;
    }

    spawnFruit();

    let directionHeaded = {x: x, y: y, direction: direction};
    directionHistory.push(directionHeaded);

    for (let i = 0; i < trails + 1; i++) {
        let index = directionHistory.length - 2;
        let direc = directionHistory[index - i];
        if (direc != undefined) {
            if (i >= trails) {
                drawBox(direc.x, direc.y, backgroundColor);
                if (direc.x == currentFruitPosition[0] && direc.y == currentFruitPosition[1]) {
                    fruitSpawned = false;
                }
            } else {
                drawBox(direc.x, direc.y, trailColor);
                if (direc.x == currentFruitPosition[0] && direc.y == currentFruitPosition[1]) {
                    fruitSpawned = false;
                }
            }
        }
    }

    //x
    if (direction[0] == 1) {
        x++;
    } else if (direction[0] == -1) {
        x--;
    }
    if (direction[1] == 1) {
        y++;
    } else if (direction[1] == -1) {
        y--;
    }
    if (x + 1 > 15) {
        x = 0;
    } else if (x < 0) {
        x = 14;
    }
    if (y + 1 > 15) {
        y = 0;
    } else if (y < 0) {
        y = 14;
    }
}

function spawnFruit() {
    if (fruitSpawned == false) {
        let fruitX = randomBetween(0, 15);
        let fruitY = randomBetween(0, 15);
        currentFruitPosition = [fruitX, fruitY];
        fruitSpawned = true;
        drawBox(fruitX, fruitY, fruitColor);
        trails++;
        UpdateUI();
    }
}

function UpdateUI() {
    let score = document.querySelector('.score');
    score.innerHTML = trails;
}

function randomBetween(a, b) {
    return Math.floor((Math.random() * b) + a)
}

function drawBox(boxX, boxY, color) {
    context.fillStyle = color;
    let x = boxX * 25;
    let y = boxY * 25;
    context.fillRect(x, y, 20, 20);
}
