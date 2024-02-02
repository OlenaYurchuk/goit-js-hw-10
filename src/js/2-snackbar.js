import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const delay = event.currentTarget.delay.valueAsNumber;
    const option = event.currentTarget.state.value;
   
    createPromise(option, delay);
});


function createPromise(option, delay) {
    const promise = new Promise((resolve, reject) => {

        setTimeout(() => {
            if (option === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

promise
    .then((delay) => {
        iziToast.success({
            position: 'topRight',
            message: `✅ Fulfilled promise in ${delay}ms`
        })
    })
    .catch((delay) => {
        iziToast.error({
            position: 'topRight',
            message: `❌ Rejected promise in ${delay}ms`
        })
    })
    form.reset()
}

