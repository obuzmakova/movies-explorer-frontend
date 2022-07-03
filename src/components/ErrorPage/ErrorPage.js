import React from 'react';
import { useHistory } from 'react-router-dom';
import './ErrorPage.css'

function ErrorPage() {
    const history = useHistory();

    return (
        <div className="error">
            <p className="error__title">404</p>
            <p className="error__text">Страница не найдена</p>
            <button onClick={() => history.goBack()} className="error__back-link">Назад</button>
        </div>
    );
}

export default ErrorPage;
