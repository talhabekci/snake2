const board_border = 'black';
const board_background = '#ffe8d6';
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let snake = [
    {x:200, y:200},
    {x:190, y:200},
    {x:180, y:200},
    {x:170, y:200},
    {x:160, y:200},
];

let score = 0;
let changing_direction = false;
let food_x;
let food_y;
let dx = 10;
let dy = 0;

const snakeBoard = document.getElementById("gameCanvas");
const snakeBoard_ctx = snakeBoard.getContext("2d");

main();
gen_food();

document.addEventListener("keydown", change_direction)

function main(){

    if(has_game_ended()) return;

    changing_direction = false;
    setTimeout(function onTick(){
        clear_board();
        drawFood();
        move_snake();
        drawSnake();
        main();
    }, 100)
}

function clear_board(){
    snakeBoard_ctx.fillStyle = board_background;
    snakeBoard_ctx.strokestyle = board_border;
    snakeBoard_ctx.fillRect(0, 0, snakeBoard.clientWidth, snakeBoard.height);
    snakeBoard_ctx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height);
}

function drawSnake(){
    snake.forEach(drawSnakePart);
}

function drawFood(){
    snakeBoard_ctx.fillStyle = 'lightgreen';
    snakeBoard_ctx.strokestyle = 'darkgreen';
    snakeBoard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeBoard_ctx.strokeRect(food_x, food_y, 10, 10);
}

function drawSnakePart(snakePart){
    snakeBoard_ctx.fillStyle = snake_col;
    snakeBoard_ctx.strokestyle = snake_border;
    snakeBoard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeBoard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function gameOver(){
    document.getElementById("gameOver").innerHTML = "Game Over";
    let btn = document.createElement("button");
    btn.className = "newGameBtn"
    btn.innerHTML = "New Game";
    document.body.appendChild(btn);

    var score = document.getElementById("score");
    score.style.color = "red";

    btn.onclick = function(){
        document.location.reload();
    }

    const Http = new XMLHttpRequest();
    const url='https://snake-game-api.herokuapp.com/users/score';
    Http.open("GET", url);
    Http.send(body:{"userName": "talha", "score": score});

    Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
    }

    return true;
}

function has_game_ended(){
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return gameOver();
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeBoard.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeBoard.height - 10;
    if (hitLeftWall || hitRightWall || hitTopWall || hitBottomWall) return gameOver();
}

function random_food(min, max){
    return Math.round((Math.random() * (max-min) + min ) / 10) * 10;
}

function gen_food(){
    food_x = random_food(0, snakeBoard.width - 10);
    food_y = random_food(0, snakeBoard.height - 10);
    snake.forEach(function has_snake_eaten_food(part){
        const has_eaten = part.x == food_x && part.y == food_y;
        if(has_eaten) gen_food;
    });
}

function change_direction(event){
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if(changing_direction) return;
    changing_direction = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if(keyPressed === LEFT_KEY && !goingRight){
        dx = -10;
        dy = 0;
    }

    if(keyPressed === UP_KEY && !goingDown){
        dx = 0;
        dy = -10;
    }

    if(keyPressed === RIGHT_KEY && !goingLeft){
        dx = 10;
        dy = 0;
    }

    if(keyPressed === DOWN_KEY && !goingUp){
        dx = 0;
        dy = 10;
    }

}


function move_snake(){
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);
        const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
        if (has_eaten_food){
            score += 10;
            document.getElementById("score").innerHTML = score;
            document.getElementById("userScore").innerHTML = score;
            gen_food();
        }else{
            snake.pop();
        }
}
