# [Project3] 데이터블 과제 1

## 🚀 배포 링크

https://wanted-preonboarding-team3-datable.netlify.app/

## 💿 실행 방법

```cmd
$ git clone https://github.com/pre-onboarding-team3/wanted-codestates-project-3-7.git

$ npm install

$ npm run start
```

## 😎 3팀

- 도지현: (팀장), Editor 페이지 드래그 앤 드랍, 배포
- 김남경: Editor 페이지 forms data 생성 및 관리, 스타일작성
- 김경봉: 리덕스, Editor 페이지 드래그 앤 드랍
- 김형욱: Editor 페이지 위지윅에디터
- 노학민, 이산하: 메인페이지, submission페이지 기능구현
  (홈화면, 라우터 연결, 제출 목록 데이터 조회)
- 이산하: 전체적인 스타일작성
- 양윤성: form 페이지 기능구현 (progressBar, 주소창)

## 🎇사용 기술스택

- Javascript
- React
- Redux
- styled-components
- Wysiwyg

## 👩‍💻구현

- 메인페이지
- Editor 페이지
- form 작성 페이지
- submission 페이지 (모달 포함)

### 폼 생성

![2](https://user-images.githubusercontent.com/62285862/158655700-025a14b1-39b0-4b23-b235-3d9edff28b21.gif)

- Wysiwyg 에디터를 사용
- 폼 목록 작성 후 '저장하기' 누르면 사용자가 만든 설문지 생성
- 폼 목록 작성 후 '폼 열기' 를 누르면 사용자가 만든 설문지 작성 페이지로 바로 이동
- 폼 생성시에 필수 항목을 정할 수 있음

![3](https://user-images.githubusercontent.com/62285862/158655944-54633563-5b19-428e-8461-d335b959cd25.gif)

- 폼 생성시 목록 삭제 또는 위치 옮기기 가능

### 생성된 폼, 목록, 생성된 폼 작성, 입력된 데이터 목록 확인

![4](https://user-images.githubusercontent.com/62285862/158656165-38bd9338-5196-4e37-bf0a-032c94ed7fa8.gif)

- 필수항목으로 설정된 항목 미입력시 제출하기 버튼 비활성화
- 각 항목마다 정규식을 통해 입력 제한을 두고 있고 조건에 맞지 않으면 마찬가지로 제출하기 버튼 비활성화

### 생성된 폼 삭제

![5](https://user-images.githubusercontent.com/62285862/158656387-069b8177-da2c-432f-b615-b1797c91ca25.gif)

- 생성된 폼은 삭제 가능

### Etc

- 생성된 폼은 리덕스에 저장하여 관리
