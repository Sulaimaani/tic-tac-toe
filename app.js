let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

const PLAYER_X = 'X';
const PLAYER_O = 'O';
let currentPlayer = PLAYER_X;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  currentPlayer = PLAYER_X;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const switchPlayer = () => {
  currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
};

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      box.innerText = currentPlayer;
      count++;

      let isWinner = checkWinner();

      if (count === 9 && !isWinner) {
        gameDraw();
      } else {
        switchPlayer();
        if (currentPlayer === PLAYER_O) {
          // AI Player's turn
          setTimeout(() => {
            AIMove();
          }, 500); // Delay AI move for better user experience
        }
      }
    }
  });
});

const AIMove = () => {
  // Simple AI: Choose a random empty box
  const emptyBoxes = Array.from(boxes).filter((box) => box.innerText === "");
  if (emptyBoxes.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    const selectedBox = emptyBoxes[randomIndex];
    selectedBox.innerText = currentPlayer;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    } else {
      switchPlayer();
    }
  }
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
