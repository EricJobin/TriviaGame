// Javascript for Trivia Game

// Global Variables
var timerNumber = 10;
var intervalId;
var rightAnswers=0;
var wrongAnswers=0;
var questionNumber=0;
var buttonsLeft= [1,2,3,4]
var correctAnswerButton;
var buttonClickedThisRound = false;

var questionObject = {

    questionArray: [
        "Click on Jack",
        "Click on blue",
        "Click on 42",
    ],
    answerArray: [
        "Jack",
        "Blue",
        "42",
    ],
    wrongAnswers: {
        q0: ["Paul","Peter","Philip",],
        q1: ["Red","Yellow","Brown",],
        q2: ["33","69","3",],
    },
};

// Functions

function decrement() {
    timerNumber--;
    $("#showTimer").html(`<h3>${timerNumber}</h3>`);
    if (timerNumber == 0) {
        buttonClickedThisRound =true; //This will stop any button clicks after the timer is up
        wrongAnswers++;
        $("#showQuestion").empty();
        $("#showQuestion").append("<h1>Time's Up!!!</h1>");
        clearInterval(intervalId);
        setTimeout(function(){
            $("#showQuestion").empty();
            $("#showQuestion").append("<h2>The correct answer was "+questionObject.answerArray[questionNumber-1]+"</h2>");      
            setTimeout(function(){checkEndGame()}, 1500);
        }, 1500);
    }
}

function callQuestion(){
    setTimeout(function(){ //I don't understand why I need a timeout function here, but the question wasn't rendering without it
        buttonClickedThisRound = false;
        $("#showQuestion").empty();
        $("#showQuestion").append(`<h2>${questionObject.questionArray[questionNumber]}<h2>`);
        callButton()
        setTimeout(function(){questionNumber++}, 0);
        setTimeout(function(){intervalId = setInterval(decrement, 500)}, 0);
    }, 0);
}

function callButton(){
    buttonsLeft= [1,2,3,4];
    var ranNum = (Math.floor(Math.random()*buttonsLeft.length));
    correctAnswerButton = buttonsLeft[ranNum];
    $(`#butt${correctAnswerButton}`).empty();
    $(`#butt${correctAnswerButton}`).append(questionObject.answerArray[questionNumber]);
    buttonsLeft[ranNum]=buttonsLeft[(buttonsLeft.length-1)];
    buttonsLeft.pop();

    for (var x=0;x<3;x++){
        ranNum = (Math.floor(Math.random()*buttonsLeft.length));
        var thisButt=buttonsLeft[ranNum];
        $(`#butt${thisButt}`).empty();
        $(`#butt${thisButt}`).append(questionObject.wrongAnswers[`q${questionNumber}`][x]);
        buttonsLeft[ranNum]=buttonsLeft[(buttonsLeft.length-1)];
        buttonsLeft.pop();
    }
}

function newGame(){
    $("#gameOverDiv").empty();
    timerNumber = 10;
    rightAnswers=0;
    wrongAnswers=0;
    questionNumber=0;
    callQuestion()
}

function checkEndGame(){
    if (questionNumber >= questionObject.questionArray.length){ // Displays Game Over Screen, game stats, new game button
        //Gave Over
        $("#showQuestion").empty();
        $("#showQuestion").append("<h1>Game Over</h1>");
        setTimeout(function(){
            $("#showQuestion").append(`<br><h2>Correct Answers: ${rightAnswers}</h2>`);
            $("#showQuestion").append(`<br><h2>Wrong Answers:   ${wrongAnswers}</h2>`);
            $("#gameOverDiv").append("<button type='button' class='btn btn-primary mt-4' id='gameOverDiv'>New Game</button>");
        }, 500);
    }
    else{ // If game is not over, call the next game, reset timer to 10
        callQuestion()
        timerNumber = 10;
    }
}


// Run Game


newGame()

$(document).ready(function() {
    $(".btn").on("click", function(){
        clearInterval(intervalId);
        if(buttonClickedThisRound==false){// This is to ensure that only one button click is registered each round
            if (event.currentTarget.id == "butt"+correctAnswerButton){
                $("#showQuestion").empty();
                $("#showQuestion").append("<h1>Correct!!!</h1>");
                rightAnswers++;
                setTimeout(function(){checkEndGame()}, 1500);
            }
            else{
                $("#showQuestion").empty();
                $("#showQuestion").append("<h1>Wrong Answer</h1>");
                setTimeout(function(){
                    $("#showQuestion").empty();
                    $("#showQuestion").append(`<h2>The correct answer was ${questionObject.answerArray[questionNumber-1]}</h2>`);
                }, 1500);
                wrongAnswers++;
                setTimeout(function(){checkEndGame()}, 3000);
            }
        }
        buttonClickedThisRound =true;
    });
    $("#gameOverDiv").on("click", function(){
        newGame()
    });
});


// <div id="gameOverDiv"></div>
// setTimeout(function(){checkEndGame()}, 0);