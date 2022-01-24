import React from 'react';

function MenuPopup(props) {
    return (
        <div className={`popup ${props.isOpen ? `popup_opened` : ""}`}>

        </div>
    );
}

export default MenuPopup;
