const passwordEl = document.getElementById('password')
const copyEl = document.getElementById('copy')
const lengthEl = document.getElementById('length')
const upperEl = document.getElementById('upper')
const lowerEl= document.getElementById('lower')
const numberEl = document.getElementById('number')
const symbolEl = document.getElementById('symbol')
const generatorEl = document.getElementById('generator')

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz'
const numbers = '0123456789'
const symbols = '!@#$%^&*()_+='

function getUpperCase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)]
}

function getLowerCase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)]
}

function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)]
}

function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)]
}

function generatePassword() {
    const len = lengthEl.value

    let password = ''

    if (upperEl.checked) {
        password += getUpperCase()
    }

    if (lowerEl.checked) {
        password += getLowerCase()
    }

    if (numberEl.checked) {
        password += getNumber()
    }

    if (symbolEl.checked) {
        password += getSymbol()
    }

    if (password.length === 0) return ''

    for (let i = password.length; i < len; i++) {
        const x = generateX()
        password += x
    }
    
    passwordEl.innerText = password
}

function generateX() {
    const xs = []

    if (upperEl.checked) {
        xs.push(getUpperCase());
    }

    if (lowerEl.checked) {
        xs.push(getLowerCase());
    }

    if (numberEl.checked) {
        xs.push(getNumber());
    }

    if (symbolEl.checked) {
        xs.push(getSymbol());
    }

    if (xs.length === 0) return "";

    return xs[Math.floor(Math.random() * xs.length)]
}

generatorEl.addEventListener('click', generatePassword);

copyEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = passwordEl.innerText

    if (!password) { return }

    textarea.value = password;
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()

    alert('Password copied successfully')
})