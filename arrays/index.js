// Arrays in javascript.

let fruits = ["Apple", "Mango", "Banana"];

for (let fruit of fruits) {
  console.log(fruit);
}

fruits.push("Ande");
fruits.pop();
fruits.unshift("Egg");
fruits.shift();

fruits.sort();
fruits.sort().reverse();
console.log(fruits);

// 2D array = multi-dimensional array that stores a matrix
//                    of data in rows and columns.
//                    Useful for games, spreadsheets, or representing images

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ["*", 0, "#"],
];

for (let mat of matrix) {
  let rowString = mat.join(" ");
  console.log(mat);
}

// console.log(matrix);
