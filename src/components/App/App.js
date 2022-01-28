import React, {useEffect, useState} from 'react';
import { Route, Switch } from 'react-router-dom';
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

function App() {
    const [isMenuPopupOpen, setMenuPopupOpen] = useState(false);
    const [isCheckboxState, setCheckboxState] = useState(true);

    function handleMenuPopupOpen() {
        setMenuPopupOpen(true);
    }

    function handleMenuPopupClose() {
        setMenuPopupOpen(false);
    }

    function handleCheckboxState() {
        setCheckboxState(!isCheckboxState);
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
                    <Movies isChecked={isCheckboxState} handleChange={handleCheckboxState}/>
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
                    <Profile />
                </Route>
                <Route path="/signin">
                    <Register />
                </Route>
                <Route path="/signup">
                    <Login />
                </Route>
            </Switch>

            <MenuPopup generalText="Главная" filmText="Фильмы" saveFilmText="Сохраненные фильмы" accountText="Аккаунт"
                       isOpen={isMenuPopupOpen} onClose={handleMenuPopupClose}/>

        </div>
  );
}

export default App;
