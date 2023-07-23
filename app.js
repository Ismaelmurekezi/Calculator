const numberBtn = document.querySelectorAll(".btn");
const equalBtn = document.querySelector("#equal");
const minusBtn = document.querySelector("#minus");
const addBtn = document.querySelector("#plus");
const operatorBtn = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const screen = document.querySelector("#span");

let currentNumber = "";
let expression = [];
screen.innerText=0;

// Function to update the display with the current expression
const updateDisplay = () => {
    screen.innerText = expression.join(" ") + " " + currentNumber;
};

// Function to perform the actual calculation based on operator
const calculate = (num1, operator, num2) => {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        default:
            return 0;
    }
};

// Looping through number buttons
numberBtn.forEach(button => button.addEventListener("click", function (e) {
    const num = e.target.textContent;

    currentNumber += num;
    if (currentNumber.length > 8) {
        currentNumber = currentNumber.slice(0, 8);
    }
    updateDisplay();
}));

// Adding Event listener to operator buttons
operatorBtn.forEach(operator => operator.addEventListener("click", (e) => {
    const operator = e.target.textContent;
    if (currentNumber !== "") {
        expression.push(currentNumber);
        expression.push(operator);
        currentNumber = "";
        updateDisplay();
    }
}));

// Function to perform calculator operations
const operate = () => {
    if (currentNumber !== "") {
        expression.push(currentNumber);
        currentNumber = "";
    }

    // Handling multiplication and division first
    for (let i = 1; i < expression.length; i += 2) {
        const operator = expression[i];
        if (operator === "*" || operator === "/") {
            const num1 = expression[i - 1];
            const num2 = expression[i + 1];
            const result = calculate(num1, operator, num2);
            expression.splice(i - 1, 3, result);
            i -= 2;
        }
    }

    // Handling addition and subtraction next
    let result = parseFloat(expression[0]);
    for (let i = 1; i < expression.length; i += 2) {
        const operator = expression[i];
        const nextNumber = parseFloat(expression[i + 1]);
        if (operator === "+") {
            result += nextNumber;
        } else if (operator === "-") {
            result -= nextNumber;
        }
    }

    // Convert result to a string with a maximum of 9 digits
    result = result.toString();
    if (result.length > 9) {
        result = parseFloat(result).toPrecision(9);
    }

    // Update the display with the final result
    if(isNaN(result) || !isFinite(result)){

        result="Error!"
        screen.innerText = result;
    } else{

        screen.innerText = result;
    }
    

    // Reset the expression and currentNumber for future calculations
    expression = [];
    currentNumber = result;
};

// Handle result functionality
equalBtn.addEventListener("click", operate);

clearBtn.addEventListener("click", () => {
    currentNumber = "";
    expression = [];
    updateDisplay();
    screen.innerText="0";
});

deleteBtn.addEventListener("click", () => {
    currentNumber = currentNumber.slice(0, -1);
    updateDisplay();
    if(currentNumber===""){
        screen.innerText="0";
        expression=[];
    }
  
    
    
   
});
