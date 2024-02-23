const mainContainer = document.createElement("div");
mainContainer.classList.add("main");

const calcContainer = document.createElement("div");
calcContainer.classList.add("calc");
mainContainer.appendChild(calcContainer);

const buttonLabels = [
  ["C", "clear"],
  ["0", "display"],
  [],
  [],
  ["7", "7"],
  ["8", "8"],
  ["9", "9"],
  ["+", "add"],
  ["4", "4"],
  ["5", "5"],
  ["6", "6"],
  ["-", "subtract"],
  ["1", "1"],
  ["2", "2"],
  ["3", "3"],
  ["*", "multiply"],
  ["0", "0"],
  [".", "dot"],
  ["=", "equal"],
  ["/", "divide"],
];
var j = 0;
for (let i = 4; i < buttonLabels.length + 1; i += 4) {
  const row = document.createElement("div");
  row.classList.add("row");
  calcContainer.appendChild(row);
  for (; j < i; j++) {
    if (buttonLabels[j][0]) {
      const button = document.createElement("div");
      button.classList.add("btn");
      button.textContent = buttonLabels[j][0];
      button.id = buttonLabels[j][1];

      row.appendChild(button);
    }
  }
}

document.body.appendChild(mainContainer);

let numbers = [];
let operations = [];
let currentNumber = "0";
let operationMode = false;

function numberPress(num) {
  currentNumber === "0" ? (currentNumber = num) : (currentNumber += num);
  updateDisplay(currentNumber);
  operationMode = true;
}

function operatorPress(op) {
  if (!operationMode) {
    return;
  }

  operations.push(op);
  numbers.push(currentNumber);

  if (op === "equal") {
    currentNumber = calculate();
    updateDisplay(currentNumber);
    reset(currentNumber);
  } else {
    currentNumber = "";
    updateDisplay();
    operationMode = false;
  }
}

function calculate() {
  let total = 0;

  for (let i = 0; i < numbers.length; i++) {
    if (i === 0) {
      total = Number.parseFloat(numbers[i]);
    } else {
      total = operate(total, Number.parseFloat(numbers[i]), operations[i - 1]);
    }
  }

  return `${total}`;
}

function operate(val1, val2, op) {
  switch (op) {
    case "add":
      return val1 + val2;

    case "subtract":
      return val1 - val2;

    case "multiply":
      return val1 * val2;

    case "divide":
      return val1 / val2;

    default:
      return "0";
  }
}

function reset(num = "0") {
  numbers = [];
  operations = [];
  currentNumber = num;
}

function updateDisplay(num = "0") {
  const digitCount = num.length;
  const displayEl = document.getElementById("display");

  if (digitCount >= 11 && digitCount < 15) {
    displayEl.style.fontSize = "20px";
  } else if (digitCount >= 15) {
    displayEl.style.fontSize = "15px";
  } else {
    displayEl.style.fontSize = "28px";
  }

  displayEl.innerText = num;
}

function handleButtonPress(btnId) {
  if (btnId === "dot") {
    currentNumber = currentNumber + ".";
    updateDisplay(currentNumber);
  } else if (btnId === "clear") {
    reset();
    updateDisplay();
  } else if (!isNaN(Number.parseInt(btnId))) {
    numberPress(btnId);
  } else {
    operatorPress(btnId);
  }
}

 const keyMappings = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide",
    "=": "equal",
    ".": "dot",
    Enter: "equal",
    c: "clear",
    C: "clear",
    Backspace: "clear",
    Delete: "clear",
  };
let allowedKeys = Object.keys(keyMappings);

function handleKeyPress(event) {
 
  const key = event.key;
  if (allowedKeys.includes(key)) {
    const buttonId = getKeyMappedButtonId(key);
    if (buttonId) {
      handleButtonPress(buttonId);
    }
  } else {
    alert("only numbers are allowed");
  }
}

function getKeyMappedButtonId(key) {
 
  return keyMappings[key];
}

function init() {
  Array.from(document.getElementsByClassName("btn")).forEach((btn) => {
    btn.addEventListener("click", () => handleButtonPress(btn.id));
  });
  window.addEventListener("keydown", handleKeyPress);
}

window.addEventListener("DOMContentLoaded", init);
