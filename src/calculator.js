// Function to add
function add(a, b) {
    return a + b;
}

// Function to subtract
function subtract(a, b) {
    return a - b;
}

// Function to multiply
function multiply(a, b) {
    return a * b;
}

// Function to divide
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

// Export the functions
module.exports = { add, subtract, multiply, divide };
