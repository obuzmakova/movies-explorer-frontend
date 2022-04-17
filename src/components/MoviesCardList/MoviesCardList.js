import React, {useState} from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    const breakpointMiddle = 768;
    const [width, setWidth] = React.useState(window.innerWidth);
    const [showMovies, setShowMovies] = useState((width > breakpointMiddle) ? 12 : ((width === breakpointMiddle) ? 8 : 5));

    React.useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        // subscribe to window resize event "onComponentDidMount"
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            // unsubscribe "onComponentDestroy"
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

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
                {(props.movies).slice(0, showMovies).map((movie) => (<MoviesCard key={movie.id}
                                                                                 movie={movie}
                                                                                 savedMovies={props.savedMovies}
                                                                                 handleSave={props.handleSave}
                                                                                 handleDelete={props.handleDelete}
                                                                                 isSaved={props.isSaved} />))}
            </div>
            {props.movies.length > showMovies ?
                <button className="content__more" onClick={handleShow}>Ещё</button> : null}
        </div>
    );
}

export default MoviesCardList;
