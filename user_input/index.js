// How to accept user input

// 1. EASY WAY = window prompt
// 2. PROFESSIONAL WAY = HTML textbox

// let userName = window.prompt("What's your name");
// console.log(userName);

let userName;

document.getElementById("mySubmit").onclick = function () {
  userName = document.getElementById("myText").value;
  console.log(userName);

  document.getElementById("myH1").textContent = `Welcome ${userName}`;
};
