import React from 'react';
import './radioInput.scss';

const RadioInput = ({name, id, label, value, error, ...rest}) => {
    console.log(rest)
    return ( 
        <div className="radio-input d-flex align-items-center">
            <input name={name} id={id} value={value} {...rest} type="radio"/>
            {label && <label htmlFor={id}>{label}</label>}
            {error && <div className="valid-feedback">{error}</div>}
        </div>
     );
}

export default RadioInput;