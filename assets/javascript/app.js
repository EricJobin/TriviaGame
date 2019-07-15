// Javascript for Trivia Game

// Global Variables
var timerNumber = 20;
var intervalId;
var rightAnswers=0;
var wrongAnswers=0;
var questionNumber=0;
var buttonsLeft= [1,2,3,4]
var correctAnswerButton;
var buttonClickedThisRound = false;

var questionObject = {

    questionArray: [
        "Who is the Outer God known as The Black Goat of the Woods with a Thousand Young, who gave birth to, among other things, the Dark Young?",
        "This Outer God knows the gate, and is the gate. They are the key and the guardian of the gate. Past, present, future, are all one in them. Of whom do I speak?",
        "Known also as the Blind Idiot God, the Nuclear Chaos, the Daemon Sultan, this being slumbers and should it ever awake, the universe, which is but its dream, shall disappear. Who is this?",
        "Who acts as a messenger for the Outer Gods and has a thousand other forms, including The Crawling Chaos, The Black Pharaoh, The Haunter of the Dark and The Faceless God?",
        "What is the name of the book that was written in the 8th century, bound in flesh and written blood, that contains the history of that which came before man, and knowledge that man was not meant to know?",
        "What is the name of the city that is characterized by bizarre cyclopean architecture and non-Euclidean geometry, that is located deep under the Pacific Ocean, and is where Great Cthulhu sleeps?",
        "What is the name of the one who is known as The Unspeakable One, Him Who Is Not to be Named, The King in Yellow and The Yellow Sign?",
        "What is the name for the extra-dimensional creatures capable of breaking into our dimension at any point where an angle is formed, that feed on their victims with hollow proboscises?",
        "Miskatonic University is located in which fictional city?",
        "Often cited as the creator of the Mythos, this author is known for such stories as ‘The Call of Cthulhu’, ‘At the Mountains of Madness’ and ‘The Shadow over Innsmouth’.",
    ],
    answerArray: [
        "Shub-Niggurath",
        "Yog-Sothoth",
        "Azathoth",
        "Nyarlathotep",
        "The Necronomicon",
        "R'lyeh",
        "Hastur",
        "Hounds of Tindalos",
        "Arkham",
        "Howard Phillips Lovecraft",
    ],
    wrongAnswers: {
        q0: ["Tshup Aklathep","Azathoth","Lavinia Whateley",],
        q1: ["Vinz Clortho","Gozer","Zuul",],
        q2: ["The Wind Fish","The Matrix","Abdul Alhazred",],
        q3: ["The Black Goat","Seshat","Minerva",],
        q4: ["The Voynich Manuscript","The Codex Gigas","Pnakotic Manuscripts",],
        q5: ["Atlantis","Dunwich","Heracleion",],
        q6: ["Voldemort","Candyman","Mary Tudor",],
        q7: ["Strix","Vampire Ground Finch","Shai-Hulud",],
        q8: ["Gotham","Ankh-Morpork","Beantown",],
        q9: ["August Derleth","Robert W. Chambers","Lord Dunsany",],
    },
    pictureArray: [
        "<img src='assets/images/darkyoung.jpg' id='pictureUsed'>",
        "<img src='assets/images/yogsothoth.jpg' id='pictureUsed'>",
        "<img src='assets/images/azathoth.jpg' id='pictureUsed'>",
        "<img src='assets/images/nyarlathotep.jpg' id='pictureUsed'>",
        "<img src='assets/images/book.jpg' id='pictureUsed'>",
        "<img src='assets/images/rlyeh.jpg' id='pictureUsed'>",
        "<img src='assets/images/hastur.jpg' id='pictureUsed'>",
        "<img src='assets/images/hounds.jpg' id='pictureUsed'>",
        "<img src='assets/images/miskatonic.jpg' id='pictureUsed'>",
        "<img src='assets/images/hpl.jpg' id='pictureUsed'>",
    ],
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
        $("#pictureDiv").empty();
        $("#pictureDiv").append(questionObject.pictureArray[questionNumber]);
        callButton()
        setTimeout(function(){questionNumber++}, 0);
        setTimeout(function(){intervalId = setInterval(decrement, 1000)}, 0); //Here is the only place where the timer is set
    }, 0);
} //pictureDiv

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
    timerNumber = 20;
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
        timerNumber = 20;
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