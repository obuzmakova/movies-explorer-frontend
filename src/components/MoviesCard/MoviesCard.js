import React, {useState} from 'react';
import './MoviesCard.css'

function MoviesCard(props) {
    const [savedCard, setCardSaved] = useState(false);

    function handleCardSave() {
        setCardSaved(!savedCard);
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

    const cardSaveButtonClassName = (
        `card__save ${savedCard ? 'card__save_active' : 'card__save'}`
    );

    const calcDuration = checkDuration(props.duration);

    return (
        <div className="card">
            <div className="card__description">
                <div className="card__title">
                    <p className="card__film-name">{props.name}</p>
                    <p className="card__film-duration">{calcDuration}</p>
                </div>
                {props.isSaved ? <button type="button" className="card__delete"/>
                    : <button type="button" onClick={handleCardSave} className={cardSaveButtonClassName}/>}
            </div>
            <img className="card__photo" src={props.image} alt={props.name}/>
        </div>
    );
}

export default MoviesCard;
