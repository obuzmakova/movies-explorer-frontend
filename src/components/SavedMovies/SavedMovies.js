import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies(props) {
    return (
        <div>
            <SearchForm isChecked={props.isChecked} handleChange={props.handleChange} handleSearch={props.handleSearch} error={props.error}
                        clearAllError={props.clearAllError}/>
            <MoviesCardList movies={props.movies} isSaved={true} savedMovies={props.savedMovies} handleDelete={props.handleDelete} />
        </div>
    );
}

export default SavedMovies;
