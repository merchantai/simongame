var url, itr = 0;
var start=0, strict=0; 
var usrArr = [];
var simoArr = [];
var errSound = "http://ricostardeluxe.free.fr/TOON81.wav";
var sounds = {
  "red":"https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
  "green":"https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
  "blue":"https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
  "yellow":"https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
}
//Start and Strict modes

$("#start").on("click",function(){
  if(start === 0){
    start=1;
    $("#start").text("STOP");
    $("#startStatus").addClass("btn-success");
    $("#startStatus").removeClass("btn-danger");
    $("#start").addClass("btn-danger");
    $("#start").removeClass("btn-success");
    $("#red").attr("disabled",false);
    $("#green").attr("disabled",false);
    $("#blue").attr("disabled",false);
    $("#yellow").attr("disabled",false);
    generate();
  }else{
    start=0;
    $("#start").text("START");
    $("#startStatus").addClass("btn-danger");
    $("#startStatus").removeClass("btn-success");
    $("#start").addClass("btn-success");
    $("#start").removeClass("btn-danger");
    $("#red").attr("disabled",true);
    $("#green").attr("disabled",true);
    $("#blue").attr("disabled",true);
    $("#yellow").attr("disabled",true);
    resetAll();
  }
});

//strict function

$("#strict").on("click",function(){
  if(strict === 0){
    strict=1;
    $("#strictStatus").addClass("btn-success");
    $("#strictStatus").removeClass("btn-danger");
  }else{
    strict=0;
    $("#strictStatus").addClass("btn-danger");
    $("#strictStatus").removeClass("btn-success");
  }
});


//reset function

function resetAll(){
  usrArr = [];
  simoArr = [];
  $("#steps").text(simoArr.length);
}

//Play Sound
function playSound(){
  var play = document.createElement("audio");
  play.src=url;
  play.volume=1.0;
  play.autoPlay=false;
  play.preLoad=true; 
  play.play();
}

// Blink Color

function blink(clicked){
   $("#"+clicked).fadeTo(100,0.3).fadeTo(100,1.0);
  playSound();
}

// click action

$(".color").on("click",function(){
  usrArr.push(this.dataset.color);
  url = sounds[this.dataset.color];
  blink(this.dataset.color);
  if(usrArr[itr] !== simoArr[itr]){
    url = errSound;
    playSound();
    if(strict === 1){
      resetAll();
      itr = 0;
    }else{
      usrArr = [];
      itr = 0;
      showGenerated();
    }
  }else{
    itr++;
  }
  if(usrArr.length === simoArr.length){
    if(usrArr.length===20){
      $("#colors").addClass("hide");
      $("#win").removeClass("hide");
      setTimeout(function(){
      start=0; 
      $("#start").text("START");
      $("#startStatus").addClass("btn-danger");
      $("#startStatus").removeClass("btn-success");
      $("#start").addClass("btn-success");
      $("#start").removeClass("btn-danger");
      $("#red").attr("disabled",true);
      $("#green").attr("disabled",true);
      $("#blue").attr("disabled",true);
      $("#yellow").attr("disabled",true);
      resetAll();
      $("#colors").removeClass("hide");
      $("#win").addClass("hide");
    },5000);
    }else{
    itr=0;
    usrArr = [];
    generate();
    }
  }
});

//generate color

function generate(){
  var num = Math.floor((Math.random() * 4) + 1);
  switch(num){
    case 1:
      simoArr.push("red");
      break;
    case 2:
      simoArr.push("green");
      break;
    case 3:
      simoArr.push("blue");
      break;
    case 4:
      simoArr.push("yellow");
  }
  $("#steps").text(simoArr.length);
  showGenerated();
}

//show generated array

function showGenerated(){
  var i=0;
  var rep = setInterval(function(){
    url = sounds[simoArr[i]];
    blink(simoArr[i]);
    i++;
    if(i===simoArr.length){
      clearInterval(rep);
    }
  },1000);
}