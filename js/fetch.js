import { showModalError } from './retrieval-data.js';

const RECEIPT_SERVER = 'https://22.javascript.pages.academy/keksobooking/data';
const DEPARTURE_SERVER = 'https://22.javascript.pages.academy/keksobooking';

//Получение данных с сервера
const getData = (onSuccess) => {
  fetch(RECEIPT_SERVER)

    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      showModalError('Коничева! Не удалось получить данные c сервера. Попробуйте позже.');
    });
};

//отправка формы на сервер
const sendData = (onSuccess, onFail, body) => {

  fetch(DEPARTURE_SERVER,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    })
};

export { getData, sendData };
