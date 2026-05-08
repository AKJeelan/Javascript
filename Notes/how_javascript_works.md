# JavaScript Code Execution — How It Works

> Notes based on a video explanation of JavaScript internals: execution context, call stack, and memory allocation.

---

## 1. The Stack (Data Structure)

- A **stack** works like a pile of books — values are stacked on top of each other.
- **LIFO** (Last In, First Out): the value added last is the first to be removed.
- To access a value at the bottom, you must first remove all values above it.
- To add a new value, it always goes on **top**.

---

## 2. How JavaScript Executes Code

When JavaScript runs, it goes through **two phases** inside an **Execution Context**:

### Phase 1 — Memory Creation (Creation Phase)

- Memory is allocated for all **variables** and **functions**.
- Variables are stored with a placeholder value (`undefined`) initially.
- Functions store their **entire code** in memory.

### Phase 2 — Code Execution

- Code runs **line by line**.
- Variables get their actual values assigned.
- Function declarations are skipped (already stored in Phase 1).
- When a **function is called**, a new execution context is created for it.

---

## 3. Execution Context

- Every time JavaScript starts running, a **Global Execution Context (GEC)** is created.
- Every time a **function is called**, a brand new **local execution context** is created for that function.
- Each execution context has its own two phases (memory + execution).
- When a function finishes executing, its execution context is **destroyed**.

---

## 4. The Call Stack

- The **Call Stack** keeps track of all execution contexts.
- Works like a stack (LIFO).
- **How it works:**
  1. The **Global Execution Context** is pushed onto the stack first.
  2. When a function is called → its execution context is **pushed** onto the stack.
  3. When the function finishes → its execution context is **popped** off the stack.
  4. Once all code is done → the Global Execution Context is also removed.

---

## 5. Step-by-Step Example

Given code with one variable and two functions (`firstFunction` and `secondFunction`):

```
var name = "Hello World"

function firstFunction() {
    // calls log
    console.log("Inside First Function")
    secondFunction()
    console.log("Again Inside First Function")
}

function secondFunction() {
    console.log("Inside Second Function")
}

firstFunction()
```

### Execution Walkthrough

| Step | What Happens                                                                                     | Call Stack State                            |
| ---- | ------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| 1    | Global Execution Context created, memory allocated for `name`, `firstFunction`, `secondFunction` | `[GEC]`                                     |
| 2    | `name` gets value `"Hello World"`                                                                | `[GEC]`                                     |
| 3    | `firstFunction()` is called → new execution context created                                      | `[GEC, firstFunction]`                      |
| 4    | Inside `firstFunction`, `console.log` runs → **"Inside First Function"** printed                 | `[GEC, firstFunction, log]`                 |
| 5    | `log` finishes → popped off stack                                                                | `[GEC, firstFunction]`                      |
| 6    | `secondFunction()` is called → new execution context created                                     | `[GEC, firstFunction, secondFunction]`      |
| 7    | Inside `secondFunction`, `console.log` runs → **"Inside Second Function"** printed               | `[GEC, firstFunction, secondFunction, log]` |
| 8    | `log` finishes → popped; `secondFunction` finishes → popped                                      | `[GEC, firstFunction]`                      |
| 9    | Back in `firstFunction`, second `console.log` runs → **"Again Inside First Function"** printed   | `[GEC, firstFunction, log]`                 |
| 10   | `log` finishes → popped; `firstFunction` finishes → popped                                       | `[GEC]`                                     |
| 11   | All code done → GEC removed                                                                      | `[]`                                        |

### Expected Output

```
Inside First Function
Inside Second Function
Again Inside First Function
```

---

## 6. Key Takeaways

- JavaScript is **single-threaded** and uses a **call stack** to manage execution.
- Every function call creates a **new execution context**.
- Memory for variables is allocated **before** code runs (this is why **hoisting** works).
- Understanding execution context and the call stack is essential for understanding **hoisting**, **closures**, and **asynchronous JavaScript**.

---

# Asynchronous JavaScript — Event Loop, Task Queue & Microtask Queue

> Notes based on a video covering how JavaScript handles asynchronous code internally, including the Call Stack, Web APIs, Task Queue, Microtask Queue, and the Event Loop.

---

## 1. Recap — Call Stack

- The **Call Stack** is the JavaScript engine itself.
- Any JavaScript code **must be pushed into the Call Stack** to be executed.
- The Call Stack follows **LIFO** (Last In, First Out).
- **Key Rule: The Call Stack waits for nothing.** It never pauses for timers or async tasks.

---

## 2. The Problem — `setTimeout` Output Order

Given this code:

```javascript
console.log("Start of Script");

setTimeout(() => {
  console.log("This is from the Task Queue");
}, 0);

console.log("End of Script");
```

**Output:**

```
Start of Script
End of Script
This is from the Task Queue
```

❓ Why does the `setTimeout` callback appear **last**, even with `0ms` delay?

---

## 3. Web APIs — Where `setTimeout` Actually Lives

- `setTimeout` is **NOT a part of JavaScript** itself.
- It is provided by the **Web Browser (Web API)**.
- When `setTimeout` is called, JavaScript hands off the timer to the Web API.
- The Web API runs the timer in the background without blocking the Call Stack.
- Meanwhile, the Call Stack continues executing the next lines.

**Flow:**

```
JS calls setTimeout → Web API starts a timer → JS keeps running → Timer expires → callback is queued
```

---

## 4. The Task Queue (Callback Queue)

- Once the Web API timer expires, the callback is **not pushed directly into the Call Stack**.
- Instead, it is placed into the **Task Queue** (also called Callback Queue).
- The Task Queue follows **FIFO** (First In, First Out).

**What goes into the Task Queue:**

