import React from 'react';
import { Container } from './Main';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../actions';
import Modal from '../components/modal/Modal';
import ConfirmSurvey from '../components/ConfirmSurvey';

const Submission = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const params = useParams();
  // const id = params.id;
  const { id } = useParams();
  const { forms } = useSelector(state => ({
    forms: state.form.forms,
  }));
  const { modal } = useSelector(state => ({
    modal: state.modal.isModalShown,
  }));
  console.log(modal);
  const filteredSurvey = forms.filter(obj => {
    return obj.formId === Number(id);
  });
  const submitData = filteredSurvey[0].submitData;
  // console.log(submitData);

  return (
    <Container>
      <Title>제출 목록</Title>
      <SurveyCount>응답 n개</SurveyCount>
      {submitData.map((obj, index) => (
        <SurveyItem key={index} onClick={() => dispatch(openModal())}>
          {index + 1 + '. ' + '설문답변'}
        </SurveyItem>
      ))}
      {modal ? (
        <Modal>
          <ConfirmSurvey></ConfirmSurvey>
        </Modal>
      ) : null}
      <SummitButton
        onClick={() => {
          navigate('/');
        }}
      >
        확인
      </SummitButton>
    </Container>
  );
};

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 40px;
  text-align: center;
`;

const SurveyCount = styled.p`
  margin-bottom: 20px;
`;

const SurveyItem = styled.div`
  height: 50px;
  background-color: #eee;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 10px 24px;
  border-radius: 6px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const SummitButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff3355;
  border-radius: 8px;
  border: 1px solid #f1f3f5;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  padding: 4px 16px;
  text-align: center;
  height: 40px;
`;

export default Submission;
