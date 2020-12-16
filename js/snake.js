var GAME_FIELD_WIDTH = 30;
var GAME_FIELD_HEIGHT = 20;
var INTERVAL_SNAKE_MOVE = 150;
var INTERVAL_DROP_FOOD = 3000;
var INTERVAL_DROP_OBSTACLE = 5000;
var BASE_OBSTACLE_LIFETIME = 5000;
var MAX_FOOD = 1;

var Direction = {
    Up: new Point(0, -1),
    Down: new Point(0, 1),
    Left: new Point(-1, 0),
    Right: new Point(1, 0),
}
var GameObjectType = {
    Empty: 0,
    Snake: 1,
    Food: 2,
    Obstacle: 3,
}

var snakeTimer;
var foodTimer;
var obstacleTimer;

var foodAvailable;
var currentMoveDirection;
var scoreCount;
var scoreHTMLCounter;

var isRun = false;
var isTurn = false;

var obstacles = [];
var snake;
var gameField = [];

function buildGameWindow(gameWindowSelector) {
    let gameWindow = document.querySelector(gameWindowSelector);

    let scoreInfo = document.createElement("p");
    scoreInfo.classList.add("snake-score_count");
    scoreInfo.innerText = "Score: ";
    scoreHTMLCounter = document.createElement("span");
    scoreInfo.append(scoreHTMLCounter);

    gameField = builGameField(gameWindow);

    let buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("snake-button_wrapper");

    let startButton = document.createElement("button");
    startButton.classList.add("snake-button");
    startButton.innerText = "Start";
    startButton.onclick = onClickStartButtonHandler;
    buttonWrapper.append(startButton);

    let newGameButton = document.createElement("button");
    newGameButton.classList.add("snake-button");
    newGameButton.innerText = "New game";
    newGameButton.onclick = onClickNewGameButtonHandler;
    buttonWrapper.append(newGameButton);

    gameWindow.append(scoreInfo);
    gameWindow.append(gameField.HTMLEntity);
    gameWindow.append(buttonWrapper);

    addEventListener("keydown", changeDirection);
}

function onClickStartButtonHandler(event) {
    gameStart();
}

function onClickNewGameButtonHandler(event) {
    gameStop();
    clearGameField();
}

function gameStart() {
    if (isRun) { return; }

    clearGameField();
    snake = buildSnake();

    snakeTimer = setInterval(snakeMove, INTERVAL_SNAKE_MOVE);
    foodTimer = setInterval(dropFood, INTERVAL_DROP_FOOD);
    obstacleTimer = setInterval(dropObstacle, INTERVAL_DROP_OBSTACLE);

    foodAvailable = MAX_FOOD;
    currentMoveDirection = Direction.Up;

    IncrementScore(true);

    isRun = true;
}

function gameStop() {
    if (!isRun) { return; }

    clearInterval(snakeTimer);
    clearInterval(foodTimer);
    clearInterval(obstacleTimer);

    isRun = false;
}

function clearGameField() {
    for (let i = 0; i < GAME_FIELD_WIDTH; i++)
        for (let j = 0; j < GAME_FIELD_HEIGHT; j++)
            gameField.setObjectType(new Point(i, j), GameObjectType.Empty);
}

function gameOver() {
    gameStop();
    alert("Game Over\n You score: " + scoreCount);
}

function snakeMove() {
    snake.move(currentMoveDirection);
}

function dropFood() {
    if (foodAvailable <= 0) { return; }

    let point = gameField.GetRandomEmptyCell();
    gameField.setObjectType(point, GameObjectType.Food);

    foodAvailable--;
}

function dropObstacle() {
    let point = gameField.GetRandomEmptyCell();
    gameField.setObjectType(point, GameObjectType.Obstacle);
    obstacles.push(point);
    let obstacle_lifetime = BASE_OBSTACLE_LIFETIME + scoreCount * 1500;
    setTimeout(deleteObstacle, obstacle_lifetime);
}

function deleteObstacle() {
    if (!isRun) { return; }

    let point = obstacles.shift()
    gameField.setObjectType(point, GameObjectType.Empty);
}

function IncrementScore(reset = false) {
    if (reset) { scoreCount = -1; }

    scoreCount++;
    scoreHTMLCounter.innerText = formatString(scoreCount);

    function formatString(str) {
        if (isNaN(str)) {
            return "000000";
        }

        let resultString = "";
        let needLiter = 6;

        let n = str;
        while (n > 0) {
            n = parseInt(n / 10);
            needLiter--;
        }

        for (; needLiter > 0; needLiter--) {
            resultString += "0";
        }
        resultString += str;

        return resultString;
    }
}

