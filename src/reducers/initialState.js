export const initialState = {
  forms: [
    {
      formId: 'formId1',
      title: '기본 설문지',
      fields: [
        {
          id: 'name',
          type: 'text',
          required: true,
          label: '이름',
          placeholder: '주민등록상 이름 입력',
          description: '설명영역',
        },
        {
          id: 'phone',
          type: 'phone',
          required: true,
          label: '휴대폰 번호',
          placeholder: '',
          description: '',
        },
      ],
      submitData: [
        {
          id: 1,
          name: '홍길동',
          phone: '000-0000-0000',
          address: '주소주소 주소주소주소',
          input_0: 'S',
          input_1: 'https://imageurl/88783434.png',
          agreement_0: true,
        },
        {
          id: 2,
          name: '2 이름',
          phone: '000-0000-0000',
          address: '주소주소 주소주소주소',
          input_0: 'S',
          input_1: 'https://imageurl/88783434.png',
          agreement_0: true,
        },
      ],
    },
  ],
  isModalShown: false,
};
