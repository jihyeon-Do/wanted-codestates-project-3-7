import React from 'react';
import styled from 'styled-components';

const ConfirmSurvey = obj => {
  console.log(obj);
  return (
    <ModalWrap>
      <p>내용 확인</p>
      {/* ModalContent를 필드 1개로 보고 map으로 출력 */}
      <ModalContent>
        <FieldTitle>필드 제목</FieldTitle>
        <FieldContent>내용</FieldContent>
      </ModalContent>
      <ModalContent>
        <FieldTitle>필드 제목</FieldTitle>
        <FieldContent>내용</FieldContent>
      </ModalContent>
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

export default ConfirmSurvey;
