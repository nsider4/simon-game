var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === level) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over! Press Any Key to Restart");
        
        started = false;
    }
}

$(document).keydown(function (e) {
    if(!started) {
        startOver();
    }

    nextSequence();
});

$(".btn").click(function (e) { 
    if(started) {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);

        animatePress(userChosenColor);
        playSound(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    }
});

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = true;
}

function playSound(name) {
    var audio = new Audio("sounds/"+name+'.mp3');
    audio.volume = 0.5; audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}
