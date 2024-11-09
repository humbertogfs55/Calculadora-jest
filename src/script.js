// Select elements
const resultDisplay = document.querySelector('.result');
const buttons = document.querySelectorAll('button');

// Initialize calculator state variables
let currentNumber = '';
let firstOperand = null;
let operator = null;

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (isNumber(value)) {
            currentNumber += value;
            updateDisplay(currentNumber);
        } else if (isOperator(value)) {
            firstOperand = currentNumber;
            operator = value;
            currentNumber = '';
        } else if (value === '=') {
            const result = calculate(firstOperand, operator, currentNumber);
            updateDisplay(result);
            currentNumber = result;
        } else if (value === 'C') {
            resetCalculator();
        }
    });
});

// Update the display
function updateDisplay(value) {
    resultDisplay.textContent = value;
}

// Reset calculator
function resetCalculator() {
    currentNumber = '';
    firstOperand = null;
    operator = null;
    updateDisplay('0');
}

// Check if value is a number
function isNumber(value) {
    return !isNaN(value);
}

// Check if value is an operator
function isOperator(value) {
    return ['+', '-', '*', '/'].includes(value);
}

// Perform the calculation using the functions from calculator.js (exposed via preload.js)
function calculate(operand1, operator, operand2) {
    // Access the calculator functions via the electron object exposed by preload.js
    const { add, subtract, multiply, divide } = window.electron.calculator;

    switch (operator) {
        case '+':
            return add(Number(operand1), Number(operand2));
        case '-':
            return subtract(Number(operand1), Number(operand2));
        case '*':
            return multiply(Number(operand1), Number(operand2));
        case '/':
            return divide(Number(operand1), Number(operand2));
        default:
            return 'Error';
    }
}
