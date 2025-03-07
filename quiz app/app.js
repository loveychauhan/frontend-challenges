const quizes = [
    { 'Inside which HTML element do we put the JavaScript?': ['<script>', '<js>', '<javascript>', '<scripting>'] },
    { 'What does HTML stand for?': ['HydroText MixUp Language.', 'HyperText Markup Language.', 'HyperText Markup Literature.', 'HydroText Markup Language.'] },
    { 'How do you create a hyperlink in HTML?': ['<link> tag', '<c> tag', '<a> tag', '<t> tag'] },
    { 'What property is used to set the font size in CSS? Answer': ['text-size', 'text-decoration', 'font-large', 'font-size'] },
    { 'How do you center a block element horizontally in CSS?': ['margin: 0 0', 'margin: 50% 50%', 'margin: 0 auto', 'padding: 0 auto.'] },
    { 'What property is used to change the background color in CSS? ': ['box-color', 'background-set-color', 'background-color', 'background-colorize'] },
    { ' What method is used to add an event listener in JavaScript? ': ['addEventListening', 'EventListener()', 'EventManager', 'addEventListener()'] },
    { ' What keyword is used to define a function in JavaScript? ': ['addEventListener', 'function', 'methoding', 'JSON'] },
    { 'What method is used to parse a JSON string in JavaScript?': ['parse(JSON)', 'JSON.parse()', 'JSON.parse', 'stringify.JSON'] },
    { 'What keyword is used to create a constant in JavaScript? ': ['var', 'const', 'let', 'constant'] },
    { 'What is the abbreviation for Cascading Style Sheets? ': ['CSS', 'CCS', 'CCSS', 'CASS'] },
    { 'What is the output of the following JavaScript snippet? console.log(typeof(42));': ['number', 'int', 'integer', 'float'] },
    { 'What is the output of the following JavaScript snippet? console.log("Hello".toUpperCase());': ['HELO', 'Hello', 'HELLO', 'HELP'] },
    { ' What is the output of the following JavaScript snippet? \n let arr = [1, 2, 3]; \n console.log(arr.length);': ['3', '6', '1', '6'] },
    { 'What is the output of the following JavaScript snippet? \n let x = 5; \n let y = "5"; \n console.log(x == y);': ['TRUE', 'true', '1', 'True'] },
    { 'What method is used to join all elements of an array into a string in JavaScript?': ['JOIN()', 'join()', 'elementAdd', 'joinItems'] },
    { 'What method is used to remove the last item from an array in JavaScript?': ['takeout', 'pop', 'popout', 'enter'] },
    { 'What keyword is used to define a non-constant in JavaScript? ': ['int', 'const', 'let', 'constant'] },
    { ' What method is used to reverse the order of the elements in an array in JavaScript?': ['reverse', 'inner', 'opposite', 'ascending'] },
    { 'What method is used to execute a function for each element in an array in JavaScript?': ['for of', 'for in', 'for', 'forEach'] },
    { ' What method is used to create a new array with all elements that pass a test in JavaScript?': ['map()', 'filter()', 'reduce()', 'if()'] },
    { 'What method is used to add one or more elements to the beginning of an array in JavaScript?': ['unshift', 'unshiftunshift', 'shift', 'shiftItem'] },
    { ' What method is used to remove the first item from an array in JavaScript?': ['unshift', 'unshiftunshift', 'shift', 'shiftItem'] },
    { 'What keyword is used to exit a function and return a value in JavaScript?': ['return', 'console.log()', 'alert()', 'prompt()'] },
    { ' What method is used to convert a JavaScript object into a JSON string? ': ['parse(JSON)', 'JSON.parse()', 'JSON.parse', 'stringify'] }

]
const correctAnswer = ['<script>', 'HyperText Markup Language.', '<a> tag', 'font-size', 'margin: 0 auto', 'background-color', 'addEventListener()', 'function', 'JSON.parse()', 'const', 'CSS', 'number', 'HELLO', '3', 'true', 'join()', 'pop', 'let', 'reverse', 'forEach', 'filter()', 'unshift', 'shift', 'return', 'stringify'];

const quote = ['Well done you got all right...', 'Great attempt you almost did it...', 'You got it half right, with more practise you can do much better...', 'You need more practise, let do this again...']

const startBtn = document.querySelector('.start-btn');
const imageContainer = document.querySelector('.image-container');
const main = document.querySelector('main');
const totalQuestion = document.querySelector('.total')
const options = document.querySelectorAll('.answer-container p');
const answers = document.querySelector('.answer-container');
let question = document.querySelector('.question');
const nextButton = document.querySelector('.next-button');
const current = document.querySelector('.current');
const mainContainer = document.querySelector('.main-container');
const quizContainer = document.querySelector('.quiz-container');
const timerElement = document.querySelector('.countdown span');
const wronganswer = document.querySelector('.wronganswer');
const rightanswer = document.querySelector('.rightanswer');
const hero = document.querySelector('.hero')
const quizSection = document.querySelector('.quiz-section');
const resultSection = document.querySelector('.result-container');
const retry = document.querySelector('.retry');
const quoteText = document.querySelector('.quote');
const soundOff = document.querySelector('.sound-logo')


