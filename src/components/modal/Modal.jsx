import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { closeModal } from '../../actions/index';
import { AiOutlineClose } from 'react-icons/ai';
import PropTypes from 'prop-types';

const Modal = props => {
  // console.log(children);
  const PreventModalOff = e => {
    e.stopPropagation();
  };
  const dispatch = useDispatch();

  return (
    <>
      <Background onClick={() => dispatch(closeModal())}>
        <ContentsWrap onClick={PreventModalOff}>{props.children}</ContentsWrap>
      </Background>
      <CloseBtnWrap>
        <AiOutlineClose onClick={() => dispatch(closeModal())} />
      </CloseBtnWrap>
    </>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;
const ContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 428px;
  height: 100%;
  padding: 16px;
  border-radius: 10px;
  text-align: center;
  z-index: 1000;
`;

const CloseBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 30px;
  height: 30px;
  right: -30px;
  top: 150px;
  background-color: #dcdcdc;
  border: none;
  border-radius: 50%;
  &:hover {
    background-color: #d3959b;
  }
  z-index: 1000;
`;

Modal.propTypes = {
  children: PropTypes.node,
};

export default Modal;
