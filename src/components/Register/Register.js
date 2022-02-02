import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import headerLogo from "../../images/header-logo.svg";

function Register() {
    const [data, setData] = useState({
        name: 'Ольга',
        email: 'olga@yandex.ru'
    })

    return (
        <div className="register">
            <Link to="/">
                <img alt="Логотип в виде зеленого круга с дыркой по центру" src={headerLogo} className="register__logo"/>
            </Link>
            <p className="register__welcome">
                Добро пожаловать!
            </p>
            <form>
                <div className="register__rows">
                    <label htmlFor="name">
                        Имя
                    </label>
                    <input id="name" name="name" type="text" className="register__text"
                           value={data.name} />
                    <label htmlFor="email">
                        E-mail
                    </label>
                    <input id="email" name="email" type="email" className="register__text"
                           value={data.email}/>
                    <label htmlFor="password">
                        Пароль
                    </label>
                    <input id="password" name="password" type="password" className="register__text"
                           value={data.password} />
                </div>
                <button type="submit" className="register__button">Зарегистрироваться</button>
            </form>

            <div className="register__signin">
                <p>Уже зарегистрированы?</p>
                <Link to="/signin" className="register__login-link">Войти</Link>
            </div>
        </div>
    );
}

export default Register;
