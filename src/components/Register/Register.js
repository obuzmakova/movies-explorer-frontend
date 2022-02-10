import React, {useState, useCallback} from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import headerLogo from "../../images/header-logo.svg";

function Register(props) {
    const [data, setData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [isValid, setIsValid] = React.useState(false);
    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setData(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setData, setErrors, setIsValid]
    );

    function handleChange(e) {
        const {name, value} = e.target;
        const regexName = /[^-\wа-я\sё]/gi;

        if (name === "name" && regexName.test(value)) {
            setErrors ({
                ...errors,
                [name]: "Имя может содержать только латиницу, кириллицу, пробел или дефис"
            })
            setData({
                ...data,
                [name]: value
            })
            return;
        }
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
        const {email, password, name} = data;
        props.handleRegister({email, password, name});
    }

    return (
        <div className="register">
            <Link to="/">
                <img alt="Логотип в виде зеленого круга с дыркой по центру" src={headerLogo} className="register__logo"/>
            </Link>
            <p className="register__welcome">
                Добро пожаловать!
            </p>
            <form onSubmit={handleSubmit}>
                <div className="register__rows">
                    <label htmlFor="name">
                        Имя
                    </label>
                    <input id="name" name="name" type="text" className="register__text" onChange={handleChange}
                           value={data.name} required/>
                    {errors.name ? <span className="register__error">{errors.name}</span> : null}
                    <label htmlFor="email">
                        E-mail
                    </label>
                    <input id="email" name="email" type="email" className="register__text" onChange={handleChange}
                           value={data.email} required/>
                    {errors.email ? <span className="register__error">{errors.email}</span> : null}
                    <label htmlFor="password">
                        Пароль
                    </label>
                    <input id="password" name="password" type="password" className="register__text" onChange={handleChange}
                           value={data.password} required/>
                </div>
                <button type="submit" className={isValid ? "register__button" : "register__button " +
                    "register__button_inactive"}>Зарегистрироваться</button>
            </form>

            <div className="register__signin">
                <p>Уже зарегистрированы?</p>
                <Link to="/signin" className="register__login-link">Войти</Link>
            </div>
        </div>
    );
}

export default Register;
