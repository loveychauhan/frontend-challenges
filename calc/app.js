const buttons = document.querySelector('.calc-keys');
const mainDisplay = document.querySelector('.main-display');
const sideDisplay = document.querySelector('.side-display')

let sum = 0;
let subtract = 0;
let mul = 1;
let div;

let numForAdd = [];
let symbol = ''
mainDisplay.innerText = 0;
sideDisplay.innerText = 0;

buttons.addEventListener('click', (e) => {
    e.stopPropagation()
    let userInput = e.target.innerText;
    if (e.target !== buttons) {
        if (parseFloat(userInput) || userInput === '0') {
            if (mainDisplay.innerText.includes('.'));
            else if (mainDisplay.innerText[0] === '0') {
                mainDisplay.innerText = ''
            }
            mainDisplay.innerText += userInput

        }
        else if (userInput === '.') {
            if (mainDisplay.innerText.includes('.'));
            else {
                mainDisplay.innerText += userInput
            }
        }
        else if (userInput === '+') {    /// for addition 
            if (mainDisplay.innerText === '0' && sideDisplay.innerText.length > 1);
            else {
                symbol = '+'
                numForAdd.push(parseFloat(mainDisplay.innerText))
                if (sideDisplay.innerText[0] === '0') sideDisplay.innerText = ''
                sideDisplay.innerText += mainDisplay.innerText + '+';
                mainDisplay.innerText = 0
            }

        }
        else if (userInput === '=' && symbol === '+') { /// for addition 
            numForAdd.push(parseFloat(mainDisplay.innerText))
            numForAdd.forEach((num) => {
                sum += num;
            })
            if (mainDisplay.innerText[0] === '0') mainDisplay.innerText = '';
            mainDisplay.innerText = sum.toFixed(2);
            numForAdd = []
            sum = 0;
            sideDisplay.innerText = 0;
            symbol = ''
        }
        else if (userInput === '-') {
            if (mainDisplay.innerText === '0' && sideDisplay.innerText.length > 1);
            else {
                symbol = '-'
                numForAdd.push(parseFloat(mainDisplay.innerText))
                if (sideDisplay.innerText[0] === '0') sideDisplay.innerText = ''
                sideDisplay.innerText += mainDisplay.innerText + '-';
                mainDisplay.innerText = 0
            }



        }
        else if (userInput === '=' && symbol === '-') {
            numForAdd.push(parseFloat(mainDisplay.innerText))
            if (numForAdd.length) {
                subtract = numForAdd[0];
                for (let i = 1; i < numForAdd.length; i++) {
                    if (numForAdd[i]) subtract = subtract - numForAdd[i]
                }
            }
            mainDisplay.innerText = subtract.toFixed(2);
            sideDisplay.innerText = 0
            numForAdd = [];
            subtract = 0;
            symbol = ''
        }
        else if (userInput === '*') {
            if (mainDisplay.innerText === '0' && sideDisplay.innerText.length > 1);
            else {
                symbol = '*'
                numForAdd.push(parseFloat(mainDisplay.innerText))
                if (sideDisplay.innerText[0] === '0') sideDisplay.innerText = ''
                sideDisplay.innerText += mainDisplay.innerText + '*';
                mainDisplay.innerText = 0
            }

        }
        else if (userInput === '=' && symbol === '*') {
            numForAdd.push(parseFloat(mainDisplay.innerText))
            numForAdd.forEach((num) => {
                mul = mul * num
            })
            mainDisplay.innerText = mul.toFixed(2);
            sideDisplay.innerText = 0
            numForAdd = [];
            mul = 1;
            symbol = ''
        }
        else if (userInput === '/') {
            if (mainDisplay.innerText === '0' && sideDisplay.innerText.length > 1);
            else {
                symbol = '/'
                numForAdd.push(parseFloat(mainDisplay.innerText))
                if (sideDisplay.innerText[0] === '0') sideDisplay.innerText = ''
                sideDisplay.innerText += mainDisplay.innerText + '/';
                mainDisplay.innerText = 0
            }

        }
        else if (userInput === '=' && symbol === '/') {
            numForAdd.push(parseFloat(mainDisplay.innerText))
            if (numForAdd.length === 1) div = numForAdd[0]
            else {
                div = numForAdd[0]
                for (let i = 1; i < numForAdd.length; i++) {
                    div = div / numForAdd[i];
                }
            }

            mainDisplay.innerText = div.toFixed(2);
            sideDisplay.innerText = 0
            numForAdd = [];
            symbol = ''
        }
        else if (userInput === 'del') {
            numForAdd = []
            if (mainDisplay.innerText != '0') {
                mainDisplay.innerText = mainDisplay.innerText.slice(0, -1)
                if (mainDisplay.innerText === '') mainDisplay.innerText = 0
            }
            else if (mainDisplay.innerText === '0' && sideDisplay.innerText !== '0') {
                mainDisplay.innerText = sideDisplay.innerText.slice(0, -1);
                sideDisplay.innerText = 0
            }
        }
        else if (userInput === 'Reset') {
            sideDisplay.innerText = 0
            mainDisplay.innerText = 0
        }
    }



})

const toggleLabel = document.querySelector('.toggle-label')
let data = localStorage.getItem('theme') || 1;
localStorage.setItem('theme', data)
document.body.classList.add(`theme${data}`)
toggleLabel.addEventListener('click', (e) => {
    document.body.classList.remove(`theme${data}`)
    console.log(e.target)
    if (e.target === toggleLabel) {}
    else if (e.target.innerText === '1' || e.target.innerText === '2' || e.target.innerText === '3') {
        data = e.target.innerText;
        document.body.classList.add(`theme${data}`)
        console.log(e.target.innerText, 'i am in')
    } else {
        data++
        if (data > 3) data = 1;
        document.body.classList.add(`theme${parseInt(data)}`)
    }
    localStorage.setItem('theme', data)
})