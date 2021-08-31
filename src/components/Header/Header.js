import React from 'react';
import headerLogo from '../../images/header-logo.svg';
import './Header.css';

function Header(props) {
    return (
        <header className="header">
            <div className="header__logo-nav">
                <img className="header__logo" alt="Логотип в виде зеленого круга с дыркой по центру" src={headerLogo}/>
                {props.filmText ? <a href="#" className="header__link">{props.filmText}</a> : null}
                {props.saveFilmText ? <a href="#" className="header__link">{props.saveFilmText}</a> : null}
            </div>
            <nav className="header__logo-nav">
                <button className="header__link">{props.regText}</button>
                <button className="header__button">{props.authText}</button>
            </nav>
        </header>
    );
}

export default Header;