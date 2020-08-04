import React from 'react';
import './inputElementType3.scss';

const InputElementType3 = ({label, name, error, value, ...rest}) => {
    return ( 
        <div className="input-group-type-3">
            {label && <label htmlFor={name}>{label}: <span className="obligation-mark">*</span></label>}
            <input name={name} id={name} value={value || ""} {...rest} required/>
            {error && <div className="valid-feedback">{error}</div>}
        </div>
     );
}

export default InputElementType3;