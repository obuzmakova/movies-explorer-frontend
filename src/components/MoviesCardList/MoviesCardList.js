import React, {useState} from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    const breakpointMiddle = 768;
    const width = window.innerWidth;
    const [showMovies, setShowMovies] = useState((width > breakpointMiddle) ? 12 : ((width === breakpointMiddle) ? 8 : 5));

    function handleShow() {
        if (window.innerWidth > breakpointMiddle) {
            setShowMovies(Math.min(props.movies.length, showMovies + 3));
        } else {
            setShowMovies(Math.min(props.movies.length, showMovies + 2));
        }
    }

    return (
        <div className="content">
            <div className="content__elements">
                {(props.movies).slice(0, showMovies).map((movie) => (<MoviesCard key={movie.id} isSaved={props.isSaved} name={movie.nameRU}
                                                          duration={movie.duration}
                                                          image={`https://api.nomoreparties.co/` + movie.image.url}/>))}
            </div>
            {!props.isSaved && props.movies.length > showMovies ?
                <button className="content__more" onClick={handleShow}>Ещё</button> : null}
        </div>
    );
}

export default MoviesCardList;
