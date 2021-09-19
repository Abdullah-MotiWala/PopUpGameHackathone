auth.onAuthStateChanged((user) => {
  if (!user) {
    location.href = "/";
  } else {
    document.querySelector(".emailHolder").innerHTML = user.email;
    userName = user.email;
  }
});
const gameDiv = document.querySelector(".gamePortion");
const navTop = document.querySelector(".navTop");
const startBtn = document.querySelector(".startBtn");
let score = +document.querySelector(".score").innerHTML;
const gameOverDiv = document.querySelector(".gameOver");
const playAgain = document.querySelector(".playAgain");
const targetColor = document.querySelector(".targerColor");
playAgain.addEventListener("click", () => {
  gameOverDiv.style.display = "none";
  startBtn.style.display = "flex";
});

const colorsArr = [
  "rgb(255, 186, 8)",
  "rgb(208, 0, 0)",
  "rgb(135, 131, 209)",
  "rgb(18, 148, 144)",
  "rgb(0, 79, 45)",
  "rgb(225, 176, 126)",
  "rgb(20, 13, 79)",
];
//saving colors for targetting
let targetColorArr = [];
const createBalloon = () => {
  const balloon = document.createElement("div");
  balloon.setAttribute("class", "balloon");
  let random = Math.floor(Math.random() * 5);
  generatedColor = colorsArr[random];
  //deleting and geting targetting color
  targetColorArr.shift();
  targetColorArr.push(generatedColor);
  balloon.style.backgroundColor = generatedColor;
  gameDiv.appendChild(balloon);
};
const levelOne = () => {
  startBtn.style.display = "none";
  for (let i = 0; i < 30; i++) {
    createBalloon();
  }
  poping();
  console.log(targetColorArr);
};

const poping = () => {
  gameDiv.addEventListener("mouseover", (e) => {
    if (
      getComputedStyle(e.target).getPropertyValue("background-color") ==
      targetColorArr[0]
    ) {
      score = score + 10;
      document.querySelector(".score").innerHTML = score;
      setTimeout(() => {
        e.target.style.visibility = "hidden";
      }, 00);
    } else {
      gameDiv.style.display = "none";
      gameOverDiv.style.display = "block";
    }
  });
};

startBtn.addEventListener("click", () => setTimeout(levelOne, 1500));
const signOut = () => {
  auth.signOut();
};
