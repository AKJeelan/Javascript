const label1 = document.getElementById("label1");
const label2 = document.getElementById("label2");
const label3 = document.getElementById("label3");
const myButton = document.getElementById("myButton");

let min = 1;
let max = 6;

myButton.onclick = function () {
  label1.textContent = Math.floor(Math.random() * max);
  label2.textContent = Math.floor(Math.random() * max);
  label3.textContent = Math.floor(Math.random() * max);
};
