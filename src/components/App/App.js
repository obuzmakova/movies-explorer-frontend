import React, {useEffect, useState} from 'react';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Route, Switch, useHistory } from 'react-router-dom';
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

function App() {
    const history = useHistory();
    const CurrentUserContext = React.createContext();
    const [isMenuPopupOpen, setMenuPopupOpen] = useState(false);
    const [isCheckboxState, setCheckboxState] = useState(true);
    const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('allMovies')) || []);
    const [preload, setPreload] = useState(false);
    const [fail, setFail] = useState('');
    const [loginFail, setLoginFail] = useState('');
    const [registerFail, setRegisterFail] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({ name: '', email: ''});
    const [saved, setSaved] = useState(false);
    const [updateFail, setUpdateFail] = useState('');
    const [updateStatus, setUpdateStatus] = useState('');
    const [searchError, setSearchError] = useState('');

    useEffect(() => {
        checkToken();
    }, []);

    function checkToken() {
        const jwt = localStorage.getItem('jwt');

        if (jwt) {
            main.checkToken(jwt)
                .then(data => {
                    setCurrentUser({
                        name: data.name,
                        email: data.email,
                    });
                    setLoggedIn(true);
                    history.push("/movies");
                })
                .catch(() => setLoginFail("Во время входа произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"));
        } else {
            setLoggedIn(false);
        }
    }

    function handleLogout() {
        setCurrentUser({
            name: '',
            email: ''
        });
        setLoggedIn(false);
        localStorage.removeItem('jwt');
    }

    function handleMenuPopupOpen() {
        setMenuPopupOpen(true);
    }

    function handleMenuPopupClose() {
        setMenuPopupOpen(false);
    }

    function handleCheckboxState() {
        // setPreload(true);
        setCheckboxState(!isCheckboxState);
        //
        // if (!isCheckboxState) {
        //     debugger
        // } else {
        //     debugger
        // }
    }

    function handleLoad() {
        setPreload(true);
        api.getInitialMovies()
            .then((movies) => {
                localStorage.setItem('allMovies', JSON.stringify(movies));
                setMovies(movies);
                setPreload(false);
            })
            .catch(() => setFail("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"));
    }

    function handleSearch(value) {
        setPreload(true);
        const searchValue = value.toLowerCase();
        const allMovies = JSON.parse(localStorage.getItem('allMovies'));
        const result = [];

        allMovies.forEach((movie) => {
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

        setMovies(result);
        setPreload(false);
        if (result.length < 1) {
            setSearchError("Ничего не найдено");
        }
    }

    function loadUserData(jwt) {
        main.getUserInfo(jwt)
            .then((data) => {
                setCurrentUser({
                    name: data.name,
                    email: data.email
                });
            })
    }

    function handleUpdate({name, email}) {
        const jwt = localStorage.getItem('jwt');

        main.updateUserInfo(name, email, jwt)
            .then((data) => {
                setCurrentUser({
                    name: data.name,
                    email: data.email
                });
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
                localStorage.setItem('jwt', data.token);
                setLoggedIn(true);
                history.push("/movies");
            })
            .then(() => {
                loadUserData(localStorage.getItem('jwt'));
                handleLoad();
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

    function handleSaveMovie(movie) {
        const jwt = localStorage.getItem('jwt');

        main.addNewFilm(movie.country, movie.director, movie.duration, movie.year, movie.description,
            `https://api.nomoreparties.co/` + movie.image.url, movie.trailerLink,
            movie.nameRU, movie.nameEN, `https://api.nomoreparties.co/` + movie.image.url, movie.id, jwt)
            .then((data) => {
                main.getUserMovies(jwt)
            })
            .then((data) => {
                debugger;
                setSaved(true);
            })
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
                    <ProtectedRoute path="/movies" loggedIn={loggedIn}>
                        <Header filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт"
                                onOpenMenu={handleMenuPopupOpen}/>
                        <Movies preload={preload} fail={fail} movies={movies} isChecked={isCheckboxState} error={searchError}
                                handleChange={handleCheckboxState} handleSearch={handleSearch} handleSave={handleSaveMovie}
                                clearAllError={clearAllError}/>
                        <Footer />
                    </ProtectedRoute>
                    <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
                        <Header filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт"
                                onOpenMenu={handleMenuPopupOpen}/>
                        <SavedMovies hasSaved={saved} isChecked={isCheckboxState} handleSearch={handleSearch} handleChange={handleCheckboxState}/>
                        <Footer />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile" loggedIn={loggedIn}>
                        <Header filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт"
                                onOpenMenu={handleMenuPopupOpen}/>
                        <Profile name={currentUser.name} email={currentUser.email} hangleUpdate={handleUpdate}
                                 updateFail={updateFail} updateStatus={updateStatus} handleLogout={handleLogout}/>
                    </ProtectedRoute>
                    <Route path="/signup">
                        <Register fail={registerFail} setRegisterFail={setRegisterFail} handleRegister={handleRegister}/>
                    </Route>
                    <Route path="/signin">
                        <Login fail={loginFail} setLoginFail={setLoginFail} handleLogin={handleLogin}/>
                    </Route>
                    <Route>
                        <ErrorPage />
                    </Route>
                </Switch>

                <MenuPopup generalText="Главная" filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт"
                           isOpen={isMenuPopupOpen} onClose={handleMenuPopupClose}/>

            </div>
        </CurrentUserContext.Provider>
  );
}

export default App;
