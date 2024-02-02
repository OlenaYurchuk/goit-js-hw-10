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

flatpickr(data.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= new Date()) {
      iziToast.error({
        message: 'Please, choose a date in the future!',
        position: 'topRight',
      });
    } else {
      data.btnStart.disabled = false;
    }
  },
});

data.btnStart.addEventListener('click', () => {
  data.btnStart.disabled = true;
  data.input.disabled = true;
  intervalId = setInterval(() => {
    const choosenDate = new Date(data.input.value);
    const timeDifference = choosenDate - new Date();
    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    data.days.textContent = addLeadingZero(days);
    data.hours.textContent = addLeadingZero(hours);
    data.minutes.textContent = addLeadingZero(minutes);
    data.seconds.textContent = addLeadingZero(seconds);

        if (timeDifference < 1000) {
          clearInterval(intervalId);
          data.btnStart.disabled = false;
        }
      }, 1000);
})

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

