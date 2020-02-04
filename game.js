var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started =false;
var level =0;
  $(document).keypress(function(){
    if(!started)
    {
      $("#level-title").text("level "+level);
      started=true;
      nextSequence();
    }
  });

function nextSequence()
{
  var randomNum=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNum];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  playAnimate(randomChosenColour);
  level++;
  $("#level-title").text("level "+level);
  userClickedPattern=[];
}
function playSound(colour)
{
  var audio= new Audio("sounds/"+colour+".mp3");
  audio.play();
}
function playAnimate(color)
{
  $("#"+color).addClass("pressed");
  setTimeout(function(){
    $("#"+color).removeClass("pressed");
  },100);
}
$(".btn").click(function(){
  if(started)
  {
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    playAnimate(userChosenColour);
    checker();
  }

});
function checker()
{
  if (userClickedPattern[userClickedPattern.length-1]!=gamePattern[userClickedPattern.length-1]) {
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("#level-title").text("press any key to restart");
    $("body").css("backgroundColor","red");
    setTimeout(function(){
      $("body").css("backgroundColor","#011F3F");
    },100);
    started=false;
    gamePattern=[];
    level=0;
  }
  if (userClickedPattern.length==gamePattern.length) {
    setTimeout(nextSequence,200);

  }
}
