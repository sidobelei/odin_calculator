let displayValue = "";
let userValue1;
let userValue2;
let operator;

const display = document.querySelector(".screen");

const numericBtns = document.querySelectorAll(".number")
numericBtns.forEach((item) => item.addEventListener("click", function(event){
    displayNum(event.target.id);
})); 

const clear = document.querySelector("#clear");
clear.addEventListener("click", function () {
    num1 = "";
    num2 = "";
    operator = "";
    displayValue = "";
    display.innerHTML = "";
});

displayNum(displayValue);

function displayNum(num) {
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
    return num1 / num2;
}