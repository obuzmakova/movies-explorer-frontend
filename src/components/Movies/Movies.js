import React from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from "../SearchForm/SearchForm";
import Preloader from '../Preloader/Preloader';

function Movies(props) {
    return (
        <div>
            <SearchForm isChecked={props.isChecked} handleChange={props.handleChange} handleSearch={props.handleSearch} error={props.error}
                        clearAllError={props.clearAllError} handleEmptySearch={props.handleEmptySearch} searchValue={props.searchValue}
                        setSearchValue={props.setSearchValue}/>
            <MoviesCardList movies={props.movies} savedMovies={props.savedMovies} handleButtonClick={props.handleButtonClick}
                            isSaved={false}/>
            {props.preload ? <Preloader/> : null}
            {props.fail ? <p>{props.fail}</p> : null}
        </div>
    );
}

export default Movies;
