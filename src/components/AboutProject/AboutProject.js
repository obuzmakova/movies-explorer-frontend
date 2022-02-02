import React from 'react';
import './AboutProject.css';

function AboutProject() {
    return (
        <section id="aboutProject" className="about">
            <div className="about__title">
                <h2 className="about__title-text">О проекте</h2>
            </div>
            <div className="about__content">
                <h3 className="about__text">Дипломный проект включал 5 этапов</h3>
                <p className="about__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <h3 className="about__text">На выполнение диплома ушло 5 недель</h3>
                <p className="about__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className="about__graph">
                <p className="about__period">1 неделя</p>
                <p className="about__period">4 недели</p>
                <p className="about__description">Back-end</p>
                <p className="about__description">Front-end</p>
            </div>
        </section>
    );
}

export default AboutProject;
