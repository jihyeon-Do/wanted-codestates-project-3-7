import React from 'react';
import { useDispatch } from 'react-redux';
import { Wrapper, InputField } from './Shared';
import { openModal } from '../../actions';
import PropTypes from 'prop-types';

export const AddressField = ({ fullAddress, description, label }) => {
  const dispatch = useDispatch();

  const onClickOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <Wrapper>
      <h2>{label}</h2>
      {description && <p>{description}</p>}
      <InputField
        onClick={() => onClickOpenModal()}
        value={fullAddress}
        readOnly
      />
    </Wrapper>
  );
};

AddressField.propTypes = {
  label: PropTypes.string,
  fullAddress: PropTypes.string,
  description: PropTypes.string,
};
