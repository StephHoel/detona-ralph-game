const state = {
  view: {
    squares: document.querySelectorAll('.square'),
    enemy: document.querySelector('.enemy'),
    timeLeft: document.querySelector('#time-left'),
    score: document.querySelector('#score'),
  },
  values: {
    hitPosition: 0,
    points: 0,
    currentTime: 60
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  }
}

function countDown() {
  state.values.currentTime--
  state.view.timeLeft.textContent = state.values.currentTime

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId)
    clearInterval(state.actions.timerId)
    alert("Game Over! O seu resultado foi de "+state.values.points+" pontos!")
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`)
  audio.volume = 0.1
  audio.play()
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy")
  })

  let randomNumber = Math.floor(Math.random()*9)
  let randomSquare = state.view.squares[randomNumber]
  randomSquare.classList.add('enemy')

  state.values.hitPosition = randomSquare.id
}

function addListenerHitbox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.points++
        state.view.score.textContent = state.values.points
        state.values.hitPosition = null
        playSound("hit")
      }
      
    })
  })
}

function init() {
  addListenerHitbox()
}

init()