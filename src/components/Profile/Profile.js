import React, {useState} from 'react';
import './Profile.css';
import '../Register/Register.css';
import {CurrentUserContext} from '../../context/CurrentUserContext';

function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [data, setData] = useState({
        name: currentUser.name,
        email: currentUser.email,
        disable: true
    })

    function handleChange(e) {
        const {name, value} = e.target;

        setData({
            ...data,
            [name]: value
        })
    }

    function handleEdit(e) {
        e.preventDefault();
        props.setUpdateStatus("");
        props.setUpdateFail("");

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
                    {props.updateFail ? <span className="register__error">{props.updateFail}</span> : null}
                    {props.updateStatus ? <span className="profile__success">{props.updateStatus}</span> : null}
                </div>
                {data.disable ? <button type="submit" className="profile__button profile__button-submit"
                                        onClick={handleEdit}>Редактировать</button> :
                    <button type="submit" className="profile__button profile__button-save" onClick={handleSubmit}>Сохранить</button>
                }
            </form>
            {data.disable ? <button className="profile__button profile__button-exit" onClick={props.handleLogout}>Выйти из аккаунта</button> : null}
        </div>
    );
}

export default Profile;
