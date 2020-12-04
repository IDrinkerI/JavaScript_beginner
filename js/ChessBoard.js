function chessBoardBuildByQuery(parentQuery) {
    let parentBlock = document.querySelector(parentQuery);
    parentBlock.classList.add("chessboard_wrapper");

    let board = document.createElement("table");
    board.classList.add("chessboard")
    for (let row = 0; row < 10; row++) {
        let boardRow = document.createElement("tr");

        for (let column = 0; column < 10; column++) {
            let boardCell = document.createElement("td");

            configureCell(boardCell, column, row);
            fillCell(boardCell, column, row);

            boardRow.append(boardCell);
        }

        board.append(boardRow);
    }

    parentBlock.append(board);
}

function configureCell(cell, columnNumber, rowNumber) {
    cell.classList.add("chessboard-cell");

    let cellNumber = rowNumber * 10 + columnNumber;
    if ((cellNumber == 0) || (cellNumber == 9) || (cellNumber == 90) || (cellNumber == 99)) {
        cell.classList.add("chessboard-corner_cell");
    }
    else if (rowNumber == 0 || rowNumber == 9) {
        cell.classList.add("chessboard-char_cell");

        if (rowNumber == 0) {
            cell.classList.add("chessboard-flipped_cell");
        }
    }
    else if (columnNumber == 0 || columnNumber == 9) {
        cell.classList.add("chessboard-digit_cell");

        if (columnNumber == 9) {
            cell.classList.add("chessboard-flipped_cell");
        }
    }
    else if ((columnNumber + rowNumber) % 2 != 0) {
        cell.classList.add("chessboard-black_cell");
    }
    else {
        cell.classList.add("chessboard-white_cell");
    }
}

function fillCell(cell, columnNumber, rowNumber) {
    if (cell.classList.contains("chessboard-corner_cell")) { return; }

    if (cell.classList.contains("chessboard-char_cell")) {
        cell.innerText = String.fromCharCode(64 + columnNumber);
    }
    else if (cell.classList.contains("chessboard-digit_cell")) {
        cell.innerText = 9 - rowNumber;
    }
    else if (rowNumber == 2) {
        cell.innerHTML = getFigure(0, true);
    }
    else if (rowNumber == 7) {
        cell.innerHTML = getFigure(0, false);
    }
    else if (rowNumber == 1) {
        cell.innerHTML = getFigure(columnNumber, true);
    }
    else if (rowNumber == 8) {
        cell.innerHTML = getFigure(columnNumber, false);
    }
}

function getFigure(position, isBlack) {
    let figureCode = 9812;

    if (isBlack) {
        figureCode += 6;
    }

    switch (position) {
        case 0:
            figureCode += 5;
            break;
        case 1:
            figureCode += 2;
            break;
        case 2:
            figureCode += 4;
            break;
        case 3:
            figureCode += 3;
            break;
        case 4:
            figureCode += 1;
            break;
        case 5:
            figureCode += 0;
            break;
        case 6:
            figureCode += 3;
            break;
        case 7:
            figureCode += 4;
            break;
        case 8:
            figureCode += 2;
            break;
        default:
            console.log("Неправильная позиция фигуры");
            return;
    }

    return "&#" + figureCode + ";";
}