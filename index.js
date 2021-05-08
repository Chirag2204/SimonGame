console.log("hello");
var userClickedPattern = [];
var gamePattern = [];
var colors = ["red", "blue", "green", "yellow"];
var level = 0;
var checkAnswer;
var userChosenColor;
var index = -1;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);
  console.log(randomNumber);

  randomChosenColor = colors[randomNumber];
  console.log(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
  gamePattern.push(randomChosenColor);

}

function gameOver() {
  console.log("gameOver() called");
  $("h1").text("Game Over");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
    var sound = new Audio("sounds/wrong.mp3")
    sound.play();
    $("h1").text("Press Any Key to Start");
  }, 300);
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  start();

}

function checkAns(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //console.log("succes");
    if (userClickedPattern.length === gamePattern.length) {

      nextSequence();
    }
  } else {
  //  console.log("failure");
    gameOver();
  }
}

function  start(){

    $("body").keypress(function() {
     nextSequence();
     $("body").unbind("keypress");
    });

}

start();

$(".btn").click(function() {
  userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  $("#" + userChosenColor).addClass("pressed");
  setTimeout(function() {
    $("#" + userChosenColor).removeClass("pressed");
  }, 100);
  checkAns((userClickedPattern.length) - 1);
});
