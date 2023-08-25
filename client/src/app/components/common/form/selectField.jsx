import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({ label, name, value, onChange, error, options, defaultOption }) => {
  function getSelectClass() {
    return 'form-select' + (error ? ' is-invalid' : '')
  }
  return (
    <div className='mb-3'>
      <label htmlFor={name} className="htmlForm-label">
        {label}
      </label>
      <select
        className={getSelectClass()}
        // required
        value={value}
        onChange={onChange}
        name={name}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  );
}
SelectField.defaultProps = {
  defaultOption: 'Выберите вариант...'
}
SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  defaultOption: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  )
}
export default SelectField;
