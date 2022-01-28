import React, {useState} from 'react';
import './MoviesCard.css'

function MoviesCard(props) {
    const [savedCard, setCardSaved] = useState(false);

    function handleCardSave() {
        setCardSaved(!savedCard);
    }

    const cardSaveButtonClassName = (
        `card__save ${savedCard ? 'card__save_active' : 'card__save'}`
    );

    return (
        <div className="card">
            <div className="card__description">
                <div className="card__title">
                    <p className="card__film-name">{props.name}</p>
                    <p className="card__film-duration">{props.duration}</p>
                </div>
                <button type="button" onClick={handleCardSave} className={cardSaveButtonClassName}/>
            </div>
            <img className="card__photo" src={props.image} alt={props.name}/>
        </div>
    );
}

export default MoviesCard;
