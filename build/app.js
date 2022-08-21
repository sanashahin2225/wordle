//import {wordle} from "./words.js"
const tileDisplay=document.querySelector('.tile-container')
const keyboard=document.querySelector('.key-container')
const messageDisplay=document.querySelector('.message-container')

const wordle = 'SUPER'
const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Enter',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '<<',
]

const guessRows=[
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','','']
]

let currentRow = 0
let currentTile = 0
let isGameOver = false

guessRows.forEach((guessRow,guessRowIndex) =>{
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id','guessRow-'+guessRowIndex)
    guessRow.forEach((guess,guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id','guessRow-'+guessRowIndex+'-tile-'+guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})

keys.forEach(key => {
    const buttonElement=document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id',key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

const handleClick = (letter) => {
    console.log('clicked',letter)
    if (letter === '<<'){
        deleteLetter()
        return
    }
    if (letter === 'Enter'){
        checkRow()
        return
    }
    addLetter(letter)
}

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6){
        const tile = document.getElementById('guessRow-'+ currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile]=letter
        tile.setAttribute('data',letter)
        currentTile++
    }
}

const deleteLetter = () => {
    if (currentTile > 0){
        currentTile--
        const tile = document.getElementById('guessRow-'+ currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile]=''
        tile.setAttribute('data','')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    if (currentTile > 4) {
        flipTile()
        if (wordle == guess){
            showMessage('Magnificent')
            isGameOver = true
            return
        }
        else{
            if (currentRow >= 5){
                isGameOver = false
                showMessage('Game over')
                return
            }
            if (currentRow < 5) {
                currentRow++
                currentTile = 0
            }
        }
    }
}

const showMessage = (Message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent=Message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
}

const addColorToKey = (keyletter,color) => {
    const key = document.getElementById(keyletter)
    key.classList.add(color)
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    const guess = []
    let checkWordle = wordle

    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), color: 'gray-overlay'})
    })

    guess.forEach((guess,index) => {
        if (guess.letter == wordle[index]){
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter,'')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)){
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter,'')
        }
    })

    rowTiles.forEach((tile ,index)=> {
        const dataLetter = tile.getAttribute('data')

        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter,guess[index].color)
        }, 500 * index)

    })
}