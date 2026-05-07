// Method Chaining = Calling one method after another
//                                    in one continuous line of code.

const userName = window.prompt("Enter your username");
let letter = userName.charAt(0).toUpperCase();
let extraCharacters = userName.slice(1).toLowerCase();

console.log(letter + extraCharacters);
