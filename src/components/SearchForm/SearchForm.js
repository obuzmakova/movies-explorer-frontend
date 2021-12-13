import React from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';
import searchIcon from "../../images/search-icon.svg";

function SearchForm() {
    return (
        <div className="search">
            <div className="search__input">
                <img className="search__icon" alt="Лупа" src={searchIcon}/>
                {/*TODO id="email" name="email" type="email" placeholder="Email"*/}
                <input placeholder="Фильм" className="search__text"/>
            </div>
            <div className="search__buttons">
                <button className="search__button"/>
                <FilterCheckbox/>
            </div>
        </div>
    );
}

export default SearchForm;
