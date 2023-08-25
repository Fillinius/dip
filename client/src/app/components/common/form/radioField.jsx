import React from 'react';
import PropTypes from 'prop-types';

const RadioField = ({ options, name, value, onChange, label }) => {
  return (
    <div className='mb-3'>
      <p>
        <label>{label}</label>
      </p>
      {options.map((floor) => (
        <div key={floor.name + '_' + floor.value} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={floor.name + '_' + floor.value}
            value={floor.value}
            checked={floor.value === value}
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor={floor.name + '_' + floor.value}>{floor.value}</label>
        </div>
      ))}

    </div>
  );
}
RadioField.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string
}

export default RadioField;
