[![deploy](https://github.com/GleamingStar/web-catchmind/actions/workflows/deploy.yml/badge.svg)](https://github.com/GleamingStar/web-catchmind/actions/workflows/deploy.yml)

# web-catchmind

#### 캐치마인드 웹 게임 프로젝트

## 🚀 [AWS 배포 링크](http://3.35.9.224/)

### 🎨 Preview

<img src="https://user-images.githubusercontent.com/70461368/159423207-dd813ec6-cd7e-43c9-9793-20cac7c3df96.gif" alt="desktop gif">
<img src="https://user-images.githubusercontent.com/70461368/159423334-9f85ae12-f498-4b01-9b39-cf1fb9cdaaf2.png" style="width:200px;" alt="mobile">

### 👀 How To Play

- 닉네임을 정한 후 입장해주세요
- 방을 선택해 입장해주세요
  - 만약 방이 없다면, 새로운 방을 만들어주세요
- 2명 이상이 방에 있다면, 게임 시작 버튼을 눌러 게임을 시작해주세요
- 출제자는 제시어를 보고 그림을 그려주시고, 나머지는 주어진 그림으로 제시어를 맞춰주세요

### 🛠 Tech Stack

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/styled--components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/express-000000?style=flat-square&logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=Socket.io&logoColor=white" />
<img src="https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=Webpack&logoColor=white" /> <img src="https://img.shields.io/badge/Babel-F9DC3E?style=flat-square&logo=Babel&logoColor=white" /> <img src="https://img.shields.io/badge/AWS EC2-232F3E?style=flat-square&logo=amazon aws&logoColor=white" /> <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=flat-square&logo=GitHub Actions&logoColor=white" />

### 🏗️ To do

- [ ] 문제 목록 추가
- [ ] [1.1.0 업데이트](https://github.com/GleamingStar/web-catchmind/issues/46)
  - 새 게임모드 추가
  - 프로젝트, 저장소 이름 재명명
  - 도메인 구매
- [ ] 리팩토링
- [ ] README 개선

### 🌱 What I learned

- 모바일 환경
  - 모바일 반응형 개발에 대해 많이 배웠습니다. 크롬 개발자도구의 디바이스 툴바와는 다르게 실제환경에서는 상단 주소창이나 하단 내비게이션바, 혹은 가상 키보드 호출로 인해 뷰포트가 예상과 달라졌고, 이에 따른 스크롤을 처리하는데 많은 시간을 쏟았습니다.
  - 기기별 환경에 대해서도 많이 배웠습니다. 오직 모바일 크롬브라우저에서만 나타나는 context.clearRect()이후의 렌더링이 깜빡이는 버그나, 삼성인터넷 브라우저의 강제 다크모드 적용으로 인한 스타일 변경, 카카오톡 인앱브라우저의 네비게이션바, 가상키보드 호출의 짧은 딜레이 등 개발중에는 미처 고려하지 못했던 상황을 만나며 실제 환경 테스트의 중요성을 배웠습니다.
- 캔버스
  - 이미 지정된 경로를 그리는게 아닌 사용자에 커서 움직임에 따라 동적으로 경로를 그리는 법과 canvas context의 다양한 속성들에 대해 배웠습니다.
- 웹소캣
  - 기존 REST API와는 다르게 쌍방향 통신, 서버측에서의 능동적인 발신을 활용하는 법을 배웠습니다. 이전처럼 게임 진행 로직을 클라이언트쪽에서 처리하거나, 폴링 따위로 상태를 갱신하는 대신 이벤트 기반의 통신을 이용해 쉽게 안전한 게임데이터 관리와 클라이언트간의 상태 공유를 할 수 있었습니다.
- 이용자경험
  - react의 lazy() 동적 불러오기와 suspense를 통해 이용자가 많은 시간을 기다리지 않고 hydrate중인 화면을 보게하는 방법에 대해 배웠습니다.
- GitHub Action
  - 이전의 간단한 npm [라이브러리 배포](https://github.com/GleamingStar/toy-react-router) workflow와는 다르게 AWS의 IAM과 CodeDeploy를 이용해 실행중인 ec2 인스턴스에서의 배포를 자동화하는 방법을 배웠습니다.

### 📝 What I should learn

- 실험단계인 React18의 서버컴포넌트
- canvas context의 bezierCurveTo(), quadraticCurveTo()와 이를 적용할 방법
- 웹소캣이나 HTML Canvas 혹은 기타 기능 성능 최적화 방법
- ...
