let displayValue = "";
let userValue1 = "";
let userValue2 = "";
let operator = "";
let clearDisplay = false;
let decimalPressed = false;
let lastClicked;
let keyPressed;
const validKeys = {
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine",
    "0": "zero",
    "+": "add", 
    "-": "subtract", 
    "*": "multiply",
    "/": "divide",
    "=": "equals",
    ".": "decimal",
    "Enter": "equals",
    "Backspace": "clearEntry",
    "Delete": "clearAll",
};

const display = document.querySelector(".screen");

const decimal = document.querySelector("#decimal")
decimal.addEventListener("click", function(event) {
    if (decimalPressed === false) {
        decimalPressed = true;
        displayNum(".");
    }
    event.target.style.backgroundColor = "rgba(255, 149, 0, 0.5)";
    setTimeout(function() {
        event.target.style.backgroundColor = "rgba(255, 149, 0, 1)";
    }, 50);
});

const operations = document.querySelectorAll(".operator");
operations.forEach((item) => item.addEventListener("click", function(event) {
    storeValue(event.target.id);
}));

const equals = document.querySelector("#equals");
equals.addEventListener("click", function(event) {
    event.target.style.backgroundColor = "rgba(255, 149, 0, 0.5)";
    setTimeout(function() {
        event.target.style.backgroundColor = "rgba(255, 149, 0, 1)";
    }, 50);
});

const numericBtns = document.querySelectorAll(".number")
numericBtns.forEach((item) => item.addEventListener("click", function(event) {
    let numId = event.target.id;
    switch (numId) {
        case "one":
            numId = "1";
            break;
        case "two":
            numId = "2";
            break;
        case "three":
            numId = "3";
            break;
        case "four":
            numId = "4";
            break;
        case "five":
            numId = "5";
            break;
        case "six":
            numId = "6";
            break;
        case "seven":
            numId = "7";
            break;
        case "eight":
            numId = "8";
            break;
        case "nine":
            numId = "9";
            break;
        case "zero":
            numId = "0";
            break;
    }
    displayNum(numId);
    event.target.style.backgroundColor = "rgba(80, 80, 80, 0.5)"
    setTimeout(function() {
        event.target.style.backgroundColor = "rgba(80, 80, 80, 1)"
    }, 50);
    
})); 

document.addEventListener("keydown", function(event) {
    keyPressed = event.key;
    if (keyPressed in validKeys) {
        let btnPressed = document.querySelector(`#${validKeys[keyPressed]}`);
        btnPressed.click();
    }
});

const clearAll = document.querySelector("#clearAll");
clearAll.addEventListener("click", function(event) {
    userValue1 = "";
    userValue2 = "";
    operator = "";
    equationComplete = false;
    displayValue = "0";
    display.innerHTML = "0";
    decimalPressed = false;
    event.target.style.backgroundColor = "rgba(239, 239, 239, 0.5)"
    setTimeout(function() {
        event.target.style.backgroundColor = "rgba(239, 239, 239, 1)"
    }, 50);
});

const clearEntry = document.querySelector("#clearEntry");
clearEntry.addEventListener("click", function() {
    if (displayValue != "0") {
        displayValue = displayValue.slice(0, -1);
        if (!displayValue) {
            displayValue = "0";
        }
    }
    display.innerHTML = displayValue; 
});

const buttons = document.querySelectorAll("button");
buttons.forEach((item) => item.addEventListener("click", function(event) {
    if (event.target.classList.contains("holdColor") && lastClicked != event.target) {
        event.target.style.backgroundColor = "white";
        event.target.style.color = "rgba(255, 149, 0, 1)";
    }
    if (lastClicked && lastClicked.classList.contains("holdColor") && lastClicked != event.target) {
        lastClicked.style.backgroundColor = "rgba(255, 149, 0, 1)";
        lastClicked.style.color = "white";
    }
    lastClicked = event.target;
}));

function storeValue(operation) {
    if (operation != "equals") {
        operator = operation;
        if (userValue1 === "") {
            userValue1 = Number(displayValue);
        }
        else if (userValue1 != "" && operator != "") {
            userValue2 = Number(displayValue);
        }
        clearDisplay = true;
        decimalPressed = false;
    }
    else {
        if (userValue1 != "" && operator != "") {
            let solution
            if (lastClicked.classList.contains("number")) {
                userValue2 = Number(displayValue);
            }
            else if (lastClicked.id != "equals") {
                userValue2 = userValue1;
            }
            solution = operate(userValue1, userValue2, operator);
            userValue1 = solution;
            clearDisplay = true;
            decimalPressed = false;
            displayNum("", solution);
        }
    }
}

function displayNum(num, solution = "none") {
    if (clearDisplay) {
        displayValue = "";
        display.innerHTML = "";
        clearDisplay = false;
    }
    solution = solution.toString();
    if (solution === "none") {
        if (displayValue.length < 9) {
            if (displayValue === "0" && num != ".") {
                displayValue = "";
            }
            if (displayValue === "" && num === ".") {
                displayValue = "0";
            }
            displayValue = displayValue + num;
        }
    }
    else if(solution === "error") {
        userValue1 = "";
        userValue2 = "";
        operator = "";
        clearDisplay = true;
        displayValue = "🤨🤯😵😟";  
    }
    else {
        if (solution.includes("\.") === true) {
            let splitNum = solution.split(".")
            let wholeNums = splitNum[0].split("").length + 1;
            let fractionalLength = 9 - wholeNums;
            solution = Math.round(solution * (10 ** fractionalLength)) / (10 ** fractionalLength);
        }
        else if(solution.length > 9) {
            solution = Number(solution).toExponential(2);
        }
        displayValue = solution;
    }
    display.innerHTML = displayValue;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "add":
            return add(num1, num2);
        case "subtract":
            return subtract(num1, num2);
        case "multiply":
            return multiply(num1, num2);
        case "divide":
            if (num2 === 0) {
                return "error";
            }
            return division(num1, num2);
    }
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply (num1, num2) {
    return num1 * num2;
} 

function division (num1, num2) {
    return num1 / num2;
}

displayNum(displayValue);