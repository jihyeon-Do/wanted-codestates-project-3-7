import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ConfirmSurvey = ({ filteredSurvey, target }) => {
  return (
    <ModalWrap>
      <p>내용 확인</p>

      {filteredSurvey[0].fields.map((obj, index) => {
        return (
          <ModalContent key={index}>
            <FieldTitle>{obj.label}</FieldTitle>
            <FieldContent>{target[obj.id]}</FieldContent>
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

const ModalContent = styled.div`
  width: 100%;
  background-color: #eee;
`;

const FieldTitle = styled.p`
  text-align: left;
  font-size: 14px;
  color: #333;
`;

const FieldContent = styled.p`
  text-align: left;
  margin: 8px 0 10px 10px;
  padding: 4px;
`;
ConfirmSurvey.propTypes = {
  filteredSurvey: PropTypes.array,
  target: PropTypes.object,
};
export default ConfirmSurvey;
