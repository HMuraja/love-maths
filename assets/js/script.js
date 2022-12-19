//wait for the DOM to finish loading before running the game
//Get the button elements and add the listenera to them

document.addEventListener("DOMContentLoaded", function(){
    let buttons= document.getElementsByTagName("button");

    for (let button of buttons){
        button.addEventListener("click", function() {
            if(this.getAttribute('data-type') === "submit") {
                checkAnswer();
            } else { 
                let gameType=this.getAttribute('data-type');
                runGame(gameType);
            }
        });
    }
    document.getElementById("answer-box").addEventListener("keydown", function(event){
        if (event.key === "Enter") {
            checkAnswer();
        }
    });
    runGame("addition");
});

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType){
    document.getElementById("answer-box").value="";
    document.getElementById("answer-box").focus();
    //Creates two random numbers between 1 and 25
    let num1=Math.floor(Math.random()*25)+1;
    let num2=Math.floor(Math.random()*25)+1;

    if (gameType === "addition"){
        displayAdditionQuestion (num1, num2);
    } else if (gameType === "subtract") {
        largerNum= Math.max(num1,num2);
        smallerNum=Math.min(num1,num2);        
        displaySubtractQuestion (largerNum, smallerNum);        
    } else if(gameType === "multiply"){
        displayMultiplyQuestion (num1, num2);
    } else {
        alert(`Unknown game type: $(gameType)`);
        throw `Unknown game type: $(gameType). Aborting!`;
    }
}

/**
 * Check the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = CalculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect){
        alert("Hey! You got it right! :D");
        IncrementScore();
    }else {
        alert(`Awwww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        IncrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);

}

/**
 * Gets the operands(the numbers) and the operator(p, minus ect)
 * directly from the done, and returns the correct answer.
 */
function CalculateCorrectAnswer(){
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator==="+"){
        return [operand1 + operand2, "addition"];
    }else if (operator==="-"){
        return [operand1 - operand2, "subtract"];
    }else if (operator==="x"){
        return [operand1 * operand2, "multiply"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}
/**
 * Gets the correct score from the html and inrcement it by 1
 */
function IncrementScore(){

    let oldscore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText= ++oldscore;

}
/**
 * Gets the incorrect score from the html and increment it by 1
 */
function IncrementWrongAnswer(){
    let oldscore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText= ++oldscore;
}

function displayAdditionQuestion(operand1, operand2){
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";

}
function displaySubtractQuestion(operand1, operand2){
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";
}
function displayMultiplyQuestion(operand1, operand2){
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}