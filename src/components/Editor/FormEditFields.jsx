import React, { useRef } from 'react';
import styled from 'styled-components';
import { BsArrowDownUp } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import PropTypes from 'prop-types';

const FormEditFields = ({
  index,
  fields,
  setFields,
  field,
  DragStart,
  DragEnter,
  DragOver,
  DragEnd,
}) => {
  const labelInput = useRef();
  const checkbox = useRef();

  // type 설정
  const handleChangeSelect = e => {
    const reset = field => {
      delete field.description;
      delete field.contents; // 이용약관
      delete field.option; // select
      delete field.placeholder;
    };

    setFields(
      fields.map((field, i) => {
        if (index === i) {
          reset(field);
          if (e.target.value === 'text' || e.target.value === 'phone') {
            return {
              ...field,
              type: e.target.value,
              placeholder: '',
              description: '',
            };
          } else if (e.target.value === 'select') {
            return {
              ...field,
              type: e.target.value,
              option: [],
              description: '',
            };
          } else if (e.target.value === 'agreement') {
            return { ...field, type: e.target.value, contents: '' };
          } else {
            return { ...field, type: e.target.value, description: '' };
          }
        }
        return field;
      }),
    );
  };

  // label 설정
  const handleChangeInput = e => {
    setFields(
      fields.map((list, i) => {
        if (index === i) {
          return { ...list, label: e.target.value };
        }
        return list;
      }),
    );
  };

  // required 설정
  const handleChangeCheckbox = e => {
    setFields(
      fields.map((list, i) => {
        if (index === i) {
          return { ...list, required: e.target.checked };
        }
        return list;
      }),
    );
  };

  // list제거 btn
  const deleteList = () => {
    setFields(
      fields.filter((field, i) => {
        if (index === i) {
          return false;
        }
        return true;
      }),
    );
  };

  return (
    <FormEditFieldsWrapper>
      <Select name="type" onChange={handleChangeSelect} value={field.type}>
        <option value="text">텍스트</option>
        <option value="phone">전화번호</option>
        <option value="address">주소</option>
        <option value="select">드롭다운</option>
        <option value="file">첨부파일</option>
        <option value="agreement">이용약관</option>
      </Select>
      <LabelInput
        ref={labelInput}
        onChange={handleChangeInput}
        type="text"
        value={field.label}
      />
      <Fieldset>
        <input
          ref={checkbox}
          onChange={handleChangeCheckbox}
          type="checkbox"
          id={'required_' + index}
          checked={field.required}
        />
        <label htmlFor={'required_' + index}>필수</label>
      </Fieldset>
      <button
        type="button"
        aria-label="드래그"
        className="drag-button"
        onMouseDown={e => DragStart(e, index)}
        onDragEnter={e => DragEnter(e, index)}
        onDragOver={DragOver}
        onDragLeave={e => DragEnd(e, index)}
      >
        <BsArrowDownUp className="drag-button" />
      </button>
      <button onClick={deleteList} type="button" aria-label="삭제">
        <IoClose />
      </button>
    </FormEditFieldsWrapper>
  );
};

const FormEditFieldsWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  button {
    border: 0;
    display: flex;
    padding: 7px;
    cursor: pointer;
    background-color: transparent;
    align-items: center;
    box-sizing: border-box;
    &:nth-of-type(1) {
    }
    &:last-child {
      background-color: #ff3355;
      color: white;
      font-size: 1rem;
    }
  }
`;

const Select = styled.select`
  font-size: 1rem;
  font-weight: 800;
  border: none;
  padding-left: 10px;
  border-top-left-radius: 10px;
  :focus {
    outline: none;
  }
`;
const LabelInput = styled.input`
  font-weight: 800;
  border: none;
  width: 100%;
  border-left: 1px solid #f1f1f1;
  padding: 0 10px;
  :focus {
    outline: none;
  }
`;

const Fieldset = styled.fieldset`
  display: flex;
  align-items: center;
  background-color: #eee;
  width: 110px;
  font-size: 14px;
  font-weight: bold;
`;

FormEditFields.propTypes = {
  index: PropTypes.number,
  fields: PropTypes.array,
  setFields: PropTypes.func,
  field: PropTypes.object,
  DragStart: PropTypes.func,
  DragEnter: PropTypes.func,
  DragOver: PropTypes.func,
  DragEnd: PropTypes.func,
};

export default FormEditFields;
