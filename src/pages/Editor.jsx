import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createForm } from '../actions';
import { makeUniqueId } from '../utils/newId';
import styled from 'styled-components';
import Fields from '../components/Editor/Fields';

const basic = {
  id: '',
  type: 'text',
  required: false,
  label: '',
  placeholder: '',
  description: '',
};

const Editor = () => {
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState([basic]);
  const [isDrag, setIsDrag] = useState(false);
  const dragItemIndex = useRef(null);
  const dragOverItemIndex = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // field 추가
  const addField = () => {
    const copy = [...fields, { ...basic }];
    setFields(copy);
  };

  const dragStart = (_, idx) => {
    dragItemIndex.current = idx;
    setIsDrag(true);
  };

  const dragEnter = (_, idx) => {
    const copyFields = [...fields];
    const item = copyFields[dragItemIndex.current];
    dragOverItemIndex.current = idx;

    copyFields.splice(dragItemIndex.current, 1);
    copyFields.splice(dragOverItemIndex.current, 0, item);
    dragItemIndex.current = dragOverItemIndex.current;
    dragOverItemIndex.current = null;

    setFields(copyFields);
  };

  const dragOver = e => {
    e.preventDefault();
  };

  const dragEnd = () => {
    setIsDrag(false);
  };

  const changeTitle = e => {
    setTitle(e.target.value);
  };

  const saveForm = () => {
    const formId = makeUniqueId();
    dispatch(createForm({ formId, title, fields }));
    navigate('/');
  };

  const openForm = () => {
    const formId = makeUniqueId();
    dispatch(createForm({ formId, title, fields }));
    navigate(`/forms/${formId}`);
  };

  return (
    <Form>
      {/* 제목 */}
      <InputTitle>
        <label htmlFor="title">제목</label>
        <input type="text" onChange={changeTitle} value={title} />
      </InputTitle>

      {/* 필드 목록 */}
      <p>필드 목록</p>
      <ul>
        {fields.map((field, index) => {
          return (
            <li className={`field${index}`} key={index} draggable={isDrag}>
              <Fields
                field={field}
                fields={fields}
                index={index}
                setFields={setFields}
                dragStart={dragStart}
                dragEnter={dragEnter}
                dragOver={dragOver}
                dragEnd={dragEnd}
              />
            </li>
          );
        })}
      </ul>
      <AddField onClick={addField} type="button">
        필드 추가하기
      </AddField>

      {/* save,open btn */}
      <Btn>
        <button onClick={openForm}>폼 열기</button>
        <button onClick={saveForm}>저장하기</button>
      </Btn>
    </Form>
  );
};

const Form = styled.form`
  max-width: 428px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin: 50px auto;
  box-sizing: border-box;
  p {
    color: gray;
    margin-bottom: 10px;
    font-weight: bold;
  }
`;

const InputTitle = styled.div`
  margin-bottom: 20px;
  label {
    display: block;
    color: gray;
    padding-bottom: 10px;
    font-weight: bold;
  }
  input {
    border: 1px solid #f1f1f1;
    border-radius: 10px;
    width: 100%;
    padding: 10px;
  }
`;

const AddField = styled.button`
  width: 100%;
  padding: 8px 0;
  border-radius: 5px;
  border: 1px solid #304ffd;
  background-color: #304ffd;
  color: #fff;
  font-weight: bold;
  transition: all 0.2s;
  cursor: pointer;
  :hover {
    border: 1px solid #304ffd;
    background-color: #fff;
    color: #304ffd;
  }
`;

const Btn = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: end;
  button {
    padding: 8px;
    margin-left: 10px;
    border: 1px solid #fff;
    border-radius: 5px;
    cursor: pointer;
  }
  button:last-child {
    color: #fff;
    background-color: #304ffd;
  }
`;

Editor.propTypes = {};

export default Editor;
