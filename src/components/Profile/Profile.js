import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile(props) {
    const [data, setData] = useState({
        name: 'Ольга',
        email: 'olga@yandex.ru',
        disable: true,
        buttonText: 'Редактировать',
        buttonExitText: 'Выйти из аккаунта'
    })

    function handleEdit(e) {
        e.preventDefault();


    }

    return (
        <div className="profile">
            <p className="profile__welcome">
                Привет, {data.name}!
            </p>
            <form onSubmit={handleEdit}>
                <div className="profile__rows">
                    <div className="profile__row">
                        <label htmlFor="name">
                            Имя
                        </label>
                        <input id="name" name="name" type="text" className="profile__text"
                               value={data.name} disabled={data.disable}/>
                    </div>
                    <div className="profile__line"/>
                    <div className="profile__row">
                        <label htmlFor="email">
                            E-mail
                        </label>
                        <input id="email" name="email" type="email" className="profile__text"
                               value={data.email} disabled={false}/>
                    </div>
                </div>
                <button type="submit" className="profile__button">{data.buttonText}</button>
            </form>

            <Link to="/signin" className="profile__exit-link">Выйти из аккаунта</Link>
        </div>
    );
}

export default Profile;
