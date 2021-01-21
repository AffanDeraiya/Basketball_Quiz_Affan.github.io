const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progresstext');
const scoretext = document.querySelector('#score');
const progressbarfull = document.querySelector('#progressbar-full');

let currentquestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [{
        question: 'Who Invented Basketball?',
        choice1: 'Michael Jordan',
        choice2: 'Kobe Bryant',
        choice3: 'James Naismith',
        choice4: 'Steph Curry',
        answer: 3,
    },
    {
        question: 'Which Basketball Player Died in 2020?',
        choice1: 'Steph Curry',
        choice2: 'Kobe Bryant',
        choice3: 'Lebron James',
        choice4: 'Michael Jordan',
        answer: 2,
    },
    {
        question: 'What was Michael Jordans jersey number?',
        choice1: '25',
        choice2: '22',
        choice3: '30',
        choice4: '23',
        answer: 4,
    },
    {
        question: 'How many Rings Does Kobe have?',
        choice1: '2',
        choice2: '3',
        choice3: '6',
        choice4: '5',
        answer: 4,
    },
    {
        question: 'The NBA logo contains which player?',
        choice1: 'Michael Jordan',
        choice2: 'Kareem Abdul-Jabbar',
        choice3: 'Jerry West',
        choice4: 'Shaquille O Neal',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()

}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('https://affanderaiya.github.io/Basketball_Quiz_Affan.github.io/endpage.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressbarfull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentquestion = availableQuestions[questionIndex]
    question.innerText = currentquestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentquestion['choice' + number]

    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentquestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)


        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)

    })
})

incrementScore = num => {
    score += num
    scoretext.innerText = score
}

startGame()
