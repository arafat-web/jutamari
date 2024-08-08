const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
const stick = document.getElementById('stick');
const winningScreen = document.getElementById('winningScreen');
const playAgainButton = document.getElementById('playAgain');
const hitSound = document.getElementById('hitSound');
const winningSound = document.getElementById('winningSound');
const loader = document.getElementById('loader');
let score = 0;
const totalDictators = 10;
let gameActive = true;

// Array of dictator images
const dictatorImages = [
    'https://rsf.org/sites/default/files/rsf_drupal7/sheikh_hasina.png',
    'https://amarmp.com/propic/profile/725_1488729269.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuJRusC_1DJxjp3pgsUHOvfmNXbvD7bjDYaMwAwZikgkWpysaxzKYk4lJlZKltexLsunM&usqp=CAU',
    'https://s41721.pcdn.co/wp-content/uploads/2024/04/BANGLADESH-H.E.-Mr.-Zunaid-Ahmed-Palak-photo.jpg',
    'https://dailyasianage.com/library/1657743156_3.jpg',
    'https://ecdn.dhakatribune.net/contents/cache/images/1200x630x1xxxxx1x694528/uploads/media/2023/10/12/Mohammad-A.-Arafat-4e79504b2a7339cbd69a686bd546be48.jpg?watermark=media%2F2023%2F05%2F28%2F1280px-Dhaka_Tribune_Logo.svg-1-a9e61c86dded62d74300fef48fee558f.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiTzQOYGJFtPYOzL_8PdAR_h1GoZVLCuwTAQ&s',
    'https://cdn.daily-sun.com/public/news_images/2024/04/23/1713866432-735b6f3f6d4d9880721457778911fba3.jpg',
    'https://dailyasianage.com/library/1545504095_2.jpg',
    'https://www.dailymessenger.net/media/imgAll/2022February/en/34-2401111733.jpg'
];



document.addEventListener('mousemove', (e) => {
    stick.style.left = `${e.pageX - 50}px`;
    stick.style.top = `${e.pageY - 50}px`;
});


function createDictator() {
    if (!gameActive) return;

    const dictator = document.createElement('div');
    dictator.classList.add('dictator');

    const randomImage = dictatorImages[Math.floor(Math.random() * dictatorImages.length)];
    dictator.style.backgroundImage = `url(${randomImage})`;

    dictator.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
    dictator.style.top = `${Math.random() * (window.innerHeight - 100)}px`;

    dictator.addEventListener('click', () => {
        if (!gameActive) return;

        hitSound.play();
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        dictator.remove();
        checkWinCondition();
    });

    gameContainer.appendChild(dictator);

    // Remove dictator after 2 seconds if not clicked
    setTimeout(() => {
        if (dictator.parentNode) {
            dictator.remove();
            checkWinCondition();
        }
    }, 900);
}

// Game loop to continuously create dictators
function gameLoop() {
    if (!gameActive) return;

    if (document.querySelectorAll('.dictator').length < totalDictators) {
        createDictator();
    }
    setTimeout(gameLoop, 1000);
}

// Check if the player has won
function checkWinCondition() {
    if (score === totalDictators) {
        gameActive = false;
        winningSound.play();
        winningScreen.style.display = 'block';
        stick.style.display = 'none';

    }
}

// Restart the game
playAgainButton.addEventListener('click', () => {
    stick.style.display = 'block';
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    winningSound.pause();
    winningSound.currentTime = 0;
    winningScreen.style.display = 'none';
    gameActive = true;
    gameLoop();
});

// Start the game loop after a delay for loader
window.onload = function () {
    setTimeout(() => {
        gameLoop();
    }, 2000);
}
