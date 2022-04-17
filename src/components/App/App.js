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
    const [isCheckboxState, setCheckboxState] = useState(false);
    const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('allMovies')) || []);
    const [preload, setPreload] = useState(false);
    const [fail, setFail] = useState('');
    const [loginFail, setLoginFail] = useState('');
    const [registerFail, setRegisterFail] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState();
    const [updateFail, setUpdateFail] = useState('');
    const [updateStatus, setUpdateStatus] = useState('');
    const [searchError, setSearchError] = useState('');
    const [allFilteredMovies, setAllFilteredMovies] = useState([]);
    const [allFilteredSavedMovies, setAllFilteredSavedMovies] = useState([]);
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
                    main.getUserMovies(jwt)
                        .then((movies) => {
                            setSavedMovies(movies);
                        });
                })
                .catch(() => setLoginFail("Во время входа произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"));
        } else {
            setLoggedIn(false);
        }
    }

    function handleLogout() {
        setCurrentUser();
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        localStorage.removeItem('allMovies');
        history.push("/");
    }

    function handleMenuPopupOpen() {
        setMenuPopupOpen(true);
    }

    function handleMenuPopupClose() {
        setMenuPopupOpen(false);
    }

    function handleCheckboxState() {
        setPreload(true);
        setCheckboxState(!isCheckboxState);
        const allMovies = JSON.parse(localStorage.getItem('allMovies'));
        let result = [];
        let resultSavedMovies = [];

        if (!isCheckboxState && allFilteredMovies.length > 0) {
            allFilteredMovies.forEach((movie) => {
                if (movie.duration < 41) {
                    result.push(movie);
                }
            })
            if (allFilteredSavedMovies.length > 0) {
                allFilteredSavedMovies.forEach((movie) => {
                    if (movie.duration < 41) {
                        resultSavedMovies.push(movie);
                    }
                })
            }
        } else if (isCheckboxState && allFilteredMovies.length > 0) {
            result = allFilteredMovies;
            if (allFilteredSavedMovies.length > 0) {
                resultSavedMovies = allFilteredSavedMovies;
            }
        } else if (!isCheckboxState) {
            allMovies.forEach((movie) => {
                if (movie.duration < 41) {
                    result.push(movie);
                }
            })
            savedMovies.forEach((movie) => {
                if (movie.duration < 41) {
                    resultSavedMovies.push(movie);
                }
            })
        } else {
            result = allMovies;
            resultSavedMovies = savedMovies;
        }
        setMovies(result);
        setSavedMovies(resultSavedMovies);
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
        setPreload(false);
    }

    function searchFilms(searchValue, result, movies) {
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
    }

    function handleSearch(value) {
        // debugger;
        setPreload(true);
        setAllFilteredMovies();
        const searchValue = value.toLowerCase();
        const allMovies = JSON.parse(localStorage.getItem('allMovies'));
        const filmList = [];
        const filmSavedList = [];
        let result = [];
        let resultSavedMovies = [];

        searchFilms(searchValue, filmList, allMovies);
        searchFilms(searchValue, filmSavedList, savedMovies);

        setAllFilteredMovies(filmList);
        setAllFilteredSavedMovies(filmSavedList);

        if (isCheckboxState) {
            filmList.forEach((movie) => {
                if (movie.duration < 41) {
                    result.push(movie);
                }
            })
            filmSavedList.forEach((movie) => {
                if (movie.duration < 41) {
                    resultSavedMovies.push(movie);
                }
            })
        } else {
            result = filmList;
            resultSavedMovies = filmSavedList;
        }
        setMovies(result);
        setSavedMovies(resultSavedMovies);
        setPreload(false);
        if (result.length < 1) {
            setSearchError("Ничего не найдено");
        }
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
                setLoggedIn(true);
                history.push("/movies");
                main.getUserInfo(jwt)
                    .then((user) => {
                        setCurrentUser(user);
                        handleLoad(jwt);
                    })
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
                main.getUserMovies(jwt)
                    .then((movies) => {
                        setSavedMovies(movies);
                    });
            })
    }

    function handleSaveMovie(movie) {
        const jwt = localStorage.getItem('jwt');
        debugger;
        main.addNewFilm(movie.country, movie.director, movie.duration, movie.year, movie.description,
            movie.image, movie.trailerLink, movie.nameRU, movie.nameEN, movie.image, movie.id, jwt)
            .then(() => {
                main.getUserMovies(jwt)
                    .then((movies) => {
                        setSavedMovies(movies);
                    })
                    .catch(() => console.log("Ошибка чтения сохраненных фильмов"))
            })
            .catch(() => console.log("Фильм не удалось сохранить"));
    }

    function clearAllError() {
        setSearchError('');
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
                        <Header filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт"
                                onOpenMenu={handleMenuPopupOpen}/>
                        <Movies preload={preload} fail={fail} movies={movies} savedMovies={savedMovies}
                                isChecked={isCheckboxState} error={searchError} handleChange={handleCheckboxState}
                                handleSearch={handleSearch} handleDelete={handleDelete} handleSave={handleSaveMovie}
                                clearAllError={clearAllError}/>
                        <Footer />
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/saved-movies" loggedIn={loggedIn}>
                        <Header filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт"
                                onOpenMenu={handleMenuPopupOpen}/>
                        <SavedMovies movies={savedMovies} savedMovies={savedMovies} isChecked={isCheckboxState}
                                     handleSearch={handleSearch} handleDelete={handleDelete}
                                     handleChange={handleCheckboxState}/>
                        <Footer />
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/profile" loggedIn={loggedIn}>
                        <Header filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт"
                                onOpenMenu={handleMenuPopupOpen}/>
                        <Profile currentUser={currentUser} hangleUpdate={handleUpdate}
                                 updateFail={updateFail} updateStatus={updateStatus} handleLogout={handleLogout}/>
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

                <MenuPopup generalText="Главная" filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт"
                           isOpen={isMenuPopupOpen} onClose={handleMenuPopupClose}/>

            </div>
        </CurrentUserContext.Provider>
  );
}

export default App;
