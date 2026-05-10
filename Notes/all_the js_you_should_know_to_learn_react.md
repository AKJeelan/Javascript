# JavaScript You Need to Know Before Learning React

> A practical, no-fluff guide covering every JavaScript concept you'll actually use in React — with examples.

---

## Table of Contents

1. [Variables: `let`, `const`, `var`](#1-variables)
2. [Arrow Functions](#2-arrow-functions)
3. [Template Literals](#3-template-literals)
4. [Destructuring](#4-destructuring)
5. [Spread & Rest Operators](#5-spread--rest-operators)
6. [Default Parameters](#6-default-parameters)
7. [Array Methods](#7-array-methods)
8. [Objects](#8-objects)
9. [Modules: Import & Export](#9-modules-import--export)
10. [Ternary Operator & Short-circuit Evaluation](#10-ternary-operator--short-circuit-evaluation)
11. [Optional Chaining & Nullish Coalescing](#11-optional-chaining--nullish-coalescing)
12. [Promises & Async/Await](#12-promises--asyncawait)
13. [The `this` Keyword](#13-the-this-keyword)
14. [Classes](#14-classes)
15. [Closures](#15-closures)

---

## 1. Variables

Always prefer `const` by default. Use `let` when the value will be reassigned. Avoid `var`.

```js
const name = "Alice"; // cannot be reassigned
let count = 0; // can be reassigned
count = 1; // ✅ fine

const user = { age: 25 };
user.age = 26; // ✅ fine — you're mutating, not reassigning
// user = {};               // ❌ error — can't reassign a const
```

> **Why it matters in React:** React state is often declared with `const` since you use `setState` to update it, never direct reassignment.

---

## 2. Arrow Functions

A shorter syntax for functions. They also don't have their own `this` context (important later).

```js
// Traditional function
function greet(name) {
  return "Hello, " + name;
}

// Arrow function — equivalent
const greet = (name) => "Hello, " + name;

// With a block body (when you need multiple lines)
const add = (a, b) => {
  const result = a + b;
  return result;
};

// Single parameter — parentheses optional
const double = (n) => n * 2;
```

> **Why it matters in React:** You'll use arrow functions constantly — in event handlers, inside JSX, and when defining components.

```jsx
// Common in React
<button onClick={() => setCount(count + 1)}>Click me</button>
```

---

## 3. Template Literals

Embed expressions directly inside strings using backticks `` ` ``.

```js
const name = "Alice";
const age = 30;

// Old way
console.log("My name is " + name + " and I am " + age + " years old.");

// Template literal
console.log(`My name is ${name} and I am ${age} years old.`);

// You can put any expression inside ${}
console.log(`Next year I'll be ${age + 1}`);
```

> **Why it matters in React:** Used heavily in dynamic class names, inline styles, and conditional strings.

```jsx
<div className={`card ${isActive ? "active" : ""}`}>...</div>
```

---

## 4. Destructuring

Extract values from arrays or properties from objects into variables cleanly.

### Object Destructuring

```js
const user = { name: "Alice", age: 30, city: "Muscat" };

// Old way
const name = user.name;
const age = user.age;

// Destructuring
const { name, age } = user;
console.log(name); // "Alice"

// Rename while destructuring
const { name: userName, age: userAge } = user;

// Default values
const { country = "Oman" } = user;
console.log(country); // "Oman"
```

### Array Destructuring

```js
const colors = ["red", "green", "blue"];
const [first, second] = colors;
console.log(first); // "red"
console.log(second); // "green"

// Skip elements
const [, , third] = colors;
console.log(third); // "blue"
```

> **Why it matters in React:** You use this everywhere — especially with props and hooks.

```js
// Props destructuring in a component
function UserCard({ name, age, city }) {
  return (
    <p>
      {name} is {age} from {city}
    </p>
  );
}

// useState hook returns an array
const [count, setCount] = useState(0);
```

---

## 5. Spread & Rest Operators

Both use `...` but serve different purposes.

### Spread — expands an array or object

```js
// Combining arrays
const a = [1, 2, 3];
const b = [4, 5, 6];
const combined = [...a, ...b]; // [1, 2, 3, 4, 5, 6]

// Copying an object (shallow)
const user = { name: "Alice", age: 30 };
const updatedUser = { ...user, age: 31 }; // { name: "Alice", age: 31 }

// Passing array items as individual arguments
const nums = [1, 2, 3];
console.log(Math.max(...nums)); // 3
```

### Rest — collects remaining arguments into an array

```js
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4); // 10

// Rest in destructuring
const { name, ...rest } = { name: "Alice", age: 30, city: "Muscat" };
console.log(rest); // { age: 30, city: "Muscat" }
```

> **Why it matters in React:** Spreading state updates is the standard way to update objects in React immutably.

```js
setState((prev) => ({ ...prev, age: 31 }));
```

---

## 6. Default Parameters

Provide fallback values when arguments are not passed.

```js
function greet(name = "stranger") {
  return `Hello, ${name}!`;
}

greet("Alice"); // "Hello, Alice!"
greet(); // "Hello, stranger!"
```

> **Why it matters in React:** Default props are often done this way in functional components.

```js
function Button({ label = "Click me", color = "blue" }) {
  return <button style={{ color }}>{label}</button>;
}
```

---

## 7. Array Methods

These are the most important ones for React. Learn them well.

### `map` — transform every element, returns a new array

```js
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((n) => n * 2);
// [2, 4, 6, 8]
```

```jsx
// Most common use in React — rendering lists
const users = ["Alice", "Bob", "Charlie"];
return (
  <ul>
    {users.map((user, index) => (
      <li key={index}>{user}</li>
    ))}
  </ul>
);
```

### `filter` — keep elements that pass a condition

```js
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter((n) => n % 2 === 0);
// [2, 4]
```

```js
// Removing an item in React
const removeUser = (id) => {
  setUsers(users.filter((user) => user.id !== id));
};
```

### `reduce` — combine all elements into a single value

```js
const numbers = [1, 2, 3, 4];
const total = numbers.reduce(
  (accumulator, current) => accumulator + current,
  0,
);
// 10
```

### `find` — return the first matching element

```js
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];
const alice = users.find((user) => user.id === 1);
// { id: 1, name: "Alice" }
```

### `some` / `every`

```js
const numbers = [1, 2, 3, 4];
numbers.some((n) => n > 3); // true  — at least one is > 3
numbers.every((n) => n > 0); // true  — all are > 0
```

### `includes`

```js
const fruits = ["apple", "banana", "mango"];
fruits.includes("banana"); // true
```

---

## 8. Objects

### Shorthand Properties

```js
const name = "Alice";
const age = 30;

// Old
const user = { name: name, age: age };

// Shorthand
const user = { name, age };
```

### Computed Property Names

```js
const key = "name";
const user = { [key]: "Alice" };
// { name: "Alice" }
```

### Object Methods: `Object.keys`, `Object.values`, `Object.entries`

```js
const user = { name: "Alice", age: 30, city: "Muscat" };

Object.keys(user); // ["name", "age", "city"]
Object.values(user); // ["Alice", 30, "Muscat"]
Object.entries(user); // [["name", "Alice"], ["age", 30], ["city", "Muscat"]]

// Iterating an object
Object.entries(user).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
```

---

## 9. Modules: Import & Export

React projects use ES Modules to split code across files.

### Named Exports

```js
// utils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// main.js
import { add, subtract } from "./utils";
```

### Default Export

```js
// Button.js
export default function Button({ label }) {
  return <button>{label}</button>;
}

// App.js
import Button from "./Button"; // name can be anything
```

### Mixing Both

```js
// api.js
export const BASE_URL = "https://api.example.com";
export default function fetchUser(id) { ... }

// usage
import fetchUser, { BASE_URL } from "./api";
```

---

## 10. Ternary Operator & Short-circuit Evaluation

### Ternary

```js
const isLoggedIn = true;

// if/else equivalent
const message = isLoggedIn ? "Welcome back!" : "Please log in.";

// In JSX
return <div>{isLoggedIn ? <Dashboard /> : <Login />}</div>;
```

### Short-circuit (`&&`)

```js
// Only renders if condition is true
const isAdmin = true;
return <div>{isAdmin && <AdminPanel />}</div>;

// Common gotcha — avoid using numbers directly
const count = 0;
// ❌ renders "0" on screen
{
  count && <p>Items: {count}</p>;
}
// ✅ correct
{
  count > 0 && <p>Items: {count}</p>;
}
```

### Short-circuit (`||`)

```js
const name = "" || "Anonymous"; // "Anonymous" — fallback when falsy
```

---

## 11. Optional Chaining & Nullish Coalescing

### Optional Chaining (`?.`)

Safely access nested properties without crashing if something is `null` or `undefined`.

```js
const user = null;

// ❌ throws TypeError
console.log(user.name);

// ✅ returns undefined safely
console.log(user?.name);

// Deeply nested
const city = user?.address?.city;

// With methods
const len = user?.getName?.();
```

### Nullish Coalescing (`??`)

Returns the right side only when the left is `null` or `undefined` (unlike `||` which triggers on any falsy value).

```js
const name = null ?? "Anonymous"; // "Anonymous"
const count = 0 ?? 10; // 0  ← won't fall back because 0 is not null/undefined
const count2 = 0 || 10; // 10 ← falls back because 0 is falsy
```

---

## 12. Promises & Async/Await

Handling asynchronous operations like API calls.

### Promises

```js
fetch("https://api.example.com/users")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

### Async/Await (cleaner syntax)

```js
async function getUsers() {
  try {
    const response = await fetch("https://api.example.com/users");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

> **Why it matters in React:** Data fetching inside `useEffect` is almost always done with async/await.

```js
useEffect(() => {
  async function loadUsers() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  }

  loadUsers();
}, []);
```

---

## 13. The `this` Keyword

Understanding `this` helps you understand why arrow functions are preferred in React event handlers.

```js
const obj = {
  name: "Alice",
  greetRegular: function () {
    console.log(this.name); // "Alice" — `this` is obj
  },
  greetArrow: () => {
    console.log(this.name); // undefined — arrow functions inherit `this` from surrounding scope
  },
};
```

> **Why it matters in React:** Functional components with hooks largely avoid `this` issues, but understanding it helps when reading older class-based React code.

---

## 14. Classes

React class components are less common now, but knowing JS classes helps understand the concept.

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound.`;
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks.`;
  }
}

const dog = new Dog("Rex");
dog.speak(); // "Rex barks."
```

> **Note:** Modern React uses functional components + hooks. You won't write class components often, but you may read them in older codebases.

---

## 15. Closures

A function that remembers the variables from its outer scope even after the outer function has returned.

```js
function makeCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3
```

> **Why it matters in React:** Closures power hooks. Every time a component renders, functions defined inside it close over the current state values.

```js
// This handler "closes over" the current value of `count`
const handleClick = () => {
  console.log(count); // always has the latest count
};
```

---

## Quick Reference Cheat Sheet

| Concept           | Key Use in React                        |
| ----------------- | --------------------------------------- |
| `const` / `let`   | Declaring state and variables           |
| Arrow functions   | Event handlers, callbacks in JSX        |
| Template literals | Dynamic class names, strings            |
| Destructuring     | Props, useState, useEffect dependencies |
| Spread operator   | Immutable state updates                 |
| `map`             | Rendering lists                         |
| `filter`          | Removing items from state               |
| `find`            | Selecting a specific item               |
| Import/Export     | Component and utility organization      |
| Ternary / `&&`    | Conditional rendering                   |
| Optional chaining | Safe access to deeply nested data       |
| Async/Await       | Data fetching in useEffect              |
| Closures          | How hooks work under the hood           |

---

> **Next Step:** Once you're comfortable with all of the above, you're more than ready to start learning React. Focus on `useState`, `useEffect`, and props first — you'll see every single concept from this guide show up within your first week.