- `setTimeout` callbacks
- `setInterval` callbacks
- `setImmediate` callbacks
- DOM event listeners (e.g., click, input)

---

## 5. The Event Loop

- The **Event Loop** monitors both the Task Queue and the Call Stack.
- It picks items from the queue and pushes them into the Call Stack — **but only when the Call Stack is empty**.

```
Event Loop Rule:
  If Call Stack is empty AND Task Queue has items → push task into Call Stack
```

This is why `setTimeout(..., 0)` still runs last — the Event Loop waits until all synchronous code finishes before picking from the queue.

---

## 6. The Microtask Queue

When **Promises** are involved, a second queue comes into play.

```javascript
console.log("Start of Script");

setTimeout(() => {
  console.log("This is from the Task Queue");
}, 0);

Promise.resolve().then(() => {
  console.log("This is from the Promise");
});

console.log("End of Script");
```

**Output:**

```
Start of Script
End of Script
This is from the Promise
This is from the Task Queue
```

### Why does the Promise run before `setTimeout`?

- Promise callbacks go into the **Microtask Queue**, not the Task Queue.
- The **Microtask Queue has higher priority** than the Task Queue.

**Event Loop Priority Rule:**

```
1. Execute all synchronous code (Call Stack)
2. When Call Stack is empty → drain the Microtask Queue completely first
3. Only then → pick one task from the Task Queue
4. Repeat
```

**What goes into the Microtask Queue:**

- Promise `.then()` / `.catch()` / `.finally()` callbacks
- `queueMicrotask()` callbacks
- `MutationObserver` callbacks

---

## 7. Full Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                   Source Code                       │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│           Global Execution Context                  │
│  (pushed into Call Stack → runs line by line)       │
└────────────────────┬────────────────────────────────┘
                     │
        ┌────────────┴──────────────┐
        ▼                           ▼
┌──────────────┐         ┌─────────────────────┐
│  Call Stack  │         │      Web APIs        │
│  (JS Engine) │◄───────►│  setTimeout          │
│              │         │  setInterval         │
└──────┬───────┘         │  Promise (async)     │
       │                 │  fetch, etc.         │
       │                 └──────┬───────────────┘
       │                        │
       │              ┌─────────┴──────────────┐
       │              ▼                         ▼
       │   ┌──────────────────┐   ┌─────────────────────┐
       │   │  Microtask Queue │   │    Task Queue        │
       │   │  (Promises)      │   │  (setTimeout etc.)   │
       │   │  HIGH PRIORITY   │   │  LOWER PRIORITY      │
       │   └────────┬─────────┘   └──────────┬──────────┘
       │            │                          │
       │            └────────────┬─────────────┘
       │                         ▼
       │              ┌──────────────────┐
       └◄─────────────│   Event Loop     │
                      │  (monitors both  │
                      │   queues)        │
                      └──────────────────┘
```

---

## 8. Step-by-Step Walkthrough (Promise + setTimeout)

| Step | Action                                                            | Call Stack | Microtask Queue | Task Queue | Output                      |
| ---- | ----------------------------------------------------------------- | ---------- | --------------- | ---------- | --------------------------- |
| 1    | `console.log("Start")` runs                                       | GEC        | —               | —          | Start of Script             |
| 2    | `setTimeout(...)` called → timer registered in Web API (0ms)      | GEC        | —               | —          | —                           |
| 3    | Timer expires instantly → callback queued                         | GEC        | —               | [cb]       | —                           |
| 4    | `Promise.resolve().then(...)` → promise settles → callback queued | GEC        | [promiseCb]     | [cb]       | —                           |
| 5    | `console.log("End")` runs                                         | GEC        | [promiseCb]     | [cb]       | End of Script               |
| 6    | GEC done → Call Stack empty                                       | —          | [promiseCb]     | [cb]       | —                           |
| 7    | Event Loop: Microtask Queue has priority → push `promiseCb`       | promiseCb  | —               | [cb]       | This is from the Promise    |
| 8    | Microtask Queue empty → push `cb` from Task Queue                 | cb         | —               | —          | This is from the Task Queue |
| 9    | All done                                                          | —          | —               | —          | ✅                          |

---

## 9. Starvation

**Starvation** occurs when the **Microtask Queue never becomes empty**, so the **Task Queue never gets a chance to run**.

### Example:

```javascript
Promise.resolve().then(() => {
  Promise.resolve().then(() => {
    Promise.resolve().then(() => {
      // This keeps adding to Microtask Queue indefinitely
    });
  });
});
```

- Each resolved Promise adds another callback to the Microtask Queue.
- The Event Loop keeps draining the Microtask Queue before ever touching the Task Queue.
- Any `setTimeout` callbacks will be **stuck waiting forever**.

> 💡 **Interview Tip:** Starvation = when Microtask Queue is populated repeatedly, preventing the Task Queue from ever executing.

---

## 10. Quick Reference Summary

| Concept             | Description                                                        |
| ------------------- | ------------------------------------------------------------------ |
| **Call Stack**      | Executes JS code; LIFO; waits for nothing                          |
| **Web API**         | Browser-provided features (timers, fetch, DOM events)              |
| **Task Queue**      | Holds callbacks from `setTimeout`, `setInterval`, DOM events; FIFO |
| **Microtask Queue** | Holds Promise callbacks; higher priority than Task Queue           |
| **Event Loop**      | Moves tasks from queues to Call Stack when it's empty              |
| **Starvation**      | Task Queue starves when Microtask Queue is never fully drained     |

---

## 11. Priority Order of Execution

```
1. Synchronous code (Call Stack)
      ↓
2. Microtask Queue (Promises) — runs completely before moving on
      ↓
3. Task Queue (setTimeout, setInterval, DOM events) — one task at a time
      ↓
4. Back to step 2 (check Microtask Queue again after each Task Queue item)
```

---
