import React from 'react';
import './textArea.scss';

const TextArea = ({label, name, error, value, ...rest}) => {
    return ( 
        <div className="text-area d-flex">
            {label && <label htmlFor={name}>{label}: </label>}
            <textarea name={name} id={name} value={value || ""} {...rest} required/>
            {error && <div className="valid-feedback">{error}</div>}
        </div>
     );
}

export default TextArea;