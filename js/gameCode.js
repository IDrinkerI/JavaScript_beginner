//После игры необходимо спросить номер вопроса. 
//По номеру вопроса нужно вывести текст вопроса и текст выбранного ответа

var event;
var answers = [];

event = askGameQuestion(works[0]);
switch (event) {
    case 1: // Первое действие  - если в первом окне ввели 1 то открываем серию окон - окно 2        
        event = askGameQuestion(works[1]);
        switch (event) {
            case 1: // Второе действие, если во 2 окне ввели 1 то переходим на 4 окно                
                event = askGameQuestion(works[3]);
                break;
            case 2: // Второе действие   Если ввели 2 то также переходим на 4 окно
                event = askGameQuestion(works[3]);
                break;
            case -1: // Второе действие
                break;
            default:
                alert('Ошибка');
        }
        break;
    case 2: // Первое действие    Если в 1 окне ввели 2 то переходим к 3 окну
        event = askGameQuestion(works[2]);
        switch (event) {
            case 1: // Второе действие
                event = askGameQuestion(works[3]);
                break;
            case 2: // Второе действие
                event = askGameQuestion(works[3]);
                break;
            case -1: // Второе действие
                break;
            default:
                alert('Ошибка');
        }
        break;
    case -1: // Первое действие
        break;
    default:
        alert('Ошибка');
}

if (answers.length > 0) {
    viewHistory();
}

alert('Спасибо за игру');

//------------------------------------------
function askGameQuestion(question) {
    let questionText = question.text + concatAnswers(question.answerList) + '-1 - Выход из игры';
    let userAnswer = askQuestion(questionText, question.answerList.length)

    if (userAnswer != -1) {
        answers.push(new LogItem(question.text, question.answerList[userAnswer - 1]));
    }

    return userAnswer;

    function concatAnswers(answerList) {
        let resultStr = "";
        for (let answer of answerList) {
            resultStr += answer;
        }

        return resultStr;
    }
}

function viewHistory() {
    let questionText = "Введите номер вопроса для просмотра истории от 1 до " + answers.length + "\nили \'-1\' что бы пропустить";
    let userAnswer = askQuestion(questionText, answers.length);

    if (userAnswer != -1) {
        var logItem = answers[userAnswer - 1];
        alert("Вопрос №" + userAnswer + ".\nТекст вопроса:\n" + logItem.questionText + "\nВаш ответ:\n" + logItem.userAnswer);
    }
}

function askQuestion(questionText, answerCount) {
    let ok, userAnswer;
    do {
        ok = false;
        userAnswer = +prompt(questionText);

        if (userAnswer == -1) {
            break;
        }
        else {
            ok = isAnswer(answerCount, userAnswer);
        }
    } while (!ok);

    return userAnswer;
}

function isAnswer(q, event) {
    if (isNaN(event) || !isFinite(event)) {
        alert('Вы ввели недопустимый символ');
        return false;
    }
    else if (event < 1 || event > q) {
        alert('Ваше число выходит из допустимого диапозона');
        return false;
    }
    return true;
}

function LogItem(questionText, userAnswer) {
    this.questionText = questionText;
    this.userAnswer = userAnswer;
}
