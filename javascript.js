let displayValue = "";
let num1;
let num2;
let operator;

const numericBtns = document.querySelectorAll(".number")
numericBtns.forEach((item) => item.addEventListener("click", function(event){
    display(event.target.id);
})) 

function display(num) {
    const display = document.querySelector(".screen");
    displayValue = displayValue + num;
    display.innerHTML = displayValue;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "add":
            add(num1, num2);
            break;
        case "subtract":
            subtract(num1, num2);
            break;
        case "multiply":
            multiply(num1, num2);
            break;
        case "divide":
            division(num1, num2);
            break;
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