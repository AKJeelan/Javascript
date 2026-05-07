// IF STATEMENTS = if a condition is true, execute some code
//                                   if not, do something else

const button = document.getElementById("mySubmit");
const input = document.getElementById("myText");
const resultStatement = document.getElementById("resultStatement");

button.onclick = function () {
  age = input.value;
  age = Number(age);

  if (age > 18) {
    // console.log(`Your age is greater than 18`);
    resultStatement.textContent = "Your age is greater than 18";
  } else if (age > 0 && age < 18) {
    console.log(`Your age is less than 18`);
    resultStatement.textContent = "Your age is less than 18";
  } else {
    console.log(`Your age is less than 0`);
    resultStatement.textContent = "Your age is less than 0";
  }
};
