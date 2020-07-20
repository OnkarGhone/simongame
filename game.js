buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];

var started = false;
//IMP!
var level = 0;

$(document).keypress(function() {

  if (!started) {
    $("#level-title").html("Level " + level);
    nextSequence();
    started = true;

  }
});


// Generate user chosen pattern.
$(".btn").click(userClicks);

function userClicks() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
};


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //Verify each user entry wrt gamePattern entry!
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    // console.log("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();

  }

};

//Generate random color sequence.
function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").html("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // console.log(gamePattern);

  $("#" + randomChosenColor).fadeOut(50).fadeIn();
  playSound(randomChosenColor);
};

//Function to play sound.
function playSound(name) {
  var newAudio = new Audio("sounds/" + name + ".mp3");
  newAudio.play();
};

//Animation for user clicks.
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
};

//Reset parameters if user loses.
function startOver() {
  started = false;
  gamePattern = [];
  level = 0;
};
