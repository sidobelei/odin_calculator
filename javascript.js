let displayValue = "";
let userValue1 = "";
let userValue2 = "";
let operator = "";
let clearDisplay = false;
let numClick = false;
let equationComplete = false;
let decimalPressed = false;
let lastClicked;

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
})

const operations = document.querySelectorAll(".operator");
operations.forEach((item) => item.addEventListener("click", function(event) {
    storeValue(event.target.id);
}));

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

const equals = document.querySelector("#equals");
equals.addEventListener("click", function(event) {
    event.target.style.backgroundColor = "rgba(255, 149, 0, 0.5)";
    setTimeout(function() {
        event.target.style.backgroundColor = "rgba(255, 149, 0, 1)";
    }, 50);
});


const numericBtns = document.querySelectorAll(".number")
numericBtns.forEach((item) => item.addEventListener("click", function(event){
    let numId = event.target.id.slice(-1);
    displayNum(numId);
    numClick = true;
    event.target.style.backgroundColor = "rgba(80, 80, 80, 0.5)"
    setTimeout(function() {
        event.target.style.backgroundColor = "rgba(80, 80, 80, 1)"
    }, 50);
    
})); 

const clearAll = document.querySelector("#clearAll");
clearAll.addEventListener("click", function(event) {
    num1 = "";
    num2 = "";
    operator = "";
    equationComplete = false;
    displayValue = "";
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
            displayValue = "0"
        }
        console.log(displayValue);
    }
    display.innerHTML = displayValue; 
});

displayNum(displayValue);

function storeValue(operation) {
    if (operation != "equals") {
        operator = operation;
        userValue1 = Number(displayValue);
        clearDisplay = true;
        equationComplete = true;
        decimalPressed = false;
    }
    else {
        if (equationComplete) {
            if (numClick === true) {
                userValue2 = Number(displayValue);
                decimalPressed = false;
            }
            if (userValue2 === 0 && operator === "divide") {
                clearDisplay = true;
                num1 = "";
                num2 = "";
                operator = "";
                equationComplete = false;
                display.innerHTML = "🤨🤯😵😟";
                decimalPressed = false;
            }
            else {
                let product = operate(userValue1, userValue2, operator)
                userValue1 = product;
                clearDisplay = true;
                product = product.toString();
                displayNum(product);
                numClick = false;
                decimalPressed = false;
            }
        }
    }
}

function displayNum(num) {
    if (clearDisplay) {
        displayValue = "";
        clearDisplay = false;
    }
    if (display.textContent === "0" && num === ".") {
        displayValue = "0";
    }
    if (equationComplete || displayValue === "0") {
        displayValue = "";
    }
    displayValue = displayValue + num;
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
    let quotient = num1 / num2;
    let splitNum = quotient.toString().split(".")
    let wholeNum = splitNum[0].split("").length + 1;
    let numLength = 9 - wholeNum;
    quotient = Math.round(quotient * (10 ** numLength)) / (10 ** numLength);
    return quotient;
}