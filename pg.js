const inputSlider = document.querySelector("#myRange")
const lengthDisplay = document.querySelector('.password-length')
const indicator = document.querySelector('.strength-icon')
const passwordDisplay = document.querySelector('#password-display')
const copyButton = document.querySelector('.copy-btn')
const checkboxes = document.querySelectorAll('input[type="checkbox"]')
const uppercaseCheck = document.querySelector("#include-uppercase");
const lowercaseCheck = document.querySelector("#include-lowercase");
const numbersCheck = document.querySelector("#include-number");
const symbolsCheck = document.querySelector("#include-symbol");
const generateButton = document.querySelector(".generatepassword")

let password = ''
let passwordLength = 10;
let checkCount = 0

function handleSlider() {
    inputSlider.value = passwordLength
    lengthDisplay.innerText = passwordLength
}

handleSlider()

function setIndicator(color) {
    indicator.style.backgroundColor = color
}

function getRndInteger(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min)
}

function generateNumber() {
    return (getRndInteger(0, 9))
}

function generateUpperCase() {
    return (String.fromCharCode((getRndInteger(65, 90))))
}

function generateLowerCase() {
    return (String.fromCharCode((getRndInteger(97, 122))))
}

function generateSymbol() {
    const symbols = '!@#$%^&*(){}[];:_+-|=<>/,.'
    return symbols[getRndInteger(0, symbols.length)]
}

const calStrength = (password) => {
    let hasUpper = false
    let hasLower = false
    let hasSymbol = false
    let hasNumber = false

    for (let i = 0; i < password.length; i++) {
        if (password[i] >= 'A' && password[i] <= 'Z') {
            hasUpper = true
        } else if (password[i] >= 'a' && password[i] <= 'z') {
            hasLower = true
        } else if (password[i] >= '0' && password[i] <= '9') {
            hasNumber = true
        } else {
            hasSymbol = true
        }
    }

    if (hasUpper && hasLower && (hasSymbol || hasNumber) && password.length > 8) {
        setIndicator('#0f0')
    } else if ((hasUpper && hasLower) || (hasNumber && hasSymbol) && password.length > 6) {
        setIndicator('#ff0')
    } else {
        setIndicator('#f00')
    }
}

function copyContent() {
    navigator.clipboard.writeText(passwordDisplay.value);
    alert("copied")
}

copyButton.addEventListener('click', copyContent)

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value
    lengthDisplay.innerText = passwordLength
})

function handleCheckBoxes(input) {
    checkCount = 0
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkCount++
        }
    }
}

generateButton.addEventListener('click', (e) => {
    if (checkCount == 0)
        return;
    let password = ''
    let func_array = []

    if (uppercaseCheck.checked) {
        func_array.push(generateUpperCase)
        password += generateUpperCase()
    }
    if (lowercaseCheck.checked) {
        func_array.push(generateLowerCase)
        password += generateLowerCase()
    }
    if (numbersCheck.checked) {
        func_array.push(generateNumber)
        password += generateNumber()
    }
    if (symbolsCheck.checked) {
        func_array.push(generateSymbol)
        password += generateSymbol()
    }

    for (let i = 0; i < passwordLength - checkCount; i++) {
        let randomIndex = getRndInteger(0, checkCount)
        password += func_array[randomIndex]()
    }
    passwordDisplay.value = password

    calStrength(password)
})
