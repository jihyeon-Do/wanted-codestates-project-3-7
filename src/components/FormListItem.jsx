import React from 'react';
import styled from 'styled-components';
import { deleteForm } from '../actions';
import { useNavigate } from 'react-router-dom';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { useDispatch } from 'react-redux';

const formListItem = ({ obj }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteItem = Id => {
    dispatch(deleteForm(Id));
  };

  return (
    <SurveyList>
      <TitleWrap onClick={() => navigate(`/forms/${obj.formId}`)}>
        <HiOutlineDocumentText color="#fff" size="50"></HiOutlineDocumentText>
        <SurveyTitle>{obj.title}</SurveyTitle>
      </TitleWrap>
      <BtnWrap>
        <SurveyBtn
          onClick={() => {
            navigate(`/forms/${obj.formId}/submission`);
          }}
        >
          제출목록
        </SurveyBtn>
        <SurveyBtn
          onClick={() => {
            deleteItem(obj.formId);
          }}
        >
          삭제
        </SurveyBtn>
      </BtnWrap>
    </SurveyList>
  );
};

const SurveyList = styled.div`
  width: 100%;
  height: 110px;
  /* border: 1px solid #333; */
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  margin-bottom: 15px;
`;

const TitleWrap = styled.div`
  height: 60px;
  background-color: #ddd;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
`;

const SurveyTitle = styled.div`
  margin-left: 16px;
  max-width: 320px;
  font-size: 18px;
`;

const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const SurveyBtn = styled.button`
  border: none;
  background-color: #fff;
  height: 24px;
  cursor: pointer;
  margin-left: 12px;
  color: #666;
`;

export default formListItem;
