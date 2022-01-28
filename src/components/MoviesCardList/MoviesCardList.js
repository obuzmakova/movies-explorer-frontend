import React from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import film from "../../images/film.jpg"

function MoviesCardList() {
    return (
        <div className="content">
            <div className="content__elements">
                <MoviesCard name="33 слова о дизайне" duration="1ч 47м" image={film}/>
                <MoviesCard name="33 слова о дизайне" duration="1ч 47м" image={film}/>
                <MoviesCard name="33 слова о дизайне" duration="1ч 47м" image={film}/>
                <MoviesCard name="33 слова о дизайне" duration="1ч 47м" image={film}/>
            </div>
            <button className="content-more__button">Ещё</button>
        </div>
    );
}

export default MoviesCardList;
