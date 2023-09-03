const switchTheme = document.querySelector("#switch")

switchTheme.addEventListener("click", () => {
    document.body.classList.toggle("light-mode")
})


const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.signs, .basic-signs, .top-signs');
buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
});

function clear() {
    currentInput = '0';
    previousInput = "0";
    currentOperator = '';
}

function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}
function appendInput(value) {
    // If the current input is '0', replace it with the new value, otherwise append to it.
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
}
function deleteLast() {
    // Check if the current input is not empty
    if (currentInput.length > 0) {
      // Remove the last character from the current input
      currentInput = currentInput.slice(0, -1);
      
      // If the current input becomes empty, set it to '0'
      if (currentInput === '') {
        currentInput = '0';
      }
    }
  }
  

function isOperator(value) {
    return value === '+' || value === '-' || value === '*' || value === '/';
}
function toggleSign() {
    if (currentInput !== '0') {
      currentInput = (-parseFloat(currentInput)).toString();
    }
  }

  function percentage() {
    if (currentInput !== '0') {
      currentInput = (parseFloat(currentInput) / 100).toString();
    }
  }
  

function calculate() {
    // Convert input values to numbers
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
  
    // Perform the calculation based on the current operator
    switch (currentOperator) {
      case '+':
        currentInput = (num1 + num2).toString();
        break;
      case '-':
        currentInput = (num1 - num2).toString();
        break;
      case '*':
        currentInput = (num1 * num2).toString();
        break;
      case '/':
        if (num2 !== 0) {
          currentInput = (num1 / num2).toString();
        } else {
          currentInput = 'Error';
        }
        break;
    }
  
    // Reset the previous input and operator
    previousInput = '';
    currentOperator = '';
  }

function setOperator(operator) {
    // If a previous operator exists, perform the previous calculation
    if (currentOperator && previousInput !== '') {
      calculate();
    }
  
    // Update the current operator
    currentOperator = operator;
  
    // Store the current input as the previous input
    previousInput = currentInput;
  
    // Reset the current input to '0'
    currentInput = '0';
  }


function handleButtonClick(event) {
    const buttonValue = event.target.innerText;

    switch (buttonValue) {
        case 'C':
            clear();
            break;
        case '+/-':
            toggleSign();
            break;
        case '%':
            percentage();
            break;
        case '=':
            calculate();
            break;
        case 'DEL':
            deleteLast();
            break;
        default:
            if (isNumeric(buttonValue) || buttonValue === '.') {
                appendInput(buttonValue);
            } else if (isOperator(buttonValue)) {
                setOperator(buttonValue);
            }
            break;
    }

    updateDisplay();
}

function updateDisplay() {
    display.innerText = currentInput;
}
window.onload = () => {
    clear();
    updateDisplay();
};
