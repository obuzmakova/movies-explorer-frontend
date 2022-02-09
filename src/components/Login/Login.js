import React, {useState} from 'react';
import headerLogo from "../../images/header-logo.svg";
import {Link} from "react-router-dom";
import '../Register/Register.css';

function Login(props) {
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        const {name, value} = e.target;

        setData({
            ...data,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const {email, password} = data;
        props.handleLogin({email, password});
    }

    return (
        <div className="register">
            <Link to="/">
                <img alt="Логотип в виде зеленого круга с дыркой по центру" src={headerLogo} className="register__logo"/>
            </Link>
            <p className="register__welcome">
                Рады видеть!
            </p>
            <form onSubmit={handleSubmit}>
                <div className="register__rows">
                    <label htmlFor="email">
                        E-mail
                    </label>
                    <input id="email" name="email" type="email" className="register__text" onChange={handleChange}/>
                    <label htmlFor="password">
                        Пароль
                    </label>
                    <input id="password" name="password" type="password" className="register__text" onChange={handleChange}/>
                </div>
                <button type="submit" className="register__button">Войти</button>
            </form>

            <div className="register__signin">
                <p>Ещё не зарегистрированы?</p>
                <Link to="/signup" className="register__login-link">Регистрация</Link>
            </div>
        </div>
    );
}

export default Login;
