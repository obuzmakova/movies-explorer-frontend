import React, {useEffect} from 'react';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import './MoviesCard.css'

function MoviesCard(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [saved, setSaved] = React.useState(false);
    const alreadyMoviesSaved = props.savedMovies.find((movie) => movie.nameRU === props.movie.nameRU && movie.owner === currentUser._id);
    const cardSaveButtonClassName = (`card__save ${saved ? 'card__save_active' : 'card__save'}`);
    const calcDuration = checkDuration(props.movie.duration);
    const movie = {
        country: props.movie.country || 'не указана',
        description: props.movie.description || 'не указана',
        director: props.movie.director || 'не указан',
        duration: props.movie.duration || 0,
        image: props.isSaved ? props.movie.image : `https://api.nomoreparties.co${props.movie.image.url}`,
        id: props.isSaved ? props.movie._id : props.movie.id,
        nameRU: props.movie.nameRU || 'не указано',
        nameEN: props.movie.nameEN || 'не указано',
        trailerLink: props.isSaved ? props.movie.trailer : props.movie.trailerLink || 'https://youtube.com',
        year: props.movie.year || 'не указан',
    }

    useEffect(() => {
        if (alreadyMoviesSaved) {
            setSaved(true);
        }
    }, [alreadyMoviesSaved])

    function handleCardSave() {
        const movieInSaved = props.isSaved ? props.savedMovies.find((movie) => movie._id === props.movie._id) :
            props.savedMovies.find((movie) => movie.movieId === props.movie.id);

        if (props.isSaved && saved && movieInSaved) {
            if (props.handleDelete(movieInSaved._id)) {
                setSaved(!saved);
            }
        } else if (!movieInSaved) {
            if (props.handleSave(movie)) {
                setSaved(!saved);
            }
        }
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
                <a className="card__title" href={movie.trailerLink} target="_blank">
                    <p className="card__film-name">{movie.nameRU}</p>
                    <p className="card__film-duration">{calcDuration}</p>
                </a>
                {props.isSaved ? <button type="button" onClick={handleCardSave} className="card__delete"/>
                    : <button type="button" onClick={handleCardSave} className={cardSaveButtonClassName}/>}
            </div>
            <a href={movie.trailerLink} target="_blank">
                <img className="card__photo" src={movie.image} alt={movie.nameRU}/>
            </a>
        </div>
    );
}

export default MoviesCard;
