import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ConfirmSurvey = ({ filteredSurvey, target }) => {
  return (
    <ModalWrap>
      <ModalTitle>내용 확인</ModalTitle>
      {filteredSurvey[0].fields.map((obj, index) => {
        return (
          <ModalContent key={index}>
            <FieldTitle>{obj.label}</FieldTitle>
            <FieldContent>
              {target[obj.id] === true ? '약관 동의' : target[obj.id]}
            </FieldContent>
            <Line></Line>
          </ModalContent>
        );
      })}
    </ModalWrap>
  );
};

const ModalWrap = styled.div`
  margin: 0 auto;
  width: 400px;
  background-color: #fff;
  z-index: 3;
  padding: 20px;
  position: absolute;
  top: 20vh;
  border-radius: 6px;
`;

const ModalTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ModalContent = styled.div`
  width: 100%;
  margin-bottom: 18px;
`;

const Line = styled.div`
  background-color: #ccc;
  height: 1px;
`;

const FieldTitle = styled.p`
  text-align: left;
  font-size: 14px;
  color: #777;
`;

const FieldContent = styled.p`
  text-align: left;
  margin: 8px 0 10px 10px;
  padding: 4px;
  color: #222;
`;

ConfirmSurvey.propTypes = {
  filteredSurvey: PropTypes.array,
  target: PropTypes.object,
};
export default ConfirmSurvey;
