import React from 'react';
import headerLogo from '../../images/header-logo.svg';
import './Header.css';

function Header(props) {
    return (
        <div className="header">
            <div className="header__logo-nav">
                <img className="header__logo" alt="Логотип в виде зеленого круга с дыркой по центру" src={headerLogo}/>
                <button className="header__link">{props.filmText}</button>
                <button className="header__link">{props.saveFilmText}</button>
            </div>
            <div className="header__logo-nav">
                <button className="header__link">{props.regText}</button>
                <button className="header__button">{props.authText}</button>
            </div>
        </div>
    );
}

export default Header;