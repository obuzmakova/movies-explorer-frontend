import React from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import film from "../../images/film.jpg"

function MoviesCardList(props) {
    return (
        <div className="content">
            <div className="content__elements">
                <MoviesCard isSaved={props.isSaved} name="33 слова о дизайне" duration="1ч 47м" image={film}/>
                <MoviesCard isSaved={props.isSaved} name="33 слова о дизайне" duration="1ч 47м" image={film}/>
                <MoviesCard isSaved={props.isSaved} name="33 слова о дизайне" duration="1ч 47м" image={film}/>
                <MoviesCard isSaved={props.isSaved} name="33 слова о дизайне" duration="1ч 47м" image={film}/>
            </div>
            {props.isSaved ? null : <button className="content-more__button">Ещё</button>}
        </div>
    );
}

export default MoviesCardList;
