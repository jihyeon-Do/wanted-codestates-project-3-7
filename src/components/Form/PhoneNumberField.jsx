import React from 'react';
import styled from 'styled-components';
import {
  Wrapper,
  InputField,
  InputSummitingLabel,
} from './Shared';
import PropTypes from 'prop-types';

export const PhoneNumberField = ({
  phoneNumber,
  onChangeInputValues,
  isSubmitting,
  phoneMessage,
}) => {
  return (
    <Wrapper>
      <h2>휴대폰번호</h2>
      <br />
      <InputField
        type="text"
        name="phoneNumber"
        value={phoneNumber}
        onChange={onChangeInputValues}
      />
      {phoneNumber.length > 0 && (
          <InputSummitingLabel isSubmitting={isSubmitting}>
            {phoneMessage}
          </InputSummitingLabel>
        )}
    </Wrapper>
  );
};

PhoneNumberField.propTypes = {
  phoneNumber: PropTypes.string,
  onChangeInputValues: PropTypes.func,
  isSubmitting: PropTypes.bool,
  phoneMessage: PropTypes.string,
};
