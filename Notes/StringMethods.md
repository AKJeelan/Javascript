# JavaScript String Methods — Short Notes

String methods are built-in functions used to work with text.

---

# Creating a String

```javascript
let text = "Hello World";
```

---

# Common String Methods

| Method          | Purpose                 |
| --------------- | ----------------------- |
| `length`        | Get string length       |
| `toUpperCase()` | Convert to uppercase    |
| `toLowerCase()` | Convert to lowercase    |
| `trim()`        | Remove spaces           |
| `slice()`       | Extract part of string  |
| `substring()`   | Extract characters      |
| `replace()`     | Replace text            |
| `includes()`    | Check text exists       |
| `startsWith()`  | Check beginning         |
| `endsWith()`    | Check ending            |
| `indexOf()`     | Find position           |
| `concat()`      | Join strings            |
| `split()`       | Convert string to array |

---

# 1. `length`

```javascript
let text = "Hello";

console.log(text.length);
```

Output:

```text
5
```

---

# 2. `toUpperCase()`

```javascript
console.log(text.toUpperCase());
```

Output:

```text
HELLO
```

---

# 3. `toLowerCase()`

```javascript
console.log(text.toLowerCase());
```

---

# 4. `trim()`

Removes extra spaces.

```javascript
let name = "  John  ";

console.log(name.trim());
```

---

# 5. `slice()`

```javascript
let text = "JavaScript";

console.log(text.slice(0, 4));
```

Output:

```text
Java
```

---

# 6. `replace()`

```javascript
let text = "Hello World";

console.log(text.replace("World", "JS"));
```

Output:

```text
Hello JS
```

---

# 7. `includes()`

```javascript
let text = "JavaScript";

console.log(text.includes("Script"));
```

Output:

```text
true
```

---

# 8. `indexOf()`

```javascript
let text = "Hello";

console.log(text.indexOf("e"));
```

Output:

```text
1
```

---

# 9. `concat()`

```javascript
let first = "Hello";
let second = "World";

console.log(first.concat(" ", second));
```

---

# 10. `split()`

Converts string into array.

```javascript
let text = "apple,banana,mango";

console.log(text.split(","));
```

Output:

```javascript
["apple", "banana", "mango"];
```

# JavaScript `padStart()` and `padEnd()` String Methods

`padStart()` and `padEnd()` are string methods used to add characters to a string until it reaches a specified length.

---

# 1. `padStart()`

Adds characters to the **beginning** of a string.

## Syntax

```javascript
string.padStart(targetLength, padString)
```

- `targetLength` → final length of string
- `padString` → character(s) to add

---

## Example

```javascript
let num = "5";

console.log(num.padStart(3, "0"));
```

Output:

```text
005
```

---

## Another Example

```javascript
let text = "Hi";

console.log(text.padStart(6, "*"));
```

Output:

```text
****Hi
```

---

# 2. `padEnd()`

Adds characters to the **end** of a string.

## Syntax

```javascript
string.padEnd(targetLength, padString)
```

---

## Example

```javascript
let num = "5";

console.log(num.padEnd(3, "0"));
```

Output:

```text
500
```

---

## Another Example

```javascript
let text = "Hi";

console.log(text.padEnd(6, "*"));
```

Output:

```text
Hi****
```

---

# Important Notes

- Original string does NOT change
- Returns a new string
- Strings are immutable in JavaScript

---

# Real-World Uses

## Formatting Numbers

```javascript
let orderId = "25";

console.log(orderId.padStart(5, "0"));
```

Output:

```text
00025
```

---

## Masking Data

```javascript
let card = "1234";

console.log(card.padStart(8, "*"));
```

Output:

```text
****1234
```

---

# Summary

| Method | Adds Characters |
|---|---|
| `padStart()` | Beginning |
| `padEnd()` | End |

---

# Simple Understanding

```text
padStart() → add before
padEnd() → add after
```
---

# Template Literals

Modern way to create strings.

```javascript
let name = "John";

console.log(`Hello ${name}`);
```

---

# Important Note

Strings are:

> immutable

Meaning original string does not change.

```javascript
let text = "hello";

text.toUpperCase();

console.log(text);
```

Still:

```text
hello
```

---

# Most Used Methods

Learn these first:

- `length`
- `slice()`
- `replace()`
- `includes()`
- `split()`
- `trim()`
- `toUpperCase()`
- `toLowerCase()`
