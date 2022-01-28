import React from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    return (
        <div className="content">
            <div className="content__elements">
                <MoviesCard onCardSave={props.onCardSave}/>
                <MoviesCard onCardSave={props.onCardSave}/>
                <MoviesCard onCardSave={props.onCardSave}/>
                <MoviesCard onCardSave={props.onCardSave}/>
            </div>
            <button className="content-more__button">Ещё</button>
        </div>
    );
}

export default MoviesCardList;
