let gameSeq = [];
let userSeq = [];
let level = 0;
let started = false;
let allowUserClick = false;

let h2 = document.querySelector("h2");
let btnColors = ["red", "green", "blue", "yellow"];
let startBtn = document.querySelector("#start");

// Start button click handler
startBtn.addEventListener("click", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

// Flash for game (sequence)
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

// Flash for user click
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 300);
}

// next level and play full sequence
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //  new color 
    let rndmIdx = Math.floor(Math.random() * 4);
    let rndmClr = btnColors[rndmIdx];
    gameSeq.push(rndmClr);
    playSequence();
}

// Flash entire game
function playSequence() {
    allowUserClick = false; 
    let i = 0;
    let interval = setInterval(() => {
        let color = gameSeq[i];
        let btn = document.querySelector(`#${color}`);
        gameFlash(btn);
        i++;
        if (i >= gameSeq.length) {
            clearInterval(interval);
            setTimeout(() => {
                allowUserClick = true;
            }, 200);
        }
    }, 600); // Adjust speed 
}

// checking user input
function check(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            // User completed the level
            setTimeout(levelUp, 1000);
        }
    } else {
        // Game over
        h2.innerHTML = `GAME OVER! Your Score Was <b>${level}</b><br>Click Start To Play Again`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => document.body.style.backgroundColor = "", 300);
        reset();
    }
}



// Handle user button press
function pressBtn() {
    if (!started || !allowUserClick) return;

    let btnclr = this.getAttribute("id");
    userFlash(this);
    userSeq.push(btnclr);
    check(userSeq.length - 1);
}

// click listeners to all the colours
let allBtns = document.querySelectorAll(".box");
for (let btn of allBtns) {
    btn.addEventListener("click", pressBtn);
}

// Reset the game
function reset() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
    allowUserClick = false;
}

