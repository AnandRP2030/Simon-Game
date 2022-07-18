var gamePattern = [];
var userClickedPattern = [];
var randomChosenColor; 
var userChosenColor;
var randomChosenColor;
var currentLevel;
var started = true;                                    // find if game start or not.
var level = 0;                                        // when start the game level is 0
var buttonColor = ["green","red","yellow","blue"];


$(document).keypress(function(){
    if ( started===true ) {
        $("body").removeClass("wrong")
        $("h1").text("LEVEL  "+ level)
        nextSequence();
        started = false;

    }
    
})



// user click on button
$(".btn").on("click",function(event){
     
    // hidden rules (optional)
    $(".game-rules").removeClass('showRule');

     userChosenColor = (event.target.id);                           // get id of the element , that is which is user clicked 

     userClickedPattern.push(userChosenColor);    

     currentLevel = userClickedPattern.length-1;
     
     checkAnswer(currentLevel);
     playSound(userChosenColor);
     animatePress(userChosenColor);
});


function checkAnswer (currentLevel){

        if ( gamePattern[currentLevel] === userClickedPattern [currentLevel] ){
           
            if( gamePattern.length === userClickedPattern.length ){
                setTimeout(function(){
                    nextSequence();
                },1000)
            }
        }else{
            startOver();
            
        }

                
}
function startOver(){

   
    $("body").addClass("wrong");
    $("h1").text("Game Over Press any key to Restart ");

    var wrongAudio = new Audio ('sounds/wrong.mp3')
    wrongAudio.play();

    started = true;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    if($(window).width()<820){
        $("h1").text("Wrong pattern Press Start Game");
    }

}
    


 function nextSequence(){
  

    userClickedPattern = [];
    level++
    $("h1").text("Level  "+level)


     randomNumber = Math.floor(Math.random()*4)

     randomChosenColor = buttonColor[randomNumber];              // Assign a color to the 'randomChosenColor' variable. depends on the random number

     gamePattern.push(randomChosenColor)

     $("#"+ randomChosenColor ).fadeOut(100).fadeIn(100);             // Target button using ID , flash the btn 
     
     // call function & pass the color as an argument
     playSound(randomChosenColor);

    
 }

     


 function playSound(name){
     
     var audio = new Audio ('sounds/'+ name+'.mp3');      
     audio.play();

 }


 function animatePress (currentColor){

     $( "#"+currentColor ).addClass("pressed");
     
     setTimeout(function(){
          $( "#"+currentColor).removeClass("pressed");
     },100 )

 }

/* button rules */

$(".btn-rules").on("click",function(){
    $(".game-rules").toggleClass('showRule')
})


/*   Screen Size differnet function */

if ($(window).width()<820){
    $("h1").text("Press Start ")

    $(".start-game").on("click",function(){
        if ( started === true ) {
            $("body").removeClass("wrong")
            $("h1").text( "Level"+level )
            nextSequence();
            started = false;
        }
    })
}