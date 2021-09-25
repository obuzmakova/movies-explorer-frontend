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
                {props.regText ? <button className="header__link">{props.regText}</button> : null}
                {props.authText ? <button className="header__button">{props.authText}</button> : null}
                {props.account ? <button className="header__link">{props.account}</button> : null}
                {props.account ? <img className="header__account-logo"/> : null}
            </nav>
        </header>
    );
}

export default Header;