import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';
import './Header.css';

function Header(props) {
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 768;

    React.useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        // subscribe to window resize event "onComponentDidMount"
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            // unsubscribe "onComponentDestroy"
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);
    if (props.filmText && width <= breakpoint) {
        return (
            <header className="header">
                <div className="header__logo-nav">
                    <img className="header__logo" alt="Логотип в виде зеленого круга с дыркой по центру" src={headerLogo}/>
                </div>
                <nav className="header__logo-nav">
                    {props.accountText ? <button className="header__account-logo" onClick={props.onOpenMenu}/> : null}
                </nav>
            </header>
        );
    } else {
        return (
            <header className="header">
                <div className="header__logo-nav">
                    <img className="header__logo" alt="Логотип в виде зеленого круга с дыркой по центру" src={headerLogo}/>
                    {props.filmText ? <NavLink to="/movies" activeClassName="header__link_active"
                                               className="header__link">{props.filmText}</NavLink> : null}
                    {props.saveFilmText ? <NavLink to="/saved-movies" activeClassName="header__link_active"
                                                   className="header__link">{props.saveFilmText}</NavLink> : null}
                </div>
                <nav className="header__logo-nav">
                    {props.regText ? <Link to="/signup" className="header__link">{props.regText}</Link> : null}
                    {props.authText ? <Link to="/signin" className="header__button">{props.authText}</Link> : null}
                    {props.accountText ? <Link to="/profile" activeClassName="header__link_active"
                                               className="header__link">{props.accountText}</Link> : null}
                    {props.accountText ? <Link to="/profile" className="header__account-logo"/> : null}
                </nav>
            </header>
        );
    }
}

export default Header;
