import styled from 'styled-components';

export const FONT_COLOR_TOMATO = '#ff3355';
export const FONT_COLOR_BLACK = '#000000';

export const Wrapper = styled.div`
  width: 428px;
  margin-bottom: 20px;
`;

export const InputField = styled.input`
  outline: 2px solid trasparent;
  font-size: 1rem;
  padding: 1rem;
  border-width: 1px;
  border-radius: 0.5rem;
  width: 100%;
  margin-bottom: 10px;
`;

export const InputSummitingLabel = styled.span`
  width: 100%;
  color: ${props => (props.isSubmitting ? FONT_COLOR_TOMATO : FONT_COLOR_BLACK)};
`;
