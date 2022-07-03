import React, {useState} from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';
import searchIcon from "../../images/search-icon.svg";

function SearchForm(props) {
    const [data, setData] = useState('');
    const [error, setError] = useState('');

    function handleChange(e) {
        props.setSearchValue(e.target.value);
        props.clearAllError();
        setError('');
        setData(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!data) {
            props.handleEmptySearch();
            return;
        }

        const searchValue = data.replace(/\s/g, '');
        if (!searchValue) {
            setError("Нужно ввести ключевое слово");
            return;
        }
        props.handleSearch(data);
    }

    return (
        <div className="search">
            <form onSubmit={handleSubmit} className="search__area">
                <img className="search__icon" alt="Лупа" src={searchIcon}/>
                <input id="search" onChange={handleChange} placeholder="Фильм" className="search__text" required type="text" value={props.searchValue} />
                <button type="submit" className="search__button" onClick={handleSubmit}/>
            </form>
            <FilterCheckbox isChecked={props.isChecked} handleChange={props.handleChange}/>
            {error || props.error ? <span className="search__text-error">{error || props.error}</span> : null}
        </div>
    );
}

export default SearchForm;
