import React from 'react';
import './inputSelect.scss';

const Select = ({ name, label, options, idName, error, ...rest }) => {
    return (
      <div className="form-group-select">
        <div className="select-input d-flex align-items-center">
          <label htmlFor={name}>{label}: <span className="obligation-mark">*</span></label>
          <select name={name} id={name} {...rest} className="form-control">
            {options.map((option,index) => (
              <option key={index} value={option[idName]}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        {error && <div className="valid-feedback">{error}</div>}
      </div>
    );
  };

export default Select; 