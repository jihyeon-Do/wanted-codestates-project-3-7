import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../components/modal/Modal';
import DaumPost from '../components/DaumPost';
import { closeModal, submitForm } from '../actions';
import { useLocation, useNavigate } from 'react-router-dom';

import { NameField } from '../components/Form/NameField';
import { PhoneNumberField } from '../components/Form/PhoneNumberField';
import { AddressField } from '../components/Form/AddressField';
import { OptionField } from '../components/Form/OptionField';
import { AttachedField } from '../components/Form/AttachedField';
import { CheckField } from '../components/Form/CheckField';

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/');
  const formIdx = Number(path[path.length - 1]);

  const { isModalShown, forms } = useSelector(state => ({
    isModalShown: state.modal.isModalShown,
    forms: state.form.forms,
  }));

  console.log(forms);
  const [inputValues, setInputValues] = useState({
    name: '',
    phoneNumber: '',
    fullAddress: '',
    input1: ['small', 'medium', 'large'],
    agreement: false,
  });
  const [nameMessage, setNameMessage] = useState('');
  const [phoneMessage, setPhoneMessage] = useState('');
  const [selected, setSelected] = useState('');
  const [isAllItemFilled, setIsAllItemFilled] = useState(false);
  const [isOptionHasList, setIsOptionHasList] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { name, phoneNumber, fullAddress, input1, agreement } = inputValues;
  const userId = useRef(0);
  const getTitle = () => {
    let title;
    if (forms.length > 1) {
      title = forms[formIdx - 1].title
    } else {
      title = forms[0].title
    }
    return title;
  }

  const onChangeInputValues = e => {
    const { value, name } = e.target;
    if (name === 'name') {
      if (value.length < 2 || value.length > 5) {
        setNameMessage('2글자 이상 5글자 미만으로 입력해주세요');
      } else {
        setNameMessage('올바른 형식입니다.');
        setIsSubmitting(true);
      }
      setInputValues({
        ...inputValues,
        [name]: value,
      });
    }
    if (name === 'phoneNumber') {
      const regex = /^[0-9\b -]{0,13}$/;
      if (regex.test(e.target.value)) {
        setInputValues({
          ...inputValues,
          [name]: value,
        });
        setIsSubmitting(true);
        setPhoneMessage('올바른 형식입니다.');
      } else {
        setPhoneMessage('숫자로만 입력해주세요');
        setIsSubmitting(false);
      }
    }
  };

  const setAddressKakakoApi = data => {
    setInputValues({
      ...inputValues,
      fullAddress: data,
    });
    setIsSubmitting(true);
    dispatch(closeModal());
  };

  const isUserAgreement = () => {
    setInputValues({
      ...inputValues,
      agreement: !agreement,
    });
    if (isSubmitting === true) {
      return;
    } else {
      setIsSubmitting(!isSubmitting);
    }
  };

  const isOptionCanView = () => {
    setIsOptionHasList(!isOptionHasList);
  };

  const selectClickItemHandler = (item, index) => {
    setSelected(item)
    setInputValues({
      ...inputValues,
      ['selected'] : item,
    });
    setIsSubmitting(true);
    setIsOptionHasList(!isOptionHasList);
  };

  useEffect(() => {
    if (phoneNumber.length === 10) {
      setInputValues({
        ...inputValues,
        phoneNumber: phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
      });
    }
    if (phoneNumber.length === 13) {
      setInputValues({
        ...inputValues,
        phoneNumber: phoneNumber
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      });
    }
  }, [phoneNumber]);

  const IsAllItemSubmitted = () => {
    if (name && phoneNumber && selected && fullAddress && agreement === true) {
      setIsAllItemFilled(true);
    }
  };

  useEffect(() => {
    IsAllItemSubmitted();
  }, [name, phoneNumber, selected, fullAddress, agreement]);

  const onSubmitHandler = e => {
    e.preventDefault();
    dispatch(submitForm(formIdx, inputValues, userId.current));
    userId.current++
    navigate('/')
  };

  return (
    <Container>
      <Title>{getTitle()}</Title>
      <NameField
        name={name}
        onChangeInputValues={onChangeInputValues}
        isSubmitting={isSubmitting}
        nameMessage={nameMessage}
      />
      <PhoneNumberField
        phoneNumber={phoneNumber}
        onChangeInputValues={onChangeInputValues}
        isSubmitting={isSubmitting}
        phoneMessage={phoneMessage}
      />
      <AddressField fullAddress={fullAddress} />
      <OptionField
        selected={selected}
        isOptionCanView={isOptionCanView}
        isOptionHasList={isOptionHasList}
        input1={input1}
        selectClickItemHandler={selectClickItemHandler}
      />
      <AttachedField setIsSubmitting={setIsSubmitting} />
      <CheckField agreement={agreement} isUserAgreement={isUserAgreement} />
      <br />
      <SubmitButtonContainer>
        <SubmitButtonWrapper>
          <SubmitButton
            onClick={e => onSubmitHandler(e)}
            type="submit"
            disabled={!isAllItemFilled}
          >
            제출하기
          </SubmitButton>
        </SubmitButtonWrapper>
      </SubmitButtonContainer>
      {isModalShown ? (
        <Modal>
          <DaumPost setAddressKakakoApi={setAddressKakakoApi} />
        </Modal>
      ) : null}
    </Container>
  );
};

const Title = styled.h1`
  display: felx;
  align-items: center;
  justify-content: center;
  width: 428px;
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  /* background-color: #f7f7f7; */
  position: relative;
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 428px;
  height: 72px;
`;

const SubmitButtonWrapper = styled.div`
  padding: 0.75rem 1.5rem;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  &:disabled {
    background-color: rgba(255, 51, 85, 0.2);
    cursor: not-allowed;
  }
  background-color: #ff3355;
  color: #ffffff;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid #f1f3f5;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  padding: 4px 16px;
  text-align: center;
`;

export default Form;