function changeDirection(event) {
    if (isTurn) { return; }

    switch (event.keyCode) {
        case 37:
        case 65:
            if (currentMoveDirection != Direction.Right)
                currentMoveDirection = Direction.Left;
            break;
        case 38:
        case 87:
            if (currentMoveDirection != Direction.Down)
                currentMoveDirection = Direction.Up;
            break;
        case 39:
        case 68:
            if (currentMoveDirection != Direction.Left)
                currentMoveDirection = Direction.Right
            break;
        case 40:
        case 83:
            if (currentMoveDirection != Direction.Up)
                currentMoveDirection = Direction.Down;
            break;
    }

    isTurn = true;
}

function buildSnake() {
    let startPoint = new Point(GAME_FIELD_WIDTH / 2, GAME_FIELD_HEIGHT / 2);
    let startBodySize = 2;

    let newSnake = new Snake(startPoint);

    for (let i = 0; i < startBodySize; i++) {
        newSnake.eat();
        newSnake.move(Direction.Up);
    }

    return newSnake;
}

function builGameField(gameWindow) {
    let newGameField = [];
    newGameField.HTMLEntity = document.createElement("table");
    newGameField.HTMLEntity.classList.add("snake-game_field");

    let cellSize = parseInt(getComputedStyle(gameWindow).width) / GAME_FIELD_WIDTH + "px";
    for (let r = 0; r < GAME_FIELD_HEIGHT; r++) {
        let row = [];
        row.HTMLEntity = document.createElement("tr");

        for (let c = 0; c < GAME_FIELD_WIDTH; c++) {
            let cell = document.createElement("td");
            cell.classList.add("snake-game_field-cell");
            cell.style.width = cellSize;
            cell.style.height = cellSize;
            cell.objectType = GameObjectType.Empty;
            row.HTMLEntity.append(cell);
            row.push(cell);
        }

        newGameField.HTMLEntity.append(row.HTMLEntity);
        newGameField.push(row);
    }

    newGameField.getObjectType = function (point) {
        return gameField[point.y][point.x].objectType;
    }

    newGameField.setObjectType = function (point, gameObjectType) {
        gameField[point.y][point.x].objectType = gameObjectType;

        switch (gameObjectType) {
            case GameObjectType.Empty:
                gameField[point.y][point.x].removeAttribute("class");
                gameField[point.y][point.x].classList.add("snake-game_field-cell");
                break;
            case GameObjectType.Snake:
                gameField[point.y][point.x].classList.add("snake-game_field-snake_body")
                break;
            case GameObjectType.Food:
                gameField[point.y][point.x].classList.add("snake-game_field-food")
                break;
            case GameObjectType.Obstacle:
                gameField[point.y][point.x].classList.add("snake-game_field-obstacle")
                break;
        }
    }

    newGameField.GetRandomEmptyCell = function () {
        let point;
        do {
            let x = Math.floor(Math.random() * GAME_FIELD_WIDTH);
            let y = Math.floor(Math.random() * GAME_FIELD_HEIGHT);
            point = new Point(x, y);
        } while (gameField.getObjectType(point) != GameObjectType.Empty);

        return point;
    }

    return newGameField;
}

function Point(x, y) {
    this.x = x;
    this.y = y;

    this.add = function (point) {
        newX = this.x + point.x;
        NewY = this.y + point.y;
        return new Point(newX, NewY);
    }

    this.copy = function () {
        return new Point(this.x, this.y);
    }
}

function Snake(startPoin) {
    this.head = startPoin;
    this.body = [];
    this.foodConsumed = 0;

    this.move = function (moveDirection) {
        let nextPosition = this.head.add(moveDirection);
        // TODO: Rename method checkPointOnField()
        nextPosition = checkPointOnField(nextPosition);

        let nextPositionType = gameField.getObjectType(nextPosition);
        if (nextPositionType == GameObjectType.Food) {
            this.eat();
        }
        else if (nextPositionType == GameObjectType.Snake || nextPositionType == GameObjectType.Obstacle) {
            gameOver();
            return;
        }

        if (this.foodConsumed == 0) {
            gameField.setObjectType(this.body[this.body.length - 1], GameObjectType.Empty);
        }
        else {
            this.foodConsumed--;
        }

        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i] = this.body[i - 1];
        }

        this.body[0] = this.head;
        this.head = nextPosition;
        gameField.setObjectType(this.head, GameObjectType.Snake);

        if (isTurn) { isTurn = false; }

        function checkPointOnField(point) {
            if (point.x < 0) {
                point.x = GAME_FIELD_WIDTH - 1;
            }
            else if (point.x > GAME_FIELD_WIDTH - 1) {
                point.x = 0;
            }
            else if (point.y < 0) {
                point.y = GAME_FIELD_HEIGHT - 1;
            }
            else if (point.y > GAME_FIELD_HEIGHT - 1) {
                point.y = 0;
            }

            return point;
        }
    };

    this.eat = function () {
        let point = this.head.copy();
        this.body.push(point);
        this.foodConsumed++;
        IncrementScore();
        foodAvailable++;
    };
}