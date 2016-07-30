import React, { PropTypes } from 'react';
import css from './styles.css';
import classNames from 'classnames';
import TextField from 'material-ui/TextField';

const TextInput = ({ name, label, onChange, placeholder, value, error }) => {
  const wrapperClass = classNames([css.formGroup],
                                 { [css.hasError]: error && error.length > 0 });
  return (
    <TextField />
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className={css.field}>
        <input
          type="text"
          name={name}
          className={css.formControl}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className={css.error}>{error}</div>}
      </div>
    </div>
  );
};

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
};

export default TextInput;
