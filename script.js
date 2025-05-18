const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')

const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    quizScore = 0;
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct;

    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "restart";
        startButton.classList.remove("hide");
    }
    if (selectedButton.dataset.correct === "true") {
    quizScore++;
    }

    document.getElementById('right-answers').innerText = quizScore
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct === "true") {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
const questions = [
    {
        question: 'which one of these is a Javascript framework?',
        answers: [
            { text: 'Python', correct: false },
            { text: 'Django', correct: false },
            { text: 'React', correct: true },
            { text: 'Eclipse', correct: false } 
        ]
    },
    {
        question: 'What does typeof null return?',
        answers: [
            { text: 'Null', correct: false },
            { text: 'Object', correct: true },
            { text: 'Undefined', correct: false },
            { text: 'Number', correct: false } 
        ]
    },
    {
        question: 'What will console.log(2 + "2") output?',
        answers: [
            { text: '4', correct: false },
            { text: 'NaN', correct: false },
            { text: '22', correct: true },
            { text: 'Error', correct: false } 
        ]
    },
    {
        question: 'How do you create an arrow function in JavaScript?',
        answers: [
            { text: '() => {}', correct: true },
            { text: 'function() => {}', correct: false },
            { text: '=> function {}', correct: false },
            { text: 'function => {}', correct: false } 
        ]
    },
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hyper Text Markup Language', correct: true },
            { text: 'High Text Machine Learning', correct: false },
            { text: 'Hyperlink Transfer Markup Language', correct: false },
            { text: 'Home Tool Markup Language', correct: false } 
        ]
    },
    {
        question: 'Which attribute is used to specify that an input field is required?',
        answers: [
            { text: 'validate', correct: false },
            { text: 'mandatory', correct: false },
            { text: 'needed', correct: false },
            { text: 'required', correct: true } 
        ]
    },
    {
        question: 'What is the difference between <section> and <div>?',
        answers: [
            { text: '<section> has semantic meaning, <div> does not', correct: true },
            { text: '<div> is more powerful than <section>', correct: false },
            { text: '<section> is a block-level element, while <div> is inline', correct: false },
            { text: 'There is no difference', correct: false } 
        ]
    },
    {
        question: 'What is the correct syntax to apply a CSS class to an element?',
        answers: [
            { text: '#classname {}', correct: false },
            { text: '.classname {}', correct: false },
            { text: 'classname {}', correct: false },
            { text: '.classname {}', correct: true } 
        ]
    },
    {
        question: 'What is the default position value of an HTML element?',
        answers: [
            { text: 'absolute', correct: false },
            { text: 'relative', correct: false },
            { text: 'static', correct: true },
            { text: 'fixed', correct: false } 
        ]
    },
    {
        question: 'What does z-index do in CSS?',
        answers: [
            { text: 'Changes the text size', correct: false },
            { text: 'Adds a shadow effect', correct: false },
            { text: 'Sets the transparency level', correct: false },
            { text: 'Controls the stacking order of elements', correct: true } 
        ]
    }
]