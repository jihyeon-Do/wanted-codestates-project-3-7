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
      {description && <p>{description}</p>}
      <InputField
        type="text"
        name="name"
        value={name}
        placeholder={placeholder}
        onChange={e => onChangeInputValues(e, required)}
      />
      {nameMessage.length > 0 && (
        <InputSummitingLabel isSubmitting={isSubmitting}>
          {nameMessage}
        </InputSummitingLabel>
      )}
    </Wrapper>
  );
};

NameField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  nameMessage: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  description: PropTypes.string,
  onChangeInputValues: PropTypes.func,
  isSubmitting: PropTypes.bool,
};
