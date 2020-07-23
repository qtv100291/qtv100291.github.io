import React from 'react';
import './inputElementType1.scss';

const InputElementType1 = ({label, name, error, width,value, ...rest}) => {
    return ( 
        <div className="input-group">
            {label && <label htmlFor={name}>{label}</label>}
            <input name={name} id={name} value={value || ""} {...rest} style={{width : `${width}`}} required/>
            {error && <div className="error-notification">{error}</div>}
        </div>
     );
}

export default InputElementType1;

    
