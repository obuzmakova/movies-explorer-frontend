import React from 'react';
import myPhoto from '../../images/my-photo.jpg';
import './AboutMe.css';
import portfolioArrow from "../../images/portfolio-arrow.svg"

function AboutMe() {
    return (
        <section id="aboutMe" className="me">
            <div className="me__title about__title">
                <h2 className="me__title-text about__title-text">Студент</h2>
            </div>
            <div className="me__about">
                <div className="me__description">
                    <h3 className="me__name">Ольга</h3>
                    <p className="me__occupation">Фронтенд-разработчик, 30 лет</p>
                    <p className="me__text">Я живу в Москве, закончила факультет коммерции и логистики СПбГУЭФ. С 2019 года студентка школы программирования "Школа 21". C 2021 работаю фронтендером в Сбере.</p>
                    <nav className="me__links">
                        <a className="me__link" href="https://www.facebook.com/o.buzmakova/" target="_blank" rel="noreferrer">Facebook</a>
                        <a className="me__link" href="https://github.com/obuzmakova" target="_blank" rel="noreferrer">Github</a>
                    </nav>
                </div>
                <img className="me__photo" alt="Фото студента" src={myPhoto}/>
            </div>
            <h4 className="me__portfolio">Портфолио</h4>
            <nav className="me__portfolio-links">
                <a className="me__portfolio-link" href="https://github.com/obuzmakova/how-to-learn" target="_blank" rel="noreferrer">
                    <p className="me__portfolio-text">Статичный сайт</p>
                    <img className="me__portfolio-arrow" alt="Стрелка, ведущая по ссылке" src={portfolioArrow}/>
                </a>
                <a className="me__portfolio-link" href="https://obuzmakova.github.io/russian-travel/" target="_blank" rel="noreferrer">
                    <p className="me__portfolio-text">Адаптивный сайт</p>
                    <img className="me__portfolio-arrow" alt="Стрелка, ведущая по ссылке" src={portfolioArrow}/>
                </a>
                <a className="me__portfolio-link" href="https://places.nomoredomains.rocks/" target="_blank" rel="noreferrer">
                    <p className="me__portfolio-text">Одностраничное приложение</p>
                    <img className="me__portfolio-arrow" alt="Стрелка, ведущая по ссылке" src={portfolioArrow}/>
                </a>
            </nav>
        </section>
    );
}

export default AboutMe;