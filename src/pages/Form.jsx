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
  const formIdx = path[path.length - 1];

  const { isModalShown, forms } = useSelector(state => ({
    isModalShown: state.modal.isModalShown,
    forms: state.form.forms,
  }));

  const [field, setField] = useState([]);

  const getFiledThroughForms = forms => {
    forms.forEach(item => {
      if (item.formId === formIdx) {
        setField(item.fields);
      }
    });
  };

  useEffect(() => {
    getFiledThroughForms(forms);
  }, []);

  const [inputValues, setInputValues] = useState({
    name: '',
    phoneNumber: '',
    fullAddress: '',
    input1: '',
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
  const getTitle = forms => {
    let title;
    const formLen = forms.length;
    if (forms.length > 1) {
      title = forms[formLen - 1].title;
    } else {
      title = forms[0].title;
    }
    return title;
  };

  const onChangeInputValues = (e, required) => {
    const { value, name } = e.target;
    if (name === 'name') {
      if (value.length < 2 || value.length > 5) {
        setNameMessage('2글자 이상 5글자 미만으로 입력해주세요');
      } else {
        setNameMessage('올바른 형식입니다.');
        if (required) {
          setIsSubmitting(required);
        }
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

  const isUserAgreement = required => {
    setInputValues({
      ...inputValues,
      agreement: !agreement,
    });
    if (required) {
      setIsSubmitting(required);
    } else {
      setIsSubmitting(!isSubmitting);
    }
  };

  const isOptionCanView = () => {
    setIsOptionHasList(!isOptionHasList);
  };

  const selectClickItemHandler = (item, required) => {
    setSelected(item);
    setInputValues({
      ...inputValues,
      input1: item,
    });
    if (required) {
      setIsSubmitting(required);
    }
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

  const onSubmitHandler = e => {
    e.preventDefault();
    dispatch(submitForm(formIdx, inputValues, userId.current));
    userId.current++;
    navigate('/');
  };

  console.log(isSubmitting);

  return (
    <Container>
      <Title>{getTitle(forms)}</Title>
      {field.map(item => {
        const { description, id, label, placeholder, required, type, option } =
          item;
        if (type === 'phone') {
          return (
            <PhoneNumberField
              key={id}
              label={label}
              placeholder={placeholder}
              required={required}
              description={description}
              phoneNumber={phoneNumber}
              onChangeInputValues={onChangeInputValues}
              isSubmitting={isSubmitting}
              phoneMessage={phoneMessage}
            />
          );
        }
        if (type === 'text') {
          return (
            <NameField
              key={id}
              label={label}
              placeholder={placeholder}
              required={required}
              description={description}
              name={name}
              onChangeInputValues={onChangeInputValues}
              isSubmitting={isSubmitting}
              nameMessage={nameMessage}
            />
          );
        }
        if (type === 'select') {
          return (
            <OptionField
              key={id}
              label={label}
              placeholder={placeholder}
              required={required}
              description={description}
              option={option}
              selected={selected}
              isOptionCanView={isOptionCanView}
              isOptionHasList={isOptionHasList}
              input1={input1}
              selectClickItemHandler={selectClickItemHandler}
            />
          );
        }
        if (type === 'agreement') {
          return (
            <CheckField
              key={id}
              required={required}
              agreement={agreement}
              isUserAgreement={isUserAgreement}
            />
          );
        }
        if (type === 'address') {
          return (
            <AddressField
              key={id}
              required={required}
              fullAddress={fullAddress}
              description={description}
            />
          );
        }
        if (type === 'file') {
          return (
            <AttachedField
              key={id}
              setIsSubmitting={setIsSubmitting}
              description={description}
            />
          );
        }
      })}
      <SubmitButtonContainer>
        <SubmitButtonWrapper>
          <SubmitButton
            onClick={e => onSubmitHandler(e)}
            type="submit"
            disabled={!isSubmitting}
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
  width: 428px;
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
