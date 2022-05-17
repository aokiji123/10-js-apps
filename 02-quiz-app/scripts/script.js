import { quizData } from "./data.js"

const data = quizData;

const result = document.getElementById('result')
const answersEl = document.querySelectorAll('.answer')
const questionTitle = document.getElementById('question');
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')

const submitBtn = document.getElementById('submit')

let currentQuestion = 0
let score = 0

loadQuiz()

function loadQuiz() {
    deselectAnswer()
    const currentQuestionData = data[currentQuestion]

    questionTitle.innerText = currentQuestionData.question
    a_text.innerText = currentQuestionData.a
    b_text.innerText = currentQuestionData.b
    c_text.innerText = currentQuestionData.c
    d_text.innerText = currentQuestionData.d
}

function getSelected() {
    let answer = undefined

    answersEl.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

function deselectAnswer() {
    answersEl.forEach(answerEl => {
        answerEl.checked = false
    })
}

submitBtn.addEventListener("click", () => {
    // check to see the answer
    const answer = getSelected()

    if (answer) {
        if (answer === data[currentQuestion].correct) {
            score++
        }
        currentQuestion++
        if (currentQuestion < data.length) {
            loadQuiz()
        } else {
            result.innerHTML = `
                <h2>You have ${score}/${data.length} correct answers</h2>
                <button class="question__button" onclick="location.reload()">Reload</button>
            `
        }
    }  
})  