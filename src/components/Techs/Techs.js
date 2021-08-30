import './Techs.css';
import React from "react";

function Techs() {
    return (
        <section className="techs">
            <div className="techs__title">
                <h2 className="techs__title-text">Технологии</h2>
            </div>
            <div className="techs__content">
                <h3 className="techs__text">7 технологий</h3>
                <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </div>
            <ul className="techs__stack">
                <li className="techs__item">HTML</li>
                <li className="techs__item">CSS</li>
                <li className="techs__item">JS</li>
                <li className="techs__item">React</li>
                <li className="techs__item">Git</li>
                <li className="techs__item">Express.js</li>
                <li className="techs__item">mongoDB</li>
            </ul>
        </section>
    );
}

export default Techs;