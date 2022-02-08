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
    const [isMenuPopupOpen, setMenuPopupOpen] = useState(false);
    const [isCheckboxState, setCheckboxState] = useState(true);
    const [movies, setMovies] = useState([]);

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
        api.getInitialMovies()
            .then((movies) => {
                setMovies(movies);
        });
    }

    function handleRegister({email, password, name}) {
        main.register(email, password, name)
            .then((data) => {
                if (data) {
                    history.push("/signin");
                }
                else {
                    // handleFail();
                }
            })
            // .catch(handleFail)
    }

    return (
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
                    <Movies movies={movies} isChecked={isCheckboxState} handleChange={handleCheckboxState} handleSearch={handleSearch}/>
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
                    <Login />
                </Route>
                <Route path="/404">
                    <ErrorPage />
                </Route>
            </Switch>

            <MenuPopup generalText="Главная" filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт"
                       isOpen={isMenuPopupOpen} onClose={handleMenuPopupClose}/>

        </div>
  );
}

export default App;
