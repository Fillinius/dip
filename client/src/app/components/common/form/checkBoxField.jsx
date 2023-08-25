import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CheckBoxField = ({ name, value, onChange, children }) => {
  // const handleChange = () => {
  //   onChange({ name: name, value: !value })
  // }
  const [checked, setCheked] = useState(false)
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  // }
  // console.log(handleSubmit);
  const handleChange = () => {
    setCheked((prev) => !prev)
  }
  return (
    <div className="form-check mb-4">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id={name}
        onChange={handleChange}
        checked={checked} />
      <label className="form-check-label" htmlFor={name}>
        {children}
      </label>
    </div>
  );
}
CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node)], PropTypes.node)
}

export default CheckBoxField;
