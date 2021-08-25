import React from 'react';
import headerLogo from '../../images/header-logo.svg';

function Header(props) {
    return (
        <div className="header">
            <img className="header__logo" alt="Логотип в виде зеленого круга с дыркой по центру" src={headerLogo}/>
            {/*<div className="header__auth-info">*/}
            {/*    {props.handleLogout ? <p className="header__email">{props.userData.email}</p> : null}*/}
            {/*    {props.handleLogout ? <button onClick={props.handleLogout} className="header__link">{props.text}</button> :*/}
            {/*        <Link to={props.direction} className="header__link">{props.text}</Link>}*/}
            {/*</div>*/}
        </div>
    );
}

export default Header;