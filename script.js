const start = document.querySelector(".start")
const enemy = document.querySelector(".enemy")
const character = document.querySelector(".character")

function startGame(){
    enemy.classList.add("enemyAnimate");
    checkDeath();
}

start.addEventListener("click", startGame);

function jump() {
    character.classList.add("jump");
    setTimeout(function() {
        character.classList.remove("jump");
    }, 1000);
}

character.addEventListener("click", jump);
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        jump();
    }
});
let deathInterval;

var checkDeath = function() {
    if (deathInterval) return;

    deathInterval = setInterval(function() {
        let enemyLeft = parseInt(getComputedStyle(enemy).getPropertyValue("left"));
        let characterTop = parseInt(getComputedStyle(character).getPropertyValue("top"));
        console.log("enemy:", enemyLeft, "char top:", characterTop);

        if (enemyLeft < 80 && enemyLeft > 0 && characterTop >= 300) {
            alert("Game Over!");
            resetGame(); // Reset the game on collision
        }
    }, 10);
};


function resetGame() {
    enemy.classList.remove("enemyAnimate");
    enemy.style.left = "925px"; // or wherever it starts offscreen
    character.classList.remove("jump");

    clearInterval(deathInterval);
    deathInterval = null;
}
