const boardContainer = document.querySelector('.board-container')
const menu = document.querySelector('.choices')
const choices = document.querySelectorAll('.choice')
const board = document.querySelector('.board')
const scores = document.querySelector('.scores')
const tiles = document.querySelectorAll('.tile')
let playerChoice
let computerChoice

function disableTile (tile) {
  tile.style.cursor = 'auto'
  tile.style.pointerEvents = 'none'
}

function computerPlaying () {
  boardContainer.style.pointerEvents = 'none'
  boardContainer.style.pointer = 'default'
  const indexofTile = Math.floor(Math.random() * tiles.length)
  const randomTile = tiles[indexofTile]
  if (randomTile.classList.contains('selected')) {
    computerPlaying()
  } else {
    randomTile.innerHTML = computerChoice
    randomTile.classList.add('selected')
    boardContainer.style.pointerEvents = 'auto'
    boardContainer.style.pointer = 'pointer'
    disableTile(randomTile)
  }
}

function userPlaying () {
  this.innerHTML = playerChoice
  this.classList.add('selected')
  disableTile(this)
  computerPlaying()
}

function beginGame () {
  function randomFrom (array) {
    return array[Math.floor(Math.random() * array.length)]
  }

  const randomFunction = randomFrom(['computerPlaying', 'userPlaying'])
  window[randomFunction]()
}

function chooseXorY () {
  playerChoice = this.dataset.choice
  playerChoice === 'O' ? computerChoice = 'X' : computerChoice = 'O'
  boardContainer.firstElementChild.style.display = 'none'
  menu.style.display = 'none'
  board.style.display = 'flex'
  scores.style.display = 'flex'
  beginGame()
}

choices.forEach(button => button.addEventListener('click', chooseXorY))
tiles.forEach(tile => tile.addEventListener('click', userPlaying))
