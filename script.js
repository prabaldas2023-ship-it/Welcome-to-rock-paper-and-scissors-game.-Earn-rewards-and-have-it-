const choices = ["rock", "paper", "scissors"];

const emojis = {
    rock: "✊",
    paper: "📄",
    scissors: "✂️"
};

let userScore = 0;
let computerScore = 0;

let userCoins = 0;
let computerCoins = 0;

const userRewards = {
    five: false,
    ten: false,
    hundred: false
};

const computerRewards = {
    five: false,
    ten: false,
    hundred: false
};

let gameOver = false;


// Play one round
function playGame(userChoice) {

    if (gameOver) {
        document.getElementById("result").textContent =
            "🏁 Match finished! Reset to play again.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomIndex];

    document.getElementById("user-move").textContent =
        emojis[userChoice];

    document.getElementById("computer-move").textContent =
        emojis[computerChoice];

    let result = "";

    if (userChoice === computerChoice) {

        result = "🤝 It's a Draw!";

    } else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {

        userScore++;
        result = "🎉 You win this round!";

    } else {

        computerScore++;
        result = "🤖 Computer wins this round!";

    }

    document.getElementById("result").textContent = result;

    updateScores();
    checkRewards();
    checkMatchWinner();
}


// Update scores on screen
function updateScores() {

    document.getElementById("user-score").textContent = userScore;
    document.getElementById("computer-score").textContent = computerScore;

    document.getElementById("total-coins").textContent = userCoins;
}


// Check reward milestones
function checkRewards() {

    checkPlayerRewards(
        userScore,
        userRewards,
        "You"
    );

    checkPlayerRewards(
        computerScore,
        computerRewards,
        "Computer"
    );

    updateRewardDisplay();
}


// Award rewards to the player who reaches each milestone first
function checkPlayerRewards(score, rewards, player) {

    if (score >= 5 && !rewards.five) {

        rewards.five = true;

        if (player === "You") {
            userCoins += 100;
        } else {
            computerCoins += 100;
        }

        announceReward(player, "100 coins 🪙");
    }

    if (score >= 10 && !rewards.ten) {

        rewards.ten = true;

        if (player === "You") {
            userCoins += 200;
        } else {
            computerCoins += 200;
        }

        announceReward(player, "200 coins 💰");
    }

    if (score >= 20 && !rewards.hundred){
    rewards.hundred = true;

    if (player === "You") {
        userCoins += 20;
    } else {
        computerCoins += 20;
    }

    announceReward(player, "20 coins 🪙");
}
}


// Show reward notification
function announceReward(player, reward) {

    const resultElement = document.getElementById("result");

    resultElement.textContent =
        `🎉 ${player} earned ${reward}!`;
}


// Update reward cards
function updateRewardDisplay() {

    updateRewardCard("reward-5", userRewards.five);
    updateRewardCard("reward-10", userRewards.ten);
    updateRewardCard("reward-100", userRewards.hundred);
}


function updateRewardCard(id, earned) {

    const card = document.getElementById(id);

    card.textContent = earned ? "✅" : "🔒";

    card.parentElement.classList.toggle("earned", earned);
}


// Check if someone reached 100 points
function checkMatchWinner() {

    if (userScore >= 100) {

        gameOver = true;

        document.getElementById("result").textContent =
            "🏎️ YOU WIN THE CAR! Legendary achievement!";

    } else if (computerScore >= 100) {

        gameOver = true;

        document.getElementById("result").textContent =
            "🤖 Computer reached 100 points and won the car!";

    }
}


// Reset the entire game
function resetGame() {

    userScore = 0;
    computerScore = 0;

    userCoins = 0;
    computerCoins = 0;

    gameOver = false;

    userRewards.five = false;
    userRewards.ten = false;
    userRewards.hundred = false;

    computerRewards.five = false;
    computerRewards.ten = false;
    computerRewards.hundred = false;

    document.getElementById("user-move").textContent = "❔";
    document.getElementById("computer-move").textContent = "🤖";

    document.getElementById("result").textContent = "Choose your move!";

    updateScores();
    updateRewardDisplay();
}