startBtn.addEventListener('click', () => {
    hero.classList.add('start-clicked');
    quizSection.classList.remove('start-clicked');
    nextpage()

})


const storage = JSON.parse(localStorage.getItem(quizes.length));
let rightAnswerCount = 0;
let timeInterval;
let audio = true;
let i = 0;


i = localStorage.getItem('quiz')
if(i === null) i = 0;

rightAnswerCount = localStorage.getItem('rightAnswer');
if(rightAnswerCount === null) rightAnswerCounti = 0;

totalQuestion.innerText = quizes.length;
nextButton.firstElementChild.innerText = 'Next'

soundOff.addEventListener('click', () => {
    soundOff.classList.toggle('sound-switch');
    audio = !audio

})

function nextpage() {
    let questionKey = Object.keys(quizes[i]); // all question 
    question.innerText = questionKey; //added to question box
    let answerList = Object.values(quizes[i])[0];
    let count = 0;
    options.forEach((option) => {
        if (count < 4) {
            option.innerText = answerList[count]; // answer added to answer box
            count++;
            option.classList.remove('answer-right', 'answer-wrong'); // to remove any class on next page;
        }

    });

    localStorage.setItem('quiz', i)

    i = localStorage.getItem('quiz')
    showQuiz(i++)
}


function showQuiz(i) {
    if (i < (quizes.length)) {
        answers.classList.remove('hold'); //remove pointer event none when timer starts;
        timer();  // calling timer function for timer element;
        current.innerText = i + 1; // quiz number count
    }

    else if (i === quizes.length) {
        answers.classList.add('hold'); //none pointer event when timer stops;
    }
}



function timer() {
    quizContainer.classList.remove('mid-time', 'end-time')
    timerElement.classList.remove('mid-time', 'end-time')
    let countdown = 30;
    timerElement.textContent = countdown;
    clearInterval(timeInterval);
    timeInterval = setInterval(() => {
        countdown--;
        timerElement.textContent = countdown;
        if (countdown === 0) {
            clearInterval(timeInterval);
            nextpage()
        }
        else if (countdown <= 15 && countdown > 5) {
            quizContainer.classList.add('mid-time')
            timerElement.classList.add('mid-time')

        }
        else if (countdown <= 5) {
            quizContainer.classList.add('end-time')
            timerElement.classList.add('end-time')
        }
    }, 1000)

}

//check correct answer
answers.addEventListener('click', (e) => {
    options.forEach((option) => {
        option.classList.remove('answer-right', 'answer-wrong')
    });

    let answerOfThisquiz = correctAnswer[i - 1];
    if (e.target === answers);
    else if (e.target.innerText == answerOfThisquiz) {
        e.target.classList.add('answer-right')
        if (audio) rightanswer.play()
        rightAnswerCount++;
        localStorage.setItem('rightAnswer', rightAnswerCount)
        answers.classList.add('hold');
    }

    else {
        e.target.classList.add('answer-wrong')
        if (audio) wronganswer.play();
        options.forEach((answer) => {
            if (answer.innerText === answerOfThisquiz) {
                answer.classList.add('answer-right')
            }
        })
        answers.classList.add('hold');
    }
    clearInterval(timeInterval)
})

// result bar
function showResult() {
    const correctAnswerBar = document.querySelector('.correct')
    const WrongAnswerBar = document.querySelector('.wrong');
    const resultScore = document.querySelector('.result-score')
    correctAnswerBar.style.width = `${rightAnswerCount / quizes.length * 100}%`
    WrongAnswerBar.style.width = `${100 - (rightAnswerCount / quizes.length * 100)}%`
    // correctAnswerBar.innerText = `${(rightAnswerCount / quizes.length * 100).toFixed()}%` % not looking good with design
    // WrongAnswerBar.innerText = `${100 - (rightAnswerCount / quizes.length * 100).toFixed()}%`; % not looking good with design
    resultScore.innerText = `${rightAnswerCount}/${quizes.length} `;
    let correctPercent = rightAnswerCount / quizes.length * 100;
    if (correctPercent === 100) {
        quoteText.innerText = quote[0];
        // WrongAnswerBar.innerText = ``;  %  not looking good with design
    } else if (correctPercent > 80) {
        quoteText.innerText = quote[1];
    } else if (correctPercent >= 50) {
        quoteText.innerText = quote[2];
    }
    else if (correctPercent === 0) {
        // correctAnswerBar.innerText = ``; %  not looking good with design
        quoteText.innerText = quote[3];
    }
    else {
        quoteText.innerText = quote[3];
    }
}



nextButton.addEventListener('click', () => {
    if (i === quizes.length) {
        nextButton.firstElementChild.innerText = `Result`;
        quizSection.classList.add('start-clicked');
        resultSection.classList.remove('start-clicked');
        showResult();

    }
    else {
        clearInterval(timeInterval);
        nextpage();
    }

});

retry.addEventListener('click', () => {
    quizSection.classList.add('start-clicked');
    resultSection.classList.add('start-clicked');
    hero.classList.remove('start-clicked');
    nextButton.firstElementChild.innerText = `Next`;
    i = 0;
    rightAnswerCount = 0
    clearInterval(timeInterval);
    localStorage.clear()
})