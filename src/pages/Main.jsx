import React from 'react';
import styled from 'styled-components';
import { HiPlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import FormListItem from '../components/FormListItem';
import { useSelector } from 'react-redux';

const Main = () => {
  const navigate = useNavigate();

  const { forms } = useSelector(state => ({
    forms: state.form.forms,
  }));

  return (
    <Container>
      <Title>최근 설문지</Title>
      <PlusBtn
        onClick={() => {
          navigate('/forms/editor');
        }}
      >
        <HiPlus size="30" color="#fff"></HiPlus>
      </PlusBtn>

      {/* map으로 list 가져오기 */}
      {forms.map((obj, index) => {
        return <FormListItem obj={obj} key={index}></FormListItem>;
      })}
    </Container>
  );
};

export const Container = styled.div`
  margin: 0 auto;
  width: 428px;
  padding: 20px;
  /* background-color: #f7f7f7; */
  position: relative;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 40px;
`;

const PlusBtn = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #ff3355;
  position: absolute;
  top: 10px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :hover {
    background-color: #fa778d;
  }
`;

export default Main;
