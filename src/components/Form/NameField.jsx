import React from 'react';
import { Wrapper, InputField, InputSummitingLabel } from './Shared';
import PropTypes from 'prop-types';

export const NameField = ({
  name,
  onChangeInputValues,
  isSubmitting,
  nameMessage,
}) => {
  return (
    <Wrapper>
      <h2>이름</h2>
      <br />
      <InputField
        type="text"
        name="name"
        placeholder="주민등록상이름"
        value={name}
        onChange={onChangeInputValues}
      />
      {name.length > 0 && (
        <InputSummitingLabel isSubmitting={isSubmitting}>
          {nameMessage}
        </InputSummitingLabel>
      )}
    </Wrapper>
  );
};

NameField.propTypes = {
  name: PropTypes.string,
  onChangeInputValues: PropTypes.func,
  isSubmitting: PropTypes.bool,
  nameMessage: PropTypes.string,
};
