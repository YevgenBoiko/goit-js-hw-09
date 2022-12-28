function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

let colorInt = null;

function onStartClick() {
  colorInt = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);

  startBtn.setAttribute('disabled', true);
  stopBtn.disabled = false;
}

function onStopClick() {
  clearInterval(colorInt);
  stopBtn.setAttribute('disabled', true);
  startBtn.disabled = false;
}
