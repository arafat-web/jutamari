<?php include 'counter.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kill the Dictator Game</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="loader" class="loader"></div>
    <div id="gameContainer" class="hidden">
        <div id="score">Score: 0</div>
        <div id="timer">Time: 60s</div>
        <img id="sandal" src="src/img/juta.webp" alt="Sandal" />
        <div id="winningScreen" class="hidden">
            <p style="margin-bottom: 5px;">Victory!</p>
            <p>Welcome to Bangladesh 2.0</p>
            <button id="playAgain">Play Again</button>
        </div>
        <div id="losingScreen" class="hidden">
            <p style="margin-bottom: 5px;">Time's Up!</p>
            <p>Bangladesh is suffering!</p>
            <button id="tryAgain">Try Again</button>
        </div>
    </div>
    <audio id="hitSound" src="src/audio/stick.ogg"></audio>
    <audio id="winningSound" src="src/audio/na.ogg"></audio>
    <script src="script.js"></script>
</body>

</html>