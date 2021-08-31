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

function App() {
  return (
    <div className="app">
        <Switch>
            <Route exact path="/">
                <Header regText="Регистрация" authText="Войти"/>
                <Main />
                <Footer />
            </Route>
            <Route path="/movies">
                <Header filmText="Фильмы" saveFilmText="Сохраненные фильмы" regText="Регистрация" authText="Войти"/>
                <Movies />
            </Route>
            <Route path="/saved-movies">
                <SavedMovies />
            </Route>
            <Route path="/profile">
                <Profile />
            </Route>
            <Route path="/signin">
                <Register />
                <Login />
                <Profile />
            </Route>
            <Route path="/signup">
                <Register />
                <Login />
                <Profile />
            </Route>

        </Switch>
    </div>
  );
}

export default App;
