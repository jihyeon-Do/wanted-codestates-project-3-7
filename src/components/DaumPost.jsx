import React from 'react';
import DaumPostCode from 'react-daum-postcode'
import PropTypes from 'prop-types';

const DaumPost = ({setAddressKakakoApi}) => {
  const postCodeStyle = {
    display: 'block',
    position: 'relative',
    top: '0%',
    width: '400px',
    height: '400px',
    padding: '7px',
  };

  const handleComplete = async data => {
    let fullAddress = data.address;
    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    await setAddressKakakoApi(fullAddress);
  };
  return <DaumPostCode onComplete={handleComplete} style={postCodeStyle} />;
};

DaumPost.propTypes = {
  setAddressKakakoApi: PropTypes.func,
};

export default DaumPost;
