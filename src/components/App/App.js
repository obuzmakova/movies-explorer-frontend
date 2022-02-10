import React, {useState} from 'react';
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
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    function handleMenuPopupOpen() {
        setMenuPopupOpen(true);
    }

    function handleMenuPopupClose() {
        setMenuPopupOpen(false);
    }

    function handleCheckboxState() {
        setCheckboxState(!isCheckboxState);
    }

    function handleSearch() {
        setPreload(true);
        api.getInitialMovies()
            .then((movies) => {
                localStorage.setItem('allMovies', JSON.stringify(movies));
                setMovies(movies);
                setPreload(false);
        })
            .catch(() => setFail("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"));
    }

    function handleLogin({email, password}) {
        main.authorize(email, password)
            .then((data) => {
                debugger;
                localStorage.setItem('jwt', data.token);
                setLoggedIn(true);
                history.push("/movies");
            })
    }

    function handleRegister({email, password, name}) {
        main.register(email, password, name)
            .then((data) => {
                debugger;
                localStorage.setItem('jwt', data.token);
                setLoggedIn(true);
                history.push("/movies");
            })
            .catch(() => setFail("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"));
    }

    function handleSaveMovie(movie) {
        main.addNewFilm(movie.country, movie.director, movie.duration, movie.year, movie.description, movie.image.url, movie.trailerLink,
            movie.nameRU, movie.nameEN, movie.image.url, movie.id)
            .then((data) => {
                debugger;
            })
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
                    <Route path="/movies">
                        <Header filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт"
                                onOpenMenu={handleMenuPopupOpen}/>
                        <Movies preload={preload} fail={fail} movies={movies} isChecked={isCheckboxState}
                                handleChange={handleCheckboxState} handleSearch={handleSearch} handleSave={handleSaveMovie}/>
                        <Footer />
                    </Route>
                    <Route path="/saved-movies">
                        <Header filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт"
                                onOpenMenu={handleMenuPopupOpen}/>
                        <SavedMovies isChecked={isCheckboxState} handleChange={handleCheckboxState}/>
                        <Footer />
                    </Route>
                    <Route path="/profile">
                        <Header filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт"
                                onOpenMenu={handleMenuPopupOpen}/>
                        <Profile/>
                    </Route>
                    <Route path="/signup">
                        <Register handleRegister={handleRegister}/>
                    </Route>
                    <Route path="/signin">
                        <Login handleLogin={handleLogin}/>
                    </Route>
                    <Route path="/404">
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
