const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const sandal = document.getElementById('sandal');
const winningScreen = document.getElementById('winningScreen');
const losingScreen = document.getElementById('losingScreen');
const playAgainButton = document.getElementById('playAgain');
const tryAgainButton = document.getElementById('tryAgain');
const hitSound = document.getElementById('hitSound');
const winningSound = document.getElementById('winningSound');
const loader = document.getElementById('loader');
let score = 0;
const totalDictators = 10;
let gameActive = true;
let gameTime = 60; 
let gameInterval;
let timerInterval;


let dictatorImages = [
    './src/img/sheikh_hasina.webp',
    './src/img/hasan.webp',
    './src/img/sumon.webp',
    './src/img/palak.webp',
    './src/img/jafor.webp',
    './src/img/harun.webp',
    './src/img/edu-mp.webp',
    './src/img/obaidul.webp',
    './src/img/arafat.webp',
    './src/img/manik.webp'
];

document.addEventListener('mousemove', (e) => {
    sandal.style.left = `${e.pageX - 50}px`;
    sandal.style.top = `${e.pageY - 50}px`;
});
document.addEventListener('click', (e) => {
    sandal.style.transform = 'scale(0.8)'; 
    setTimeout(() => {
        sandal.style.transform = 'rotate(-10deg)'; 
    }, 100); 
});

function createDictator() {
    if (!gameActive) return;

    const dictator = document.createElement('div');
    dictator.classList.add('dictator');

    const randomIndex = Math.floor(Math.random() * dictatorImages.length);
    const randomImage = dictatorImages[randomIndex];
    dictator.style.backgroundImage = `url(${randomImage})`;

    dictator.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
    dictator.style.top = `${Math.random() * (window.innerHeight - 100)}px`;

    dictator.addEventListener('click', () => {
        if (!gameActive) return;

        hitSound.play();
        score++;
        scoreDisplay.textContent = `Score: ${score}`;

        const rect = dictator.getBoundingClientRect();
        sandal.style.left = `${rect.left + rect.width / 2 - 60}px`; 
        sandal.style.top = `${rect.top + rect.height / 2 - 60}px`;
        dictator.remove();
        dictatorImages.splice(randomIndex, 1); 
        checkWinCondition();
    });

    gameContainer.appendChild(dictator);

    const baseLifetime = 900;
    const speedIncrease = 50; 
    const dictatorLifetime = Math.max(baseLifetime - (speedIncrease * score), 600); 


    setTimeout(() => {
        if (dictator.parentNode) {
            dictator.remove();
            checkWinCondition();
        }
    }, dictatorLifetime);
}


function gameLoop() {
    if (!gameActive) return;

    if (document.querySelectorAll('.dictator').length < totalDictators) {
        createDictator();
    }
}


function checkWinCondition() {
    if (score === totalDictators) {
        endGame(true);

    }
}

function endGame(won) {
    clearInterval(timerInterval);
    clearInterval(gameInterval);
    gameActive = false;

    if (won) {
        winningSound.play();
        winningScreen.style.display = 'block';
    } else {
        losingScreen.style.display = 'block';
    }

    sandal.style.display = 'none';
    gameContainer.style.cursor = 'auto';
}

function updateTimer() {
    gameTime--;
    timerDisplay.textContent = `Time: ${gameTime}s`;

    if (gameTime <= 0) {
        endGame(false);
    }
}


function restartGame() {
    gameContainer.style.cursor = 'none';
    sandal.style.display = 'block';
    score = 0;
    gameTime = 60;
    scoreDisplay.textContent = `Score: 0`;
    timerDisplay.textContent = `Time: 60s`;
    winningSound.pause();
    winningSound.currentTime = 0;
    winningScreen.style.display = 'none';
    losingScreen.style.display = 'none';
    gameActive = true;

    dictatorImages = [
        './src/img/sheikh_hasina.webp',
        './src/img/hasan.webp',
        './src/img/sumon.webp',
        './src/img/palak.webp',
        './src/img/jafor.webp',
        './src/img/harun.webp',
        './src/img/edu-mp.webp',
        './src/img/obaidul.webp',
        './src/img/arafat.webp',
        './src/img/manik.webp'
    ];


    gameInterval = setInterval(gameLoop, 1000);
    timerInterval = setInterval(updateTimer, 1000);
}

playAgainButton.addEventListener('click', restartGame);
tryAgainButton.addEventListener('click', restartGame);

window.onload = function () {

    loader.style.display = 'block';

    setTimeout(() => {

        loader.style.display = 'none';
        gameContainer.style.display = 'block';
        gameInterval = setInterval(gameLoop, 1000);
        timerInterval = setInterval(updateTimer, 1000);
    }, 2000); 
};
