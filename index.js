var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var flag = false;

$(".btn").on("click",function(){
  var userClickedColor = $(this).attr("id");
  userClickedPattern.push(userClickedColor);
  animatePress(userClickedColor);
  playSound(userClickedColor);
  checkAnswer(userClickedPattern.length-1);
});

$(document).on("keypress",function(){
  if(flag==false){
    nextSequence();
    flag=true;
  }
});


function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.random();
  randomNumber = randomNumber*4;
  randomNumber = Math.floor(randomNumber);

  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);

  level++;
  $("h1").html("Level "+level);

  $("."+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}


function animatePress(colorBtn){
  $("."+colorBtn).addClass("pressed");
  setTimeout(function(){
    $("."+colorBtn).removeClass("pressed");
  },100);
}

function playSound(colorBtn){
  var audio = new Audio("sounds/"+colorBtn+".mp3");
  audio.play();
}


function checkAnswer(currLevel){
  if(userClickedPattern[currLevel]==gamePattern[currLevel]){
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },2000);
    }
  }
  else{
    playSound("wrong");
    $("h1").html("Game over, Press any Key to Restart ");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },1000);
    startOver();
  }
}

function startOver(){
  level=0;
  flag=false;
  gamePattern=[];
}
