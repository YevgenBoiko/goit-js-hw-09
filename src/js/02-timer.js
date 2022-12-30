import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', true);

let timer = 0;
let interval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timer = selectedDates[0].getTime() - options.defaultDate.getTime();
    convertToDate(timer);

    if (timer > 0) {
      startBtn.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future');
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', onStartClick);

function onStartClick() {
  startBtn.disabled = true;

  interval = setInterval(() => {
    convertToDate(timer);
    timer -= 1000;

    if (timer < 0) {
      clearInterval(interval);
    }
  }, 1000);
}

function convertToDate(timerData) {
  days.textContent = addLeadingZero(convertMs(timerData).days);
  hours.textContent = addLeadingZero(convertMs(timerData).hours);
  minutes.textContent = addLeadingZero(convertMs(timerData).minutes);
  seconds.textContent = addLeadingZero(convertMs(timerData).seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
