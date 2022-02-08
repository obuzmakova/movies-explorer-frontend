export const MAIN_URL = 'http://cinema.nomoredomains.club';

const checkResponse = (res) => {
    debugger;
    if (res.ok) {
        return res.json();
    }
    return Promise.reject (`Ошибка: ${res.status}`);
}

export const getUserInfo = (jwt) => {
    return fetch(`${MAIN_URL}/users/me`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
    })
        .then((res) => checkResponse(res));
}

export const updateUserInfo = (newName, newEmail, jwt) => {
    return fetch(`${MAIN_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
            name: newName,
            email: newEmail
        })
    })
        .then((res) => checkResponse(res));
}

export const getUserMovies = (jwt) => {
    return fetch(`${MAIN_URL}/movies`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
    })
        .then((res) => checkResponse(res));
}

export const addNewFilm = (newCountry, newDirector, newDuration, newYear, newDescription, newImage, newTrailer,
                           newNameRU, newNameEN, newThumbnail, newMovieId, jwt) => {
    return fetch(`${MAIN_URL}/movies`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
            country: newCountry,
            director: newDirector,
            duration: newDuration,
            year: newYear,
            description: newDescription,
            image: newImage,
            trailer: newTrailer,
            nameRU: newNameRU,
            nameEN: newNameEN,
            thumbnail: newThumbnail,
            movieId: newMovieId
        })
    })
        .then((res) => checkResponse(res));
}

export const deleteMovie = (moviesId, jwt) => {
    return fetch(`${MAIN_URL}/movies/_${moviesId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
    })
        .then((res) => checkResponse(res));
}

export const register = (email, password, name) => {
    debugger
    return fetch(`${MAIN_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password, email, name})
    })
        .then((res) => checkResponse(res));
};
export const authorize = (email, password) => {
    return fetch(`${MAIN_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then((res) => checkResponse(res));
};
export const checkToken = (token) => {
    return fetch(`${MAIN_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((res) => checkResponse(res));
}
