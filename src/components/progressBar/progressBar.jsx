import React from 'react';
import styled from 'styled-components';

const ProgressBar = progress => {
  const rate = progress.progress;
  return (
    <ProgressBarContainer>
      <Filler progress={rate}>
        <StyledLabel>{`${rate}%`}</StyledLabel>
      </Filler>
    </ProgressBarContainer>
  );
};

const ProgressBarContainer = styled.div`
  display: felx;
  align-items: center;
  height: 20px;
  width: 100%;
  background-color: #e0e0de;
  border-radius: 50px;
  z-index: 1000;
`;

const Filler = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: #6a1b9a;
  border-radius: inherit;
  text-align: right;
`;
const StyledLabel = styled.span`
  padding: 5px;
  color: #ffffff;
  font-weight: 700;
`;

ProgressBar.propTypes = {};

export default ProgressBar;
