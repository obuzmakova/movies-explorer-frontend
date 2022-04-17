import React, {useState} from 'react';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import './MoviesCard.css'

function MoviesCard(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [saved, setSaved] = React.useState(false);
    const alreadyMoviesSaved = props.savedMovies.find((movie) => movie.nameRU === props.movie.nameRU && movie.owner === currentUser._id);
    const cardSaveButtonClassName = (`card__save ${saved ? 'card__save_active' : 'card__save'}`);
    const calcDuration = checkDuration(props.movie.duration);

    React.useEffect(() => {
        if (alreadyMoviesSaved) {
            setSaved(true);
        }
    }, [alreadyMoviesSaved])

    function handleCardSave() {
        debugger;
        props.handleSave(props.movie);
    }

    function checkDuration(duration) {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;

        if (hours > 0 && minutes > 0) {
            return hours + `ч ` + minutes + `м`;
        } else if (hours > 0) {
            return hours + `ч`;
        } else {
            return minutes + `м`
        }
    }

    return (
        <div className="card">
            <div className="card__description">
                <a className="card__title" href={props.movie.trailerLink} target="_blank">
                    <p className="card__film-name">{props.movie.nameRU}</p>
                    <p className="card__film-duration">{calcDuration}</p>
                </a>
                {props.isSaved ? <button type="button" className="card__delete"/>
                    : <button type="button" onClick={handleCardSave} className={cardSaveButtonClassName}/>}
            </div>
            <a href={props.movie.trailerLink} target="_blank">
                <img className="card__photo" src={`https://api.nomoreparties.co/` + props.movie.image.url} alt={props.movie.nameRU}/>
            </a>
        </div>
    );
}

export default MoviesCard;
