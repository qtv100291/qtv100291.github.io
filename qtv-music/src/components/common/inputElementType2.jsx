import React from 'react';
import './inputElementType2.scss';

const InputElementType2 = ({label, name, error, value, ...rest}) => {
    return ( 
        <div className="input-group-type-2">
            <input name={name} id={name} value={value || ""} {...rest} required/>
            {label && <label htmlFor={name}>{label}</label>}
            {error && <div className="valid-feedback">{error}</div>}
        </div>
     );
}

export default InputElementType2;