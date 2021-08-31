import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__title">
                <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            </div>
            <div className="footer__about">
                <p className="footer__copyright">© 2021</p>
                <div className="footer__links">
                    <a className="footer__link footer__copyright" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                    <a className="footer__link footer__copyright" href="https://github.com/obuzmakova" target="_blank" rel="noreferrer">Github</a>
                    <a className="footer__link footer__copyright" href="https://www.facebook.com/o.buzmakova/" target="_blank" rel="noreferrer">Facebook</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;