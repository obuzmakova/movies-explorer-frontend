import React from 'react';
import './NavTab.css';

function NavTab() {
    return (
        <nav className="nav">
            <button className="nav__button">О проекте</button>
            <button className="nav__button">Технологии</button>
            <button className="nav__button">Студент</button>
        </nav>
    );
}

export default NavTab;