var aliensHeadCount = 0;
var cycleNumber = 2;
var gameRounds = 1;
var gameRoundLength = 7000;
var id = 0;
var idmaker;
var score = 0;
var died = false;
let countingClock;
let clockSeconds = 00;
let clockMinutes = 00;
const clock = document.getElementById("clock");

function loadGame() {
  var startContainer = document.getElementsByClassName("starting-element-container")[0];
  startContainer.style.display = 'none';
  countingClock = setInterval(gameClock, 1000);
  clock.innerHTML = "00:00";
  gameStart();
}

function gameStart() {
    cycle();
    var timer = setInterval(function(){
        died = gameCheck();
        if (died) {
            clearInterval(timer);
            gameFinish();
        } else {
            cycle();
            roundSetter();
        } }, gameRoundLength);
}

function gameCheck() {
    if (aliensHeadCount == 0) {
        return false;
    } else {
        return true;
    }
}

function roundSetter() {
    gameRounds++;
    document.getElementById('level-count').innerHTML = `Level: ${gameRounds}`;
}

// ADD CORRECT NUMBER OF ALIENS
function cycle() {
    cycleNumber += 1;
    aliensHeadCount += cycleNumber;
    for (var i = 0; i < cycleNumber; i++) {
        spawnAlien();
    }
}

function spawnAlien() {
    var area = document.getElementById("area");
    var alienNumber = Math.floor((Math.random() * 10) + 1); // 1 to 10
    var alienPath = "img/space/invader"+alienNumber+".png";
    var top = positionRandomizerDesktop(0);
    var left = positionRandomizerDesktop(1);
    birthAlien(alienPath, top, left);
    idmaker = "a" + id;
    document.getElementById(idmaker).classList.add("visible");
    id += 1;
}

function positionRandomizerDesktop(identifyier) {
    var output = Math.floor((Math.random() * 100) + 1);
    if (identifyier == 0) {
        while (output > 92) {
            output = Math.floor((Math.random() * 100) + 1);
        }
    } else {
        while (25 > output || output > 67) {
            output = Math.floor((Math.random() * 100) + 1);
        }
    }
    return output;
}

function birthAlien(alienPath, top, left) {
    var alien = document.createElement("img");
    alien.setAttribute('class', 'alien');
    alien.setAttribute('style', 'top: '+ top + '%; left: '+left+'%;');
    alien.setAttribute('onclick', 'deleteAlien(this)');
    alien.setAttribute('src', alienPath);
    alien.setAttribute('id', "a" + id);
    area.appendChild(alien);
}

// ALIEN FUNCTION

function deleteAlien(alien) {
    aliensHeadCount -= 1;
    score += 10;
    document.getElementById('score').innerHTML = `Score: ${score}`;
    var parent = document.getElementById("area");
    parent.removeChild(alien);
}

function gameFinish() {
    clearTimeout(countingClock);

    var parent = document.getElementById("area");
    children = document.getElementsByClassName("alien");
    childrenN = children.length;
    for (var i = 0; i < childrenN; i++) {
        parent.removeChild(children[0]);
    }

    document.getElementById("score").innerHTML = `DIED <br><br> Score: ${score}`;
    displayEndscreen();
}

function displayEndscreen() {
    var area = document.getElementById("area");
    var endtext = document.createElement("div");
    endtext.setAttribute('class', 'endtext');
    area.appendChild(endtext);
    document.getElementsByClassName("endtext")[0].innerHTML = `Thank you for playing! Try again:<br>`;
    var endbutton = document.createElement("button");
    endbutton.setAttribute('class', 'endbutton');
    endbutton.setAttribute('onclick', 'newGameInitiator()');
    endtext.appendChild(endbutton);
    document.getElementsByClassName("endbutton")[0].innerHTML = `New Game`;
}

function newGameInitiator() {
    resetGlobalVariables();
    var parent = document.getElementById("area");
    child = document.getElementsByClassName("endtext");
    parent.removeChild(child[0]);
    gameStart();
}

function resetGlobalVariables() {
    aliensHeadCount = 0;
    cycleNumber = 2;
    gameRounds = 1;
    id = 0;
    score = 0;
    died = false;
    clockSeconds = 00;
    clockMinutes = 00;
}

// CLOCK FUNCTION
function gameClock() {
    clockSeconds++;

    if (clockMinutes < 10 && clockSeconds < 10) {
        clock.innerHTML = `0${clockMinutes}:0${clockSeconds}`;
    }
    else if (clockMinutes > 9 && clockSeconds < 10) {
        clock.innerHTML = `${clockMinutes}:0${clockSeconds}`;
    }
    else if (clockMinutes < 10 && clockSeconds > 9) {
        clock.innerHTML = `0${clockMinutes}:${clockSeconds}`;
    }
    else {
        clock.innerHTML = `${clockMinutes}:${clockSeconds}`;
    }
    if (clockSeconds > 59) {
        clockMinutes++;
        clockSeconds = 0;
    }
}
