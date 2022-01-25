import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox(props) {
    return (
        <label className="filter">
            <input className="filter__checkbox" type="checkbox" defaultChecked={props.isChecked} onChange={props.handleChange} />
            <div className="filter__slider"/>
            <p className="filter__text">Короткометражки</p>
        </label>
    );
}

export default FilterCheckbox;
