import React from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    return (
        <div className="content">
            <div className="content__elements">
                <MoviesCard name="33 слова о дизайне" duration="1ч 47м"/>
                <MoviesCard name="33 слова о дизайне" duration="1ч 47м"/>
                <MoviesCard name="33 слова о дизайне" duration="1ч 47м"/>
                <MoviesCard name="33 слова о дизайне" duration="1ч 47м"/>
            </div>
            <button className="content-more__button">Ещё</button>
        </div>
    );
}

export default MoviesCardList;
