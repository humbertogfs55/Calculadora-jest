
// Import calculator functions
const { add, subtract, multiply, divide } = require('./calculator');

// Select elements
const resultDisplay = document.querySelector('.result');
const buttons = document.querySelectorAll('button');

// Initialize calculator state variables
let currentNumber = '';
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false; // Track when to reset display after an operation

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (isNumber(value)) {
            if (shouldResetDisplay) {
                currentNumber = '';  // Clear display after an operation
                shouldResetDisplay = false;
            }
            currentNumber += value;
            updateDisplay(currentNumber);
        } else if (isOperator(value)) {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentNumber);
            } else if (operator) {
                firstOperand = calculate(firstOperand, operator, parseFloat(currentNumber));
                updateDisplay(firstOperand);
            }
            operator = value;
            shouldResetDisplay = true;
        } else if (value === '=') {
            if (operator && firstOperand !== null) {
                currentNumber = calculate(firstOperand, operator, parseFloat(currentNumber));
                updateDisplay(currentNumber);
                firstOperand = parseFloat(currentNumber);
                operator = null;
            }
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

// Perform the calculation
function calculate(operand1, operator, operand2) {
    switch (operator) {
        case '+':
            return add(operand1, operand2);
        case '-':
            return subtract(operand1, operand2);
        case '*':
            return multiply(operand1, operand2);
        case '/':
            try {
                return divide(operand1, operand2);
            } catch (error) {
                updateDisplay("Error");
                return "Cannot divide by zero";
            }
        default:
            return operand2;
    }
}
