import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Wrapper } from './Shared';
import ProgressBar from '../../components/progressBar/progressBar';
import PropTypes from 'prop-types';
import { useInterval } from '../../utils/util';
import { AiTwotoneCamera } from 'react-icons/ai';

export const AttachedField = ({ label, description, attachHandler }) => {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const [image, setImage] = useState({
    preview: '',
    raw: '',
  });

  const [isPreviewSeeing, setIsPreviewSeeing] = useState(false);
  const [isProgress, setIsProgress] = useState(false);
  const [progress, setProgress] = useState(1);

  useInterval(
    () => {
      if (progress < 100) {
        setProgress(progress + 1);
      }
      if (progress === 99) {
        setIsProgress(!isProgress);
      }
    },
    isProgress && progress < 100 ? 100 : null,
  );

  const handleImageAddress = e => {
    setIsProgress(true);
    if (e.target.files.length) {
      setImage({
        ...image,
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      setIsPreviewSeeing(!isPreviewSeeing);
      attachHandler(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Wrapper>
      <h2>{label}</h2>
      {description && <p>{description}</p>}
      <SectionWrapper>
        <AttachSection>
          <InnerSection>
            <ImageWrapper>
              {isProgress === false ? (
                <PreviewImage src={image.preview} alt="preview_image" />
              ) : (
                <ProgressBar progress={progress} />
              )}
              <Translucent
                isPreviewSeeing={isPreviewSeeing}
                isProgress={isProgress}
              >
                <AttachButton>
                  <ButtonContentesWrapper>
                    {isPreviewSeeing === false ? (
                      <>
                        <AiTwotoneCamera onClick={handleClick} />
                        <br />
                        <p>눌러서 파일 등록 </p>
                      </>
                    ) : null}
                    <input
                      type="file"
                      ref={hiddenFileInput}
                      style={{ display: 'none' }}
                      onChange={handleImageAddress}
                    />
                  </ButtonContentesWrapper>
                </AttachButton>
              </Translucent>
            </ImageWrapper>
          </InnerSection>
        </AttachSection>
      </SectionWrapper>
      <br />
      <p>첨부파일은 위와 같이 입력할 수 있습니다.</p>
    </Wrapper>
  );
};

const SectionWrapper = styled.div`
  padding: 0.25em 1.25em;
`;

const AttachSection = styled.div`
  position: relative;
  padding-bottom: 60%;
`;

const InnerSection = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 0.375rem;
  cursor: pointer;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const PreviewImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-size: cover;
  background: no-repeat center;
  background-image: url(${props => props.src});
  user-select: none;
`;

const Translucent = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  ${props =>
    props.isPreviewSeeing &&
    css`
       {
        background-color: rgba(0, 0, 0, 0.58);
        opacity: 0.5;
      }
    `}
  cursor: pointer;
  z-index: 10;
`;

const AttachButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: poiner;
  line-height: inherit;
  color: inherit;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  border: 1px solid rgb(241, 243, 245);
  background-color: rgba(248, 250, 251);
`;

const ButtonContentesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

AttachedField.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  attachHandler: PropTypes.func,
};
