// while loop = repeat some code WHILE some condition is true

let loggedIn = false;
let userName;
let password;

while (!loggedIn) {
  userName = window.prompt(`Enter your user name`);
  password = window.prompt(`Enter your password`);

  if (userName === "Abdul" && password === "Kajel") {
    loggedIn = true;
    console.log("You are logged in Welcome to the world");
  } else {
    console.log("Enter correct user name and password");
  }
}
