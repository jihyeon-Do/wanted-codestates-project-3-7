import React from 'react';
import { Wrapper, InputField, InputSummitingLabel } from './Shared';
import PropTypes from 'prop-types';

export const NameField = ({
  label,
  placeholder,
  required,
  description,
  name,
  onChangeInputValues,
  isSubmitting,
  nameMessage,
}) => {
  return (
    <Wrapper>
      <h2>{label}</h2>
      <br />
      <InputField
        type="text"
        name="name"
        placeholder={placeholder}
        value={name}
        onChange={(e) => onChangeInputValues(e, required)}
      />
      {name.length > 0 && (
        <InputSummitingLabel isSubmitting={isSubmitting}>
          {description.replace("\"", "")}
        </InputSummitingLabel>
      )}
    </Wrapper>
  );
};

NameField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder:PropTypes.string,
  required:PropTypes.bool,
  description:PropTypes.string,
  name: PropTypes.string,
  onChangeInputValues: PropTypes.func,
  isSubmitting: PropTypes.bool,
  nameMessage: PropTypes.string,
};
