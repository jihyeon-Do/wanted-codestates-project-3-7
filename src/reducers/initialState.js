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
        {
          id: 'address',
          type: 'address',
          required: true,
          label: '배송지',
          description: '',
        },
      ],
      submitData: [
        {
          name: '홍길동',
          phone: '010-1234-4567',
          address: '서울시 강남구 xx동 302-55',
          input_0: 'S',
          input_1: 'https://imageurl/88783434.png',
          agreement_0: true,
        },
        {
          name: '김코딩',
          phone: '010-2334-5555',
          address: '서울시 강서구 xx동 102-55',
          input_0: 'S',
          input_1: 'https://imageurl/88783434.png',
          agreement_0: true,
        },
      ],
    },
  ],
  isModalShown: false,
};
