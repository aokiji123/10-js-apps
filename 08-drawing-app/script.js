const canvas = document.getElementById('canvas')
const increaseBtn = document.getElementById('increase')
const decreaseBtn = document.getElementById('decrease')
const clearBtn = document.getElementById('clear')
const sizeEl = document.getElementById('size')
const colorEl = document.getElementById('color')
const ctx = canvas.getContext('2d')

let size = 20
isPressed = false
let color = 'black'
let x = undefined
let y = undefined

canvas.addEventListener('mousedown', (event) => {
    isPressed = true

    x = event.offsetX
    y = event.offsetY

})

canvas.addEventListener('mouseup', () => {
    isPressed = false

    x = undefined
    y = undefined
})

canvas.addEventListener('mousemove', (event) => {
    if (isPressed) {
        const x2 = event.offsetX
        const y2 = event.offsetY
        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)
        x = x2
        y = y2
    }  
})

function drawCircle(x, y) {
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size
    ctx.stroke()
}

increaseBtn.addEventListener('click', () => {
    size += 5

    if (size > 50) {
        size = 50
    }

    updateSize()
})

decreaseBtn.addEventListener('click', () => {
    size -= 5

    if (size < 5) {
        size = 5
    }

    updateSize()
})

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width)
})

colorEl.addEventListener('change', (event) => {
    color = event.target.value
})

function updateSize() {
    sizeEl.innerText = size
}