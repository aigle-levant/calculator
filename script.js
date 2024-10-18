
//number in screen
let currentScreenNumber = document.querySelector('.screen-text');


//required variables
let firstNum = "";
let secondNum = "";
let operator = null;
let shouldReset = false;


//numbers
let numButton = document.querySelectorAll('.num');
//wrote ya twice by mistake, now rectified
numButton.forEach(element =>
{
element.addEventListener('click', () =>
appendNumberToScreen(element.textContent))
});
function appendNumberToScreen(number)
{
    if (shouldReset)
    {
        currentScreenNumber.textContent = "";
        shouldReset = false;
    }
    currentScreenNumber.textContent += number;
}


//operations
let operatorButton = document.querySelectorAll('.funct');
operatorButton.forEach(element =>
{
element.addEventListener('click', () =>
appendOperatorToScreen(element.textContent))
});
function appendOperatorToScreen(currentlyUsedOperator)
{
    //for percentage
    if (currentlyUsedOperator==='%')
    {
        if (currentScreenNumber.textContent==="") return;

        currentScreenNumber.textContent =
        (parseFloat(currentScreenNumber.textContent)/100)
        .toString();
        firstNum = currentScreenNumber.textContent;
        operator = null;
        return;
    }

    //to prevent divide by zero
    if (currentlyUsedOperator==='÷' &&
    (currentScreenNumber.textContent==='0' || currentScreenNumber.textContent==='0.0'))
    {
        currentScreenNumber.textContent = "Cannot divide by zero";
        shouldReset = true;
        return;
    }

    if (firstNum==="")
    {
        firstNum = currentScreenNumber.textContent;
    }
    else if (operator!==null)
    {
        secondNum = currentScreenNumber.textContent;
        firstNum = parseFloat(firstNum);
        secondNum = parseFloat(secondNum);
        currentScreenNumber.textContent = getResult(firstNum, operator, secondNum)
        .toString();
    }

    operator = currentlyUsedOperator;
    currentScreenNumber.textContent += ` ${operator} `;
    shouldReset = true;
}
function getResult(a, op, b)
{
    switch (op)
    {
        case '+':
            return a+b;
        case '-':
            return a-b;
        case 'x' :
            return a*b;
        case '÷' :
            return a/b;
        case '^' :
            return Math.pow(a,b);
        default :
            return 0;
    }
}


//clear
let resetFull = document.querySelector('.reset-full');
//was figuring out why the button won't work, got the classes corrected
resetFull.addEventListener('click', resetScreen);
function resetScreen()
{
    currentScreenNumber.textContent = "";
    firstNum = "";
    secondNum = "";
    operator = null;
    shouldReset = false;
}


//backspace
let backspace = document.querySelector('.reset-once');
backspace.addEventListener('click', deleteOneChar);
//forgot to invoke toString as function
//fixed it now
function deleteOneChar()
{
    currentScreenNumber.textContent =  currentScreenNumber
    .textContent.toString().slice(0,-1);
}


//decimal
let decimalButton = document.querySelector('.decimal');
decimalButton.addEventListener('click', addDecimalPoint);
function addDecimalPoint()
{
    if (!(currentScreenNumber.textContent.includes('.')))
    {
        currentScreenNumber.textContent += '.';
    }
}


//equals
let equalButton = document.querySelector('.equals');
equalButton.addEventListener('click', displayResult)
function displayResult()
{
    if (firstNum==="" || operator===null) return;

    secondNum = currentScreenNumber.textContent;

    let result = getResult(parseFloat(firstNum), operator, parseFloat(secondNum));
    currentScreenNumber.textContent = `${firstNum} ${operator} ${secondNum} = ${result}`;
    firstNum = result.toString();
    secondNum = "";
    operator = null;
    shouldReset = true;
}
