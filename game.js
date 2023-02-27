var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var started = false;
 $(document).on("keypress", function() {
   if(!started) {
     $("h1").text("Level " + level);
     nextSequence();
     start = true;
   }
 });

 $(".btn").on("click", function() {
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1)
 });


function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("." + randomChosenColour).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);

   level++;
   $("h1").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name +".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
        $("#" + currentColor).removeClass("pressed"); //any easier way to do it
    }, 100);
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  },200 )
  $("h1").text("Game Over, Press Any Key to Restart");
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      gameOver();
      startOver();}
    }
