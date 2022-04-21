import React, {useEffect, useState} from 'react';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MenuPopup from "../MenuPopup/MenuPopup";
import ErrorPage from "../ErrorPage/ErrorPage";
import * as api from '../../utils/MoviesApi';
import * as main from '../../utils/MainApi';
import {CurrentUserContext} from "../../context/CurrentUserContext";

function App() {
    const history = useHistory();
    const [isMenuPopupOpen, setMenuPopupOpen] = useState(false);
    const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('allMovies')) || []);
    const [checkboxState, setCheckboxState] = useState(false);
    const [preload, setPreload] = useState(false);
    const [fail, setFail] = useState('');
    const [loginFail, setLoginFail] = useState('');
    const [registerFail, setRegisterFail] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState();
    const [updateFail, setUpdateFail] = useState('');
    const [updateStatus, setUpdateStatus] = useState('');
    const [searchError, setSearchError] = useState('');
    const [searchValue, setSearchValue] = useState();
    const [savedMovies, setSavedMovies] = useState([]);

    useEffect(() => {
        checkToken();
    }, []);

    function checkToken() {
        const jwt = localStorage.getItem('jwt');

        if (jwt) {
            main.checkToken(jwt)
                .then(user => {
                    setCurrentUser(user);
                    setLoggedIn(true);
                    handleChangePage();
                    history.push("/movies");
                })
                .catch(() => setLoginFail("Во время входа произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"));
        } else {
            setLoggedIn(false);
        }
    }

    function handleLogout() {
        localStorage.removeItem('allMovies');
        localStorage.removeItem('jwt');
        setCurrentUser();
        setLoggedIn(false);
        history.push("/");
    }

    function handleMenuPopupOpen() {
        setMenuPopupOpen(true);
    }

    function handleMenuPopupClose() {
        setMenuPopupOpen(false);
    }

    useEffect(() => {
        if (searchValue) {
            handleSearch(searchValue);
        } else if (loggedIn) {
            handleChangePage();
        }
    }, [checkboxState]);

    function handleCheckboxState() {
        setPreload(true);
        clearAllError();
        setCheckboxState(!checkboxState);
        setPreload(false);
    }

    function handleLoad(jwt) {
        setPreload(true);
        main.getUserMovies(jwt)
            .then((movies) => {
                setSavedMovies(movies);
                api.getInitialMovies()
                    .then((movies) => {
                        localStorage.setItem('allMovies', JSON.stringify(movies));
                        setMovies(movies);
                    })
                    .catch(() => setFail("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"));
            })
            .catch(() => setFail("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"));
        setPreload(false);
    }

    function searchFilms(searchValue, movies) {
        let result = [];

        movies.forEach((movie) => {
            if (movie.nameRU && movie.nameRU.toLowerCase().indexOf(searchValue) > -1) {
                result.push(movie);
            } else if (movie.nameEN && movie.nameEN.toLowerCase().indexOf(searchValue) > -1) {
                result.push(movie);
            } else if (movie.description && movie.description.toLowerCase().indexOf(searchValue) > -1) {
                result.push(movie);
            } else if (movie.director && movie.director.toLowerCase().indexOf(searchValue) > -1) {
                result.push(movie);
            }
        })
        return result;
    }

    function handleSearch(value) {
        setPreload(true);
        setSearchValue(value);
        const searchValue = value.toLowerCase();
        const page = window.location.pathname;
        const allMovies = (page === '/movies') ? JSON.parse(localStorage.getItem('allMovies')) : savedMovies;
        const filteredAll = searchFilms(searchValue, allMovies);
        let result = [];

        if (checkboxState) {
            filteredAll.forEach((movie) => {
                if (movie.duration < 41) {
                    result.push(movie);
                }
            })
        } else {
            result = filteredAll;
        }
        (page === '/movies') ? setMovies(result) : setSavedMovies(result);
        setPreload(false);
        if (result.length < 1) {
            setSearchError("Ничего не найдено");
        }
    }

    function handleChangePage() {
        setSearchValue();
        clearAllError();
        const allMovies = JSON.parse(localStorage.getItem('allMovies'));
        const jwt = localStorage.getItem('jwt');

        main.getUserMovies(jwt)
            .then((movies) => {
                if (checkboxState) {
                    const resultAll = allMovies.filter(movie => movie.duration < 41);
                    const resultSaved = movies.filter(movie => movie.duration < 41);

                    setMovies(resultAll);
                    setSavedMovies(resultSaved);
                } else {
                    setMovies(allMovies);
                    setSavedMovies(movies);
                }
            })
            .catch(() => console.log("Ошибка чтения данных"));
    }

    function handleUpdate({name, email}) {
        const jwt = localStorage.getItem('jwt');

        main.updateUserInfo(name, email, jwt)
            .then((user) => {
                setCurrentUser(user);
                setUpdateStatus("Данные успешно обновлены");
            })
            .catch(() => {
                setUpdateFail("Во время входа произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
            })
    }

    function handleLogin({email, password}) {
        setRegisterFail('');
        main.authorize(email, password)
            .then((data) => {
                let jwt = data.token;

                localStorage.setItem('jwt', jwt);
                main.getUserInfo(jwt)
                    .then((user) => {
                        setCurrentUser(user);
                        handleLoad(jwt);
                    })
                    .then(() => {
                        setLoggedIn(true);
                        history.push("/movies");
                    })
                    .catch(() => console.log("Ошибка чтения пользовательских данных"))
            })
            .catch((data) => {
                if (data === 401) {
                    setLoginFail("Указан неверный логин или пароль");
                } else {
                    setLoginFail("Во время входа произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
                }
            })
    }

    function handleRegister({email, password, name}) {
        setLoginFail('');
        main.register(email, password, name)
            .then(() => {
                handleLogin({email, password});
            })
            .catch((data) => {
                if (data === 409) {
                    setRegisterFail("Пользователь с указанным email уже зарегистрирован");
                } else {
                    setRegisterFail("Во время регистрации произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз")
                }
            });
    }

    function handleDelete(movieId) {
        const jwt = localStorage.getItem('jwt');

        main.deleteMovie(movieId, jwt)
            .then(() => {
                handleChangePage();
            })
            .catch(() => console.log("Фильм не удалось удалить"));
    }

    function handleSaveMovie(movie) {
        const jwt = localStorage.getItem('jwt');

        main.addNewFilm(movie.country, movie.director, movie.duration, movie.year, movie.description,
            movie.image, movie.trailerLink, movie.nameRU, movie.nameEN, movie.image, movie.id, jwt)
            .then(() => {
                handleChangePage();
            })
            .catch(() => console.log("Фильм не удалось сохранить"));
    }

    function clearAllError() {
        setSearchError('');
        setUpdateFail('');
        setUpdateStatus('');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app">
                <Switch>
                    <Route exact path="/">
                        <Header regText="Регистрация" authText="Войти"/>
                        <Main />
                        <Footer />
                    </Route>
                    <ProtectedRoute exact path="/movies" loggedIn={loggedIn}>
                        <Header filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт" handleChange={handleChangePage}
                                onOpenMenu={handleMenuPopupOpen}/>
                        <Movies preload={preload} fail={fail} movies={movies} savedMovies={savedMovies}
                                isChecked={checkboxState} error={searchError} handleChange={handleCheckboxState}
                                handleSearch={handleSearch} handleDelete={handleDelete} handleSave={handleSaveMovie}
                                clearAllError={clearAllError}/>
                        <Footer />
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/saved-movies" loggedIn={loggedIn}>
                        <Header filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт" handleChange={handleChangePage}
                                onOpenMenu={handleMenuPopupOpen}/>
                        <SavedMovies movies={savedMovies} savedMovies={savedMovies} isChecked={checkboxState} handleSearch={handleSearch}
                                     handleDelete={handleDelete} handleChange={handleCheckboxState} clearAllError={clearAllError}
                                     error={searchError}/>
                        <Footer />
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/profile" loggedIn={loggedIn}>
                        <Header filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт" handleChange={handleChangePage}
                                onOpenMenu={handleMenuPopupOpen}/>
                        <Profile hangleUpdate={handleUpdate} updateFail={updateFail} updateStatus={updateStatus} handleLogout={handleLogout}
                                 setUpdateFail={setUpdateFail} setUpdateStatus={setUpdateStatus}/>
                    </ProtectedRoute>
                    <Route exact path="/signup">
                        {!loggedIn ? <Register fail={registerFail} setRegisterFail={setRegisterFail} handleRegister={handleRegister}/> : <Redirect to="/movies" />}
                    </Route>
                    <Route exact path="/signin">
                        {!loggedIn ? <Login fail={loginFail} setLoginFail={setLoginFail} handleLogin={handleLogin}/> : <Redirect to="/movies" />}
                    </Route>
                    <Route path="*">
                        <ErrorPage/>
                    </Route>
                </Switch>

                <MenuPopup generalText="Главная" filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт" handleChange={handleChangePage}
                           isOpen={isMenuPopupOpen} onClose={handleMenuPopupClose}/>

            </div>
        </CurrentUserContext.Provider>
  );
}

export default App;
