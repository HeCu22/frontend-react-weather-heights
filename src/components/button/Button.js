import React from 'react';
import './Button.css';

function Button({children, clickHandler, isDisabled, fieldClass}) {
    return (
        <button className={fieldClass}
                type="button"
                disabled={isDisabled}
                onClick={clickHandler}>
            {children}
        </button>);
}

export default Button;