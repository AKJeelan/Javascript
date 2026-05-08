const min = 1;
const max = 100;
const num = Math.floor(Math.random() * (max - min));

let running = true;
let attempts = 0;

while (running) {
  let guess = window.prompt(`Guess the number between ${min} & ${max}`);

  if (isNaN(guess)) {
    window.prompt("Enter a valid number");
  } else if (guess == num) {
    window.prompt(
      `Congratulations you guess the number in ${attempts} attempts !`,
    );
    running = false;
  } else if (guess > num) {
    window.prompt(`Number too High !`);
  } else if (guess < num) {
    window.prompt(`Number too low`);
  }
  attempts++;
}
