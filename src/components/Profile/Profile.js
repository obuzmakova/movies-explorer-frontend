import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile(props) {
    const [data, setData] = useState({
        name: props.name,
        email: props.email,
        disable: true
    })

    const [errors, setErrors] = useState({
        name: '',
        email: ''
    });

    function handleChange(e) {
        const {name, value} = e.target;

        setData({
            ...data,
            [name]: value
        })
        setErrors({
            ...errors,
            [name]: e.target.validationMessage
        });
    }

    function handleEdit(e) {
        e.preventDefault();

        setData({
            ...data,
            ['disable']: false
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        setData({
            ...data,
            ['disable']: true
        })
        const {name, email} = data;
        props.hangleUpdate({name, email})
    }

    return (
        <div className="profile">
            <p className="profile__welcome">
                Привет, {data.name}!
            </p>
            <form onSubmit={handleSubmit}>
                <div className="profile__rows">
                    <div className="profile__row">
                        <label htmlFor="name">
                            Имя
                        </label>
                        <input id="name" name="name" type="text" className="profile__text"
                               value={data.name} disabled={data.disable} onChange={handleChange}/>
                    </div>
                    <div className="profile__line"/>
                    <div className="profile__row">
                        <label htmlFor="email">
                            E-mail
                        </label>
                        <input id="email" name="email" type="email" className="profile__text"
                               value={data.email} disabled={data.disable} onChange={handleChange}/>
                    </div>
                </div>
                {data.disable ? <button type="submit" className="profile__button profile__button-submit"
                                        onClick={handleEdit}>Редактировать</button> :
                    <button type="submit" className="profile__button profile__button-save" onClick={handleSubmit}>Сохранить</button>
                }
            </form>
            {data.disable ? <Link to="/signin" className="profile__button profile__button-exit">Выйти из аккаунта</Link> : null}
        </div>
    );
}

export default Profile;
