import React from 'react';
import styled from 'styled-components';
import { BiCheck } from 'react-icons/bi';
import { Wrapper } from './Shared';
import PropTypes from 'prop-types';

export const CheckField = ({ agreement, isUserAgreement }) => {
  return (
    <Wrapper>
      <Label>
        <LabelContentsWrapper>
          <CheckBoxWrapper>
            <Checkbox type="checkbox" onClick={() => isUserAgreement()} />
            {agreement === false ? (
              <Unchecked />
            ) : (
              <CheckedIconWrapper>
                <BiCheck />
              </CheckedIconWrapper>
            )}
          </CheckBoxWrapper>
          <span>개인정보 수집 약관 동의(필수)</span>
        </LabelContentsWrapper>
      </Label>
    </Wrapper>
  );
};

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LabelContentsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 32px;
  height: 32px;
  margin-right: 10px;
  outline: 2px solid transparent;
  outline-offset: 2px;
  cursor: ponter;
`;

const Checkbox = styled.input`
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 1rem;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const Unchecked = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  padding: 0.25em;
  border: 1px solid rgba(214, 217, 220);
`;

const CheckedIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  padding: 0.25em;
  border-radius: 9999px;
  color: #ff3355;
  fill: #ff3355;
`;

CheckField.propTypes = {
  agreement: PropTypes.bool,
  isUserAgreement: PropTypes.func,
};
