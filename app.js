const boardContainer = document.querySelector('.board-container')
const scoresContainer = document.querySelector('.scores')
const optionButtonsContainer = document.querySelector('.option-buttons')
const menu = document.querySelector('.choices')
const choices = menu.querySelectorAll('.choice')
const board = document.querySelector('.board')
const tiles = document.querySelectorAll('.tile')
const prompt = document.querySelector('.winner-prompt')
const optionButtons = optionButtonsContainer.querySelectorAll(`button[data-option]`)

let playerScore = scoresContainer.querySelector('.playerScore')
let computerScore = scoresContainer.querySelector('.computerScore')
let playerChoice
let computerChoice
let playerCombinations = []
let computerCombinations = []

function handleOptions () {
  function resetAll () {
    optionButtons.forEach(function (tile) {
      tile.style.display = 'none'
    })
    boardContainer.firstElementChild.style.display = 'block'
    board.style.display = 'none'
    menu.style.display = 'flex'
    scoresContainer.style.display = 'none'
    prompt.innerHTML = ''
    playerScore.textContent = 0
    computerScore.textContent = 0
    playerCombinations.length = 0
    computerCombinations.length = 0
    tiles.forEach(function (tile) {
      tile.innerHTML = ''
      tile.classList.remove('disabled')
    })
  }

  function playAgain () {
    optionButtons[0].style.display = 'none'
    tiles.forEach(function (tile) {
      tile.innerHTML = ''
      tile.classList.remove('disabled')
      playerCombinations.length = 0
      computerCombinations.length = 0
      prompt.innerHTML = ''
    })
  }

  const optionText = this.dataset.option
  const buttonFunctions = {
    resetAll,
    playAgain
  }
  buttonFunctions[optionText]()
}

function checkIfWinner (combination, tiles, isPlayer) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ]

  function winner (element) {
    return element.every(val => combination.includes(val))
  }

  function draw (tiles) {
    const tilesArray = Array.from(tiles)
    return tilesArray.every(tile => tile.classList.value.includes('disabled'))
  }

  const isWinner = winningCombinations.some(winner)
  const isDraw = draw(tiles)

  if (isWinner) {
    tiles.forEach(function(tile) {
      tile.classList.add('disabled')
    })
    if (isPlayer) {
      prompt.innerHTML = 'Player wins!'
      optionButtons[0].style.display = 'flex'
      playerScore.textContent++
    } else {
      prompt.innerHTML = 'Computer wins!'
      optionButtons[0].style.display = 'flex'
      computerScore.textContent++
    }
  }

  if (isDraw) {
    prompt.innerHTML = `It's a draw!`
    optionButtons[0].style.display = 'flex'
  }
}

function disableTile (tile) {
  tile.classList.add('disabled')
}

function computerPlaying () {
  if (computerCombinations.length === 3) {
    playerCombinations.length = 0
  }
  const indexOfTile = Math.floor(Math.random() * tiles.length)
  const randomTile = tiles[indexOfTile]
  if (randomTile.classList.value.includes('disabled')) {
    computerPlaying()
  } else {
    computerCombinations.push(indexOfTile)
    randomTile.innerHTML = computerChoice
    randomTile.classList.add('disabled')
    disableTile(randomTile)
    checkIfWinner(computerCombinations, tiles, false)
  }
}

function userPlaying () {
  if (playerCombinations.length === 3) {
    playerCombinations.length = 0
  }
  const indexOfTile = parseInt(this.dataset.tile)
  playerCombinations.push(indexOfTile)
  this.innerHTML = playerChoice
  this.classList.add('disabled')
  disableTile(this)
  checkIfWinner(playerCombinations, tiles, true)
  computerPlaying()
}

function beginGame () {
  // Randomly decides who goes first between the player and the computer
  function randomFrom (array) {
    return array[Math.floor(Math.random() * array.length)]
  }

  optionButtonsContainer.style.display = 'flex'
  optionButtons[0].style.display = 'none'
  optionButtons[1].style.display = 'inline-block'

  const randomFunction = randomFrom(['computerPlaying', 'userPlaying'])
  window[randomFunction]()
}

function chooseXorY () {
  playerChoice = this.dataset.choice
  playerChoice === 'O' ? computerChoice = 'X' : computerChoice = 'O'
  boardContainer.firstElementChild.style.display = 'none'
  menu.style.display = 'none'
  board.style.display = 'flex'
  scoresContainer.style.display = 'flex'
  beginGame()
}

choices.forEach(button => button.addEventListener('click', chooseXorY))
tiles.forEach(tile => tile.addEventListener('click', userPlaying))
optionButtons.forEach(button => button.addEventListener('click', handleOptions))
