const display = document.querySelector("#display");
let operandOne = "";
let operator = "";
let operandTwo = "";

const calculatorBtns = {};
const buttons = document.querySelectorAll("button")
buttons.forEach(button => {
    button.addEventListener("click", handleClick)
})

function handleClick(e) {
    if (e.target.id == "clear") clear();
    if (e.target.id == "delete") del();
    if (e.target.id == "dot") dot();
    if (e.target.className == "operand") setOperand(e.target.textContent);
    if (e.target.className == "operator") setOperator(e.target.textContent);
    if (e.target.id == "equals") operate();
}

function clear() {
    operandOne = "";
    operator = "";
    operandTwo = "";
    display.textContent = "";
}

function del() {
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
    if (!operandOne && !operator || operandOne && !operator) {
        operandOne = operandOne.slice(0, operandOne.length - 1);
    } else {
        operandTwo = operandTwo.slice(0, operandTwo.length - 1);
    }
}

function operate() {
    if (operandOne && operator && operandTwo) {
        operandOne = Number(operandOne);
        operandTwo = Number(operandTwo);
        let result;
        if (operator == "+") result = round(operandOne + operandTwo);
        if (operator == "-") result = round(operandOne - operandTwo);
        if (operator == "x") result = round(operandOne * operandTwo);
        if (operator == "/") result = round(operandOne / operandTwo);
        display.textContent = result.toString();
        if (result.toString() != "Infinity") operandOne = result.toString(); else operandOne = "0";
        operator = "";
        operandTwo = "";        
    }
}

function dot() {
    if (!display.textContent.includes(".")) display.textContent += ".";
    if (!operandOne && !operator || operandOne && !operator) {
        operandOne += ".";
    } else {
        operandTwo += ".";
    }
}

function setOperand(value) {
    if (display.textContent.length < 16) {
        display.textContent += value;
        if (!operandOne && !operator || operandOne && !operator) {
            operandOne += value;
        } else {
            operandTwo += value;
        }
    } 
}

function setOperator(value) {
    if (operandOne && operator && operandTwo) operate();
    operator = value;
    display.textContent = "";
}

function round(number) {
    if (number % 1 == 0 && number.toString().length > 16) {
        return number.toExponential(2);
    } else if (number % 1 != 0) {
        return Math.round(number * 1000) / 1000;
    }
    return number;
}