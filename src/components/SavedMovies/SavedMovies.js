import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies(props) {
    return (
        <div>
            <SearchForm isChecked={props.isChecked} handleChange={props.handleChange} handleSearch={props.handleSearch} error={props.error}
                        handleEmptySearch={props.handleEmptySearch} clearAllError={props.clearAllError} searchValue={props.searchValue}
                        setSearchValue={props.setSearchValue}/>
            <MoviesCardList movies={props.movies} isSaved={true} handleButtonClick={props.handleButtonClick} />
        </div>
    );
}

export default SavedMovies;
