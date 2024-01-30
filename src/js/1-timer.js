import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const data = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let intervalId = null;
data.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
        iziToast.show({
            message: 'Please, choose a date in the future!',
            backgroundColor: 'red',
            messageColor: 'white',
            position: 'topRight',
     })
      return;
    }
    if (selectedDates[0] > new Date()) {
      data.btnStart.disabled = false;
    }

    data.btnStart.addEventListener('click', () => {
      intervalId = setInterval(() => {
        const counter = selectedDates[0] - new Date();

        if (counter < 1000) {
          clearInterval(intervalId);
        }
        const result = convertMs(counter);
        viewOfTimer(result);
      }, 1000);
    });
  },
};

flatpickr(data.input, options);

function viewOfTimer({ days, hours, minutes, seconds }) {
  data.days.textContent = `${days}`;
  data.hours.textContent = `${hours}`;
  data.minutes.textContent = `${minutes}`;
  data.seconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}