const decreaseButton = document.getElementById("decreaseBtn");
const resetButton = document.getElementById("resetBtn");
const increaseButton = document.getElementById("increaseBtn");
const countLabel = document.getElementById("counterLabel");

let count = 0;

increaseButton.onclick = function () {
  count++;
  countLabel.textContent = count;
};

resetButton.onclick = function () {
  count = 0;
  countLabel.textContent = count;
};

decreaseButton.onclick = function () {
  count--;
  countLabel.textContent = count;
};
