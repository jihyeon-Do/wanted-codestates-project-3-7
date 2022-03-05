import React, { useState, useEffect } from 'react';
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
  const formId = path[path.length - 1];
  const { isModalShown, forms } = useSelector(state => ({
    isModalShown: state.modal.isModalShown,
    forms: state.form.forms,
  }));
  const { title, fields } = forms.find(item => item.formId === formId);

  const [inputValues, setInputValues] = useState({
    name: '',
    phone: '',
    address: '',
    input_0: '',
    input_1: '',
    agreement_0: false,
  });
  const [nameMessage, setNameMessage] = useState('');
  const [phoneMessage, setPhoneMessage] = useState('');
  const [selected, setSelected] = useState('');
  const [isOptionHasList, setIsOptionHasList] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { name, phone, address, agreement_0 } = inputValues;

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
        name: value,
      });
    }
    if (name === 'phone') {
      const regex = /^[0-9\b -]{0,13}$/;
      if (regex.test(value)) {
        setInputValues({
          ...inputValues,
          phone: value,
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
      address: data,
    });
    setIsSubmitting(true);
    dispatch(closeModal());
  };

  const isUserAgreement = required => {
    setInputValues({
      ...inputValues,
      agreement_0: !agreement_0,
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
      input_1: item,
    });
    if (required) {
      setIsSubmitting(required);
    }
    setIsOptionHasList(!isOptionHasList);
  };

  useEffect(() => {
    if (phone.length === 10) {
      setInputValues({
        ...inputValues,
        phone: phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
      });
    }
    if (phone.length === 13) {
      setInputValues({
        ...inputValues,
        phone: phone
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      });
    }
  }, [phone]);

  const onSubmitHandler = e => {
    e.preventDefault();
    dispatch(submitForm(formId, inputValues));
    navigate('/');
  };

  const attachHandler = url => {
    setInputValues({
      ...inputValues,
      input_1: url,
    });
  };

  return (
    <Container>
      <Title>{title}</Title>
      {fields.map((item, idx) => {
        const { description, label, placeholder, required, type, option } =
          item;
        if (type === 'text') {
          return (
            <NameField
              key={idx + 1}
              name={name}
              label={label}
              required={required}
              placeholder={placeholder}
              description={description}
              nameMessage={nameMessage}
              isSubmitting={isSubmitting}
              onChangeInputValues={onChangeInputValues}
            />
          );
        }
        if (type === 'phone') {
          return (
            <PhoneNumberField
              key={idx + 1}
              label={label}
              phoneNumber={phone}
              required={required}
              placeholder={placeholder}
              description={description}
              phoneMessage={phoneMessage}
              isSubmitting={isSubmitting}
              onChangeInputValues={onChangeInputValues}
            />
          );
        }
        if (type === 'address') {
          return (
            <AddressField
              key={idx + 1}
              label={label}
              required={required}
              fullAddress={address}
              description={description}
            />
          );
        }
        if (type === 'select') {
          return (
            <OptionField
              key={idx + 1}
              label={label}
              option={option}
              selected={selected}
              required={required}
              description={description}
              isOptionCanView={isOptionCanView}
              isOptionHasList={isOptionHasList}
              selectClickItemHandler={selectClickItemHandler}
            />
          );
        }
        if (type === 'file') {
          return (
            <AttachedField
              key={idx + 1}
              label={label}
              description={description}
              attachHandler={attachHandler}
              setIsSubmitting={setIsSubmitting}
            />
          );
        }
        if (type === 'agreement') {
          return (
            <CheckField
              key={idx + 1}
              required={required}
              agreement={agreement_0}
              isUserAgreement={isUserAgreement}
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
  display: flex;
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
