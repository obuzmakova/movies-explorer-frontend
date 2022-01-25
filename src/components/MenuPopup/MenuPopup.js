import React from 'react';
import './MenuPopup.css';
import {Link, NavLink} from "react-router-dom";

function MenuPopup(props) {
    return (
        <div className={`popup ${props.isOpen ? `popup_opened` : ""}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={props.onClose}/>
                <nav className="popup__pages-nav">
                    <NavLink onClick={props.onClose} exact to="/" activeClassName="popup__link_active" className="popup__link">Главная</NavLink>
                    <NavLink onClick={props.onClose} to="/movies" activeClassName="popup__link_active" className="popup__link">Фильмы</NavLink>
                    <NavLink onClick={props.onClose} to="/saved-movies" activeClassName="popup__link_active" className="popup__link">Сохраненные фильмы</NavLink>
                </nav>
                <nav className="popup__account-nav">
                    <NavLink onClick={props.onClose} to="/profile" activeClassName="popup__link_active" className="popup__link popup__link-account">Аккаунт</NavLink>
                    <Link onClick={props.onClose} to="/profile" className="popup__account-logo"/>
                </nav>
            </div>
        </div>
    );
}

export default MenuPopup;
