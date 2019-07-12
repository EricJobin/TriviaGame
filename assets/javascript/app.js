// Javascript for Trivia Game

var number = 20;
var intervalId;

var questionObject = {

    questionArray: [
        "The answer is Jack",
        "The answer is blue",
        "The answer is 42",
    ],
    answerArray: [
        "Jack",
        "Blue",
        "42",
    ],
    wrongAnswers = {
        q1: ["Paul","Peter","Philip",],
        q2: ["Red","Yellow","Brown",],
        q3: ["33","69","3",],
    },
};





function decrement() {
    number--;
    $("#showTimer").html(number);
    if (number == 0) {
        setTimeout( function(){ alert("Time Up!") }, 0) //setting timeout to 0 will still allow the code within to only run after the current stack is clear
        clearInterval(intervalId);
    }
}

intervalId = setInterval(decrement, 100);







