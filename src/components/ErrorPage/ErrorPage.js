import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css'

function ErrorPage() {
    return (
        <div className="error">
            <p className="error__title">404</p>
            <p className="error__text">Страница не найдена</p>
            <Link to="/" className="error__back-link">Назад</Link>
        </div>
    );
}

export default ErrorPage;
