export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject (`Ошибка: ${res.status}`);
}

export const getInitialMovies = () => {
    return fetch(BASE_URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((res) => checkResponse(res));
}
