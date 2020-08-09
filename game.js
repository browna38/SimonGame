/*****************************************************************************************************************************************
 * 
 * Game Java Script File
 * 
 * By Adam Brown
 * 
****************************************************************************************************************************************** */


var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
/*****************************************************************************************************************************************
 * 
 * Key Pressed
 * 
****************************************************************************************************************************************** */

$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

/*****************************************************************************************************************************************
 * 
 * Button clicked
 * 
****************************************************************************************************************************************** */


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

/*****************************************************************************************************************************************
 * 
 * Next Sequence
 * 
****************************************************************************************************************************************** */

function nextSequence() {
    userClickedPattern = [];
  //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

/*****************************************************************************************************************************************
 * 
 * Play Sound
 * 
****************************************************************************************************************************************** */

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/*****************************************************************************************************************************************
 * 
 * Animate Press
 * 
****************************************************************************************************************************************** */

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

/*****************************************************************************************************************************************
 * 
 * Check Answer
 * 
****************************************************************************************************************************************** */

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success " + userClickedPattern[ currentLevel] + " is " + gamePattern[currentLevel]);
            
        if(userClickedPattern.length===gamePattern.length){
            console.log("success " );
        setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").css({"background-color":"red"});
        setTimeout(function () {
            $("body").css({"background-color":"#011F3F"});
          }, 500);
          $("#level-title").text("Game Over, Press Any Key to Restart");
        console.log("wrong");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;   
}