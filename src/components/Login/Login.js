import React, {useState} from 'react';
import headerLogo from "../../images/header-logo.svg";
import {Link} from "react-router-dom";
import '../Register/Register.css';

function Login(props) {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const [isValid, setIsValid] = React.useState(false);

    function handleChange(e) {
        const {name, value} = e.target;

        props.setLoginFail('');
        setData({
            ...data,
            [name]: value
        })
        setErrors({
            ...errors,
            [name]: e.target.validationMessage
        });
        setIsValid(e.target.closest("form").checkValidity());
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
                    <input id="email" name="email" type="email" className="register__text" onChange={handleChange} required/>
                    {errors.email ? <span className="register__error">{errors.email}</span> : null}
                    <label htmlFor="password">
                        Пароль
                    </label>
                    <input id="password" name="password" type="password" className="register__text" onChange={handleChange} required/>
                    {errors.password ? <span className="register__error">{errors.password}</span> : null}
                    {props.fail ? <span className="register__error">{props.fail}</span> : null}
                </div>
                <button type={isValid ? "submit" : null} className={isValid ? "register__button" : "register__button " +
                    "register__button_inactive"}>Войти</button>
            </form>

            <div className="register__signin">
                <p>Ещё не зарегистрированы?</p>
                <Link to="/signup" className="register__login-link">Регистрация</Link>
            </div>
        </div>
    );
}

export default Login;
