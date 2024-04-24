let displayValue = "";
let userValue1 = "";
let userValue2 = "";
let operator = "";
let clearDisplay = false;
let numClick = false;
let equationComplete = false;
let decimalPressed = false;

const display = document.querySelector(".screen");

const decimal = document.querySelector("#decimal")
decimal.addEventListener("click", function() {
    if (decimalPressed === false) {
        decimalPressed = true;
        displayNum(".");
    }
})

const operations = document.querySelectorAll(".operator");
operations.forEach((item) => item.addEventListener("click", function(event) {
    storeValue(event.target.id);
}));

const numericBtns = document.querySelectorAll(".number")
numericBtns.forEach((item) => item.addEventListener("click", function(event){
    let numId = event.target.id.slice(-1);
    displayNum(numId);
    numClick = true;
})); 

const clear = document.querySelector("#clear");
clear.addEventListener("click", function () {
    num1 = "";
    num2 = "";
    operator = "";
    equationComplete = false;
    displayValue = "";
    display.innerHTML = "0";
    decimalPressed = false;
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
    if (equationComplete) {
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