//Wait for the DOM to finish loading before running the game
//Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type")
                runGame(gameType);
            }
        })
    }

    document.getElementById("answer-box").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition")
})

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    //Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2)
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2)
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}



function checkAnswer() {
    
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculateAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculateAnswer[0];

    if (isCorrect) {
        alert("You get it right");
        incrementScore();
    } else {
        alert(`Wrong you answered ${userAnswer}. The correct answer is ${calculateAnswer[0]}`)
        incrementWrongAnswer();
    }

    
    runGame(calculateAnswer[1]);

}

/**
 * Will calculate the answer
 */
function calculateCorrectAnswer() {

    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else {
        alert(`Unimplementd operator ${operator}`);
        throw `Unimplementd operator ${operator}. Aborting!`
    }

}

/**
 * This function is going to check if the user asnwer was correct
 * if he did it the score is 
 * going to increase
 */
function incrementScore() {
    let scoreBoard = parseInt(document.getElementById('socore').innerText);
    document.getElementById('socore').innerText = ++scoreBoard;
    
}

/**
 * This function is going to check if the 
 * user answer was incorrect
 * if that's the case the incorrect
 * score board is going to increase
 */
function incrementWrongAnswer() {
    let scoreBoard = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++scoreBoard;
}

function displayAdditionQuestion(operand1, operand2) {
   document.getElementById('operand1').textContent = operand1; 
   document.getElementById('operand2').textContent = operand2;
   document.getElementById('operator').textContent = "+";
   
}

function displaySubtractQuestion(operand1, operand2) {
   document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2; 
   document.getElementById('operand2').textContent = operand2 < operand1 ? operand2 : operand1;
   document.getElementById('operator').textContent = "-";

}

function displayMultiplyQuestion(operand1, operand2) {
   document.getElementById('operand1').textContent = operand1; 
   document.getElementById('operand2').textContent = operand2;
   document.getElementById('operator').textContent = "x";
}