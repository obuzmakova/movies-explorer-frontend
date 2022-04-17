import React from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from "../SearchForm/SearchForm";
import Preloader from '../Preloader/Preloader';

function Movies(props) {
    return (
        <div>
            <SearchForm isChecked={props.isChecked} handleChange={props.handleChange} handleSearch={props.handleSearch} error={props.error}
                        clearAllError={props.clearAllError}/>
            <MoviesCardList movies={props.movies} savedMovies={props.savedMovies} handleSave={props.handleSave}/>
            {props.preload ? <Preloader/> : null}
            {props.fail ? <p>{props.fail}</p> : null}
        </div>
    );
}

export default Movies;
