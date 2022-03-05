import React from 'react';
import styled from 'styled-components';
import { Wrapper } from './Shared';
import PropTypes from 'prop-types';
import { BiChevronDown } from 'react-icons/bi';

export const OptionField = ({
  label,
  option,
  selected,
  required,
  description,
  isOptionCanView,
  isOptionHasList,
  selectClickItemHandler,
}) => {
  return (
    <Wrapper>
      <h2>{label}</h2>
      {description && <p>{description}</p>}
      <OptionWrapper>
        <div>{selected}</div>
        <BiChevronDown size="20" onClick={() => isOptionCanView()} />
      </OptionWrapper>
      {isOptionHasList === true ? (
        <ul>
          {option?.map((item, index) => {
            return (
              <OptionData
                item={item}
                key={index}
                onClick={() => selectClickItemHandler(option[index], required)}
              >
                {item}
              </OptionData>
            );
          })}
        </ul>
      ) : null}
    </Wrapper>
  );
};

const OptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  width: 100%;
  border: 1px solid black;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-bottom: 20px;
`;

const OptionData = styled.li`
  width: 100%;
  padding: 5px 0px 5px 10px;
  margin: 0 0 5px 10px;
  border-bottom: 1px solid #efefef;
  list-style: none;
  &:hover {
    background: #ff3355;
    color: #ffffff;
  }
  cursor: pointer;
`;

OptionField.propTypes = {
  label: PropTypes.string,
  option: PropTypes.array,
  selected: PropTypes.string,
  required: PropTypes.bool,
  description: PropTypes.string,
  isOptionCanView: PropTypes.func,
  isOptionHasList: PropTypes.bool,
  selectClickItemHandler: PropTypes.func,
};
