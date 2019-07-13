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


    // This part writes the correct answer
    var ranNum = (Math.floor(Math.random()*buttonsLeft.length));
    // console.log(ranNum);
    correctAnswerButton = buttonsLeft[ranNum];
    $(`#butt${correctAnswerButton}`).empty();
    $(`#butt${correctAnswerButton}`).append(questionObject.answerArray[questionNumber]);
    // console.log(buttonsLeft);
    buttonsLeft[ranNum]=buttonsLeft[(buttonsLeft.length-1)];
    // console.log(buttonsLeft);
    buttonsLeft.pop();
    // console.log(buttonsLeft);



    // this part writes the other answers

    // var x=0;

    for (var x=0;x<3;x++){

        ranNum = (Math.floor(Math.random()*buttonsLeft.length));
        var thisButt=buttonsLeft[ranNum]; console.log("thisButt "+thisButt);

        $(`#butt${thisButt}`).empty(); console.log(`#butt${thisButt}`);


        // console.log("questionObject.wrongAnswers "+questionObject.wrongAnswers);
        // console.log(questionNumber);
        // console.log(questionObject.wrongAnswers[`q0`][0])
        // console.log("x: "+x);
        // console.log();
        
        $(`#butt${thisButt}`).append(questionObject.wrongAnswers[`q${questionNumber}`][x]); //undefined
        // debugger
        buttonsLeft[ranNum]=buttonsLeft[(buttonsLeft.length-1)];
        buttonsLeft.pop();


    }







   
    // for(var x=0; x<3; x++){
    //     console.log("x: "+x);

        
    //         console.log("x: "+x);
    //         ranNum = (Math.floor(Math.random()*buttonsLeft.length));
    //         console.log("ranNum"+ranNum);
    //         var thisButt=buttonsLeft[ranNum]; console.log("thisButt"+thisButt);

    //         $(`#butt${thisButt}`).empty(); console.log(`#butt${thisButt}`);
    //         $(`#butt${thisButt}`).append(questionObject.wrongAnswers[`"q${questionNumber}"`][x]);
    //         console.log("answer "+questionObject.wrongAnswers[`q${questionNumber}`][x]);
    //         console.log("question number"+questionNumber);
    //         console.log(buttonsLeft);
    //         buttonsLeft[ranNum]=buttonsLeft[(buttonsLeft.length-1)];
    //         console.log(buttonsLeft);
    //         buttonsLeft.pop();
    //         console.log(buttonsLeft);

    //         // debugger
            
        
    // }


}

// questionObject.wrongAnswers["q1"][1]
// correctAnswerButton
// buttonsLeft= [1,2,3,4]
// <button type="button" class="btn btn-primary mt-4" id="butt1">Button 1</button><br>
// <button type="button" class="btn btn-primary mt-4" id="butt2">Button 2</button>
// <button type="button" class="btn btn-primary mt-4" id="butt3">Button 3</button><br>
// <button type="button" class="btn btn-primary mt-4" id="butt4">Button 4</button>

// function setGemValue(){ //Generates random value for a gem from 1 to 12
//     gemVal = (Math.floor(Math.random()*12))+1;
// }
// function checkGemVal(){ //Checks to see if new gem value is equal to any previous gems
//     gemRepeat =false;
//     for (y=0; y <x; y++){
//         if (gemVal == gems[y]){
//             gemRepeat = true;
//         }
//     }
//     if (gemRepeat == false){
//         gems[x] = gemVal;
//         x++
//     }
// }



function newGame(){
    rightAnswers=0;
    wrongAnswers=0;
    questionNumber=0;

    callQuestion()


    setTimeout(function(){intervalId = setInterval(decrement, 500)}, 0);


}



newGame()


//Checking Random Numbers
// var x0=0;
// var x1=0;
// var x2=0;
// var x3=0;
// var lastRan;
// var streak=0;

// for (z=0;z<1000000;z++){
//     var ranNum = (Math.floor(Math.random()*4));
//     if (ranNum == 0){x0++}
//     else if (ranNum == 1){x1++}
//     else if (ranNum == 2){x2++}
//     else if (ranNum == 3){x3++}
//     else {console.log("something wrong")}
//     if (ranNum==lastRan){streak++}
//     lastRan=ranNum;    
// }
// console.log(x0, x1, x2, x3, streak)
