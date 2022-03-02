import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Wrapper, InputField } from './Shared';
import { openModal } from '../../actions';
import PropTypes from 'prop-types';

export const AddressField = ({fullAddress}) => {
  const dispatch = useDispatch();

  const onClickOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <Wrapper>
      <h2>배송지</h2>
      <br />
      <InputField onClick={() => onClickOpenModal()} value={fullAddress} readOnly/>
    </Wrapper>
  );
};

AddressField.propTypes = {
  fullAddress: PropTypes.string,
};
