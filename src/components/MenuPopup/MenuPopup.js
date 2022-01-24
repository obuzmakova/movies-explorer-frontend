import React from 'react';
import './MenuPopup.css';
import {Link, NavLink} from "react-router-dom";

function MenuPopup(props) {
    return (
        <div className={`popup ${props.isOpen ? `popup_opened` : ""}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={props.onClose}/>
                <nav className="popup__pages-nav">
                    <NavLink to="/" activeClassName="popup__link_active" className="popup__link">Главная</NavLink>
                    <NavLink to="/movies" activeClassName="popup__link_active" className="popup__link">Фильмы</NavLink>
                    <NavLink to="/saved-movies" activeClassName="popup__link_active" className="popup__link">Сохраненные фильмы</NavLink>
                </nav>
                <Link to="/profile" activeClassName="popup__link_active" className="popup__link">Аккаунт</Link>
                <img className="popup__account-logo" alt="Иконка для аккаунта"/>
            </div>
        </div>
    );
}

export default MenuPopup;
