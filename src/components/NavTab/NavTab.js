import React from 'react';
import './NavTab.css';

function NavTab() {
    return (
        <nav className="nav">
            <a href="#aboutProject" className="nav__button">О проекте</a>
            <a href="#aboutTechs" className="nav__button">Технологии</a>
            <a href="#aboutMe" className="nav__button">Студент</a>
        </nav>
    );
}

export default NavTab;