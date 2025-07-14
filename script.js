const start = document.querySelector(".start");
const enemy = document.querySelector(".enemy");
const character = document.querySelector(".character");
const game = document.querySelector(".game");

let counter = 0;
let deathInterval;
let scoreUpdated = false;

// Create a visible counter display
const counterDisplay = document.createElement("div");
counterDisplay.className = "score";
counterDisplay.textContent = counter;
game.appendChild(counterDisplay);

function startGame() {
    counter = 0;
    counterDisplay.textContent = counter;
    scoreUpdated = false;

    enemy.classList.remove("enemyAnimate"); // reset in case it's already running
    void enemy.offsetWidth; // force reflow
    enemy.classList.add("enemyAnimate");

    checkDeath();
}

start.addEventListener("click", startGame);

function jump() {
    if (!character.classList.contains("jump")) {
        character.classList.add("jump");
        setTimeout(() => {
            character.classList.remove("jump");
        }, 1000);
    }
}

character.addEventListener("click", jump);
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        jump();
    }
});

function checkDeath() {
    if (deathInterval) return;

    deathInterval = setInterval(function () {
        let enemyLeft = parseInt(getComputedStyle(enemy).getPropertyValue("left"));
        let characterTop = parseInt(getComputedStyle(character).getPropertyValue("top"));

        if (enemyLeft < 80 && enemyLeft > 0 && characterTop >= 300) {
            resetGame();

            const loseMessage = document.createElement("div");
            loseMessage.className = "lose-message";
            loseMessage.textContent = "You Lose!";
            game.appendChild(loseMessage);
            setTimeout(() => game.removeChild(loseMessage), 1000);
        }
        else if (enemyLeft < 80 && enemyLeft > 0 && !scoreUpdated && characterTop < 300) {
            counter++;
            counterDisplay.textContent = counter;
            scoreUpdated = true;
        }
        else if (enemyLeft >= 300) {
            scoreUpdated = false;
        }
    }, 5);
}


function resetGame() {
    enemy.classList.remove("enemyAnimate");
    enemy.style.left = "925px"; // reset position
    character.classList.remove("jump");

    clearInterval(deathInterval);
    deathInterval = null;
}
