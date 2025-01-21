const gameContainer = document.querySelector(`.container`);
const allMoleItems = document.querySelectorAll(`.item`);

const whackSound = new Audio(`/sound/whack.mp3`);
const backgroundMusic = new Audio(`/sound/music.mp3`)
backgroundMusic.loop = true; 
backgroundMusic.volume = 0.3;


let startGame, startTime;
let countDown = 20;
let score = 0;

const timeCount = document.getElementById(`time-count`);
const scoreCount = document.getElementById(`score-count`);

const startButton = document.getElementById(`start-game`);
const restartButton = document.getElementById(`restart-game`);

startButton.addEventListener("click", () => {
    startGameLogic();
    startButton.style.display = "none";
    restartButton.style.display = "none";
    backgroundMusic.play();
})

restartButton.addEventListener("click", () => {
    resetGame();
    startButton.style.display = "block";
    restartButton.style.display = "none";
})

gameContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("mole-clicked")) {
        whackSound.currentTime = 0;
        whackSound.play();

        score++; 
        scoreCount.innerHTML = score;

        const bushElement = e.target.parentElement.previousElementSibling;
        let textElement = document.createElement("span");
        textElement.setAttribute("class", "whack-text");
        textElement.innerHTML = "Whack!";
        bushElement.appendChild(textElement);

        setTimeout(() => {
           textElement.remove(); 
        }, 300);
    }
});

function startGameLogic() {
    countDown = 20;
    score = 0;

    scoreCount.innerHTML = score;
    timeCount.innerHTML = countDown;

    startTime = setInterval(() => {
        timeCount.innerHTML = countDown;
        countDown--;
        if (countDown < 0) {
            endGame();
        }
    }, 1000)

    startGame = setInterval(() => {
        showMole();
    }, 600)

}

function endGame() {
    clearInterval(startGame);
    clearInterval(startTime);
    timeCount.innerHTML = "0";
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    restartButton.style.display = "block";
}

function resetGame() {
    countDown = 20;
    score = 0;

    scoreCount.innerHTML = score;
    timeCount.innerHTML = countDown;

    clearInterval(startTime);
    clearInterval(startGame);

    allMoleItems.forEach((item => {
        const mole = item.querySelector(".mole");
        mole.classList.remove("mole-appear");
    }))
}

function showMole() {
    if (countDown <= 0) {
        return;
    }

    let moleToAppear = allMoleItems[getRandomValue()].querySelector(".mole");
    moleToAppear.classList.add("mole-appear");
    hideMole(moleToAppear);

}

function getRandomValue() {
    let rand = Math.random() * allMoleItems.length;
    return Math.floor(rand);
}

function hideMole(moleItem) {
    setTimeout(() => {
        moleItem.classList.remove("mole-appear")
    }, 1000)
}