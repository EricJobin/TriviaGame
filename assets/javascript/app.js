// Javascript for Trivia Game

// Global Variables
var number = 20;
var intervalId;
var rightAnswers=0;
var wrongAnswers=0;
var questionNumber=0;
var buttonsLeft= [1,2,3,4]
var correctAnswerButton

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
    wrongAnswers: {
        q0: ["Paul","Peter","Philip",],
        q1: ["Red","Yellow","Brown",],
        q2: ["33","69","3",],
    },
};



// Functions

function decrement() {
    number--;
    $("#showTimer").html(number);
    if (number == 0) {
        $("#showQuestion").empty();
        $("#showQuestion").append("Time's Up!!!");
        clearInterval(intervalId);

        // set a timeout and call next question here
        // then set a new interval
        
    }
}

function callQuestion(){

    setTimeout(function(){ //I don't understand why I need a timeout function here, but the question wasn't rendering without it

        $("#showQuestion").empty();
        $("#showQuestion").append(questionObject.questionArray[questionNumber]);
    
    //write answers to buttons here
        callButton()
    


        setTimeout(function(){questionNumber++}, 0);  
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
    rightAnswers=0;
    wrongAnswers=0;
    questionNumber=0;

    callQuestion()


    setTimeout(function(){intervalId = setInterval(decrement, 500)}, 0);


}



newGame()

$(document).ready(function() {
    $(".btn").on("click", function(){
        // console.log(event.click)
        console.log(event.currentTarget.id);
        console.log(correctAnswerButton);
        // console.log("button clicked");
        // debugger

        if (event.currentTarget.id == "butt"+correctAnswerButton){
            console.log("Right Answer");
        }
        else{
            console.log("Wrong Answer");
        }

    });
});

// <button type="button" class="btn btn-primary mt-4" id="butt1">Button 1</button>