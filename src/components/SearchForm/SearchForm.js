import React from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';
import searchIcon from "../../images/search-icon.svg";

function SearchForm(props) {
    return (
        <div className="search">
            <div className="search__area">
                <img className="search__icon" alt="Лупа" src={searchIcon}/>
                <input placeholder="Фильм" className="search__text" required/>
                <button className="search__button"/>
            </div>
            <FilterCheckbox isChecked={props.isChecked} handleChange={props.handleChange}/>
        </div>
    );
}

export default SearchForm;
