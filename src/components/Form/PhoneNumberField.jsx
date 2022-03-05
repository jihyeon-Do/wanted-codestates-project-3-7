import React from 'react';
import {
  Wrapper,
  InputField,
  InputSummitingLabel,
} from './Shared';
import PropTypes from 'prop-types';

export const PhoneNumberField = ({
  label,
  placeholder,
  required,
  description,
  phoneNumber,
  onChangeInputValues,
  isSubmitting,
  phoneMessage,
}) => {
  return (
    <Wrapper>
      <h2>{label}</h2>
      <br />
      <InputField
        type="text"
        name="phoneNumber"
        value={phoneNumber}
        onChange={(e) => onChangeInputValues(e, required)}
        placeholder={placeholder}
      />
      {description}
      {phoneNumber.length > 0 && (
          <InputSummitingLabel isSubmitting={isSubmitting}>
            {phoneMessage}
          </InputSummitingLabel>
        )}
    </Wrapper>
  );
};

PhoneNumberField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder:PropTypes.string,
  required:PropTypes.bool,
  description:PropTypes.string,
  phoneNumber: PropTypes.string,
  onChangeInputValues: PropTypes.func,
  isSubmitting: PropTypes.bool,
  phoneMessage: PropTypes.string,
};
