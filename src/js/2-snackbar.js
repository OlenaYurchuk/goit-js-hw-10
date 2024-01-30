import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const delay = event.currentTarget.delay.value;
    const option = event.currentTarget.state.value;
   
    createPromise(option, delay);
});


function createPromise(option, delay) {
    const promise = new Promise((resolve, reject) => {
        
        if (option === 'fulfilled') {
            setTimeout(() => {
                resolve(delay);
            }, delay);
        } else {
            reject(delay);
        }  
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

