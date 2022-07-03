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
    const [searchValue, setSearchValue] = useState('');
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
                })
                .catch(() => setLoginFail("Во время входа произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"));
        } else {
            setLoggedIn(false);
        }
    }

    function handleLogout() {
        localStorage.removeItem('allMovies');
        localStorage.removeItem('jwt');
        localStorage.removeItem('searchedValue');
        localStorage.removeItem('checkboxState');
        localStorage.removeItem('searchedMovies');
        localStorage.removeItem('searchedSavedMovies');
        setCurrentUser();
        setMovies();
        setSavedMovies();
        setLoggedIn(false);
        history.push("/");
    }

    function handleMenuPopupOpen() {
        setMenuPopupOpen(true);
    }

    function handleMenuPopupClose() {
        setMenuPopupOpen(false);
    }

    // useEffect(() => {
    //     if (searchValue) {
    //         handleSearch(searchValue);
    //     } else if (loggedIn) {
    //         handleChangePage();
    //     }
    // }, [checkboxState]);

    function handleCheckboxState() {
        setPreload(true);
        clearAllError();
        const allMovies = JSON.parse(localStorage.getItem('allMovies'));
        const jwt = localStorage.getItem('jwt');

        main.getUserMovies(jwt)
            .then((movies) => {
                if (!checkboxState) {
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
        setCheckboxState(!checkboxState);
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

    function handleEmptySearch() {
        setMovies(JSON.parse(localStorage.getItem('allMovies')));
        // setSavedMovies(savedMovies);
    }

    function handleSearch(value) {
        setPreload(true);
        setSearchValue(value);
        const currentSearchValue = value.toLowerCase();
        const page = window.location.pathname;
        const filteredAll = searchFilms(currentSearchValue, JSON.parse(localStorage.getItem('allMovies')));
        const filteredSaved = (savedMovies ? searchFilms(currentSearchValue, savedMovies) : []);
        let resultAll = [];
        let resultSaved = [];

        if (checkboxState) {
            filteredAll.forEach((movie) => {
                if (movie.duration < 41) {
                    resultAll.push(movie);
                }
            })
            filteredSaved.forEach((movie) => {
                if (movie.duration < 41) {
                    resultSaved.push(movie);
                }
            })
        } else {
            resultAll = filteredAll;
            resultSaved = filteredSaved;
        }
        setMovies(resultAll);
        setSavedMovies(resultSaved);
        localStorage.setItem('searchedMovies', JSON.stringify(resultAll));
        localStorage.setItem('searchedSavedMovies', JSON.stringify(resultSaved));
        localStorage.setItem('searchedValue', value);
        localStorage.setItem('checkboxState', checkboxState.toString());
        setPreload(false);
        if (page === '/movies') {
            if (resultAll.length < 1) {
                setSearchError("Ничего не найдено");
            }
        } else if (resultSaved.length < 1) {
                setSearchError("Ничего не найдено");
        }
    }

    function handleChangePage() {
        clearAllError();
        const checkboxState = Boolean(localStorage.getItem('checkboxState'));
        const searchedValue = localStorage.getItem('searchedValue');
        const allCurrentMovies = JSON.parse(localStorage.getItem('searchedMovies'));
        const allCurrentSavedMovies = JSON.parse(localStorage.getItem('searchedSavedMovies'));

        if (allCurrentMovies) {
            setMovies(allCurrentMovies);
        }
        if (checkboxState) {
            setCheckboxState(checkboxState);
        }
        if (searchedValue) {
            setSearchValue(searchedValue);
        }
        if (allCurrentSavedMovies) {
            setSavedMovies(allCurrentSavedMovies);
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
                Promise.all([main.getUserInfo(jwt), main.getUserMovies(jwt), api.getInitialMovies()])
                    .then(([user, userMovies, movies]) => {
                        setPreload(true);
                        setCurrentUser(user);
                        setMovies(movies);
                        if (userMovies.length > 0) {
                            setSavedMovies(userMovies);
                        }
                        setLoggedIn(true);
                        localStorage.setItem('allMovies', JSON.stringify(movies));
                        history.push("/movies");
                        setPreload(false);
                    })
                    .catch((err) => {
                        setFail("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
                    });
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

    function handleButtonClick(movie) {
        const page = window.location.pathname;
        const jwt = localStorage.getItem('jwt');
        if (page === '/movies') {
            const savedMovie = savedMovies.find(item => item.movieId === movie.id);
            if (savedMovie !== undefined) {
                main.deleteMovie(savedMovie._id, jwt)
                    .then(() => {
                        main.getUserMovies(jwt)
                            .then((userMovies) => {
                                setSavedMovies(userMovies);
                            })
                    })
                    .catch(() => console.log("Фильм не удалось удалить"));
            } else {
                main.addNewFilm(movie.country, movie.director, movie.duration, movie.year, movie.description,
                    movie.image, movie.trailerLink, movie.nameRU, movie.nameEN, movie.image, movie.id, jwt)
                    .then((movie) => {
                        setSavedMovies([...savedMovies, movie]);
                    })
                    .catch(() => console.log("Фильм не удалось сохранить"));
            }
        } else {
            main.deleteMovie(movie.id, jwt)
                .then(() => {
                    main.getUserMovies(jwt)
                        .then((userMovies) => {
                            setSavedMovies(userMovies);
                        })
                })
                .catch(() => console.log("Фильм не удалось удалить"));
        }

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
                        {loggedIn ? <Header filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт" handleChange={handleChangePage}
                                            onOpenMenu={handleMenuPopupOpen}/> : <Header regText="Регистрация" authText="Войти"/>}
                        <Main />
                        <Footer />
                    </Route>
                    <ProtectedRoute exact path="/movies" loggedIn={loggedIn}>
                        <Header filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт" handleChange={handleChangePage}
                                onOpenMenu={handleMenuPopupOpen}/>
                        <Movies preload={preload} fail={fail} movies={movies} savedMovies={savedMovies}
                                isChecked={checkboxState} error={searchError} handleChange={handleCheckboxState}
                                handleSearch={handleSearch} handleEmptySearch={handleEmptySearch} clearAllError={clearAllError}
                                searchValue={searchValue} handleButtonClick={handleButtonClick} setSearchValue={setSearchValue}/>
                        <Footer />
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/saved-movies" loggedIn={loggedIn}>
                        <Header filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт" handleChange={handleChangePage}
                                onOpenMenu={handleMenuPopupOpen}/>
                        <SavedMovies movies={savedMovies} isChecked={checkboxState} handleSearch={handleSearch}
                                     handleEmptySearch={handleEmptySearch} handleChange={handleCheckboxState}
                                     clearAllError={clearAllError} error={searchError} searchValue={searchValue}
                                     setSearchValue={setSearchValue} handleButtonClick={handleButtonClick}/>
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
