//wait for the DOM to finish loading before running the game
//Get the button elements and add the listenera to them

document.addEventListener("DOMContentLoaded", function(){
    let buttons=this.getElementsByTagName("button");

    for (let button of buttons){
        button.addEventListener("click", function() {
            if(this.getAttribute('data-type')=== "submit") {
                alert("You clikced submit!");
            } else { 
                let gameType=this.getAttribute('data-type');
                alert(`You clicked ${gameType}`);
            }
        });
    }
});

function runGame(){

}
function checkRun(){}
function CalculateCorrectAnswer(){}
function IncrementScore(){}
function IncrementWrongAnswer(){}
function displayAdditionQuestion(){}
function displaySubtractQuestion(){}
function displayMultiplyQuestion(){}