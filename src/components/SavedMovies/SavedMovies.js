import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies(props) {
    return (
        <div>
            <SearchForm isChecked={props.isChecked} handleChange={props.handleChange}/>
            <MoviesCardList isSaved={true}/>
        </div>
    );
}

export default SavedMovies;
