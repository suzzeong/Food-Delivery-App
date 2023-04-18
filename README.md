#Food Delivery App (음식 배달 앱)

개요: 라이더 전용 음식 배달 어플리케이션
스킬: React-native, Typescript, socket.io , Axios , react-redux, firebase
담당역할
- splash screen 적용 및 로그인 API 연동
- TMap Open API를 통해 TMap에 연동하여 내비게이션 지원
- socket.io를 이용하여 라이더들과의 실시간 양방향 통신 가능
- react-native-nmap 라이브러리로 네이버 지도에 내 위치에서 가게 위치까지, 가게 위치에서 배달 장소까지 거리 표시
- encrypted-storage로 데이터 유지 관리 (로그인, 로그아웃, 회원가입)
- Firebase Cloud Messaging을 통해 배송완료 등 푸시 알림 기능 구현


## 폴더 구조

- android: 안드로이드 네이티브 폴더
- ios: ios 네이티브 폴더
- node_modules: 노드 라이브러리
- app.json: name은 앱 컴포넌트 이름이니 함부로 바꾸면 안 됨, 이거 바꾸면 네이티브 컴포넌트 이름도 다 바꿔야함, displayName은 앱 이름 변경용
  - ios/FoodDeliveryApp/AppDelegate.m 의 moduleName
  - android/app/src/main/java/com/fooddeliveryapp/MainActivity.java 의 getMainComponentName
- babel.config.js: 바벨 설정
- index.js: 메인 파일
- App.tsx: 기본 App 컴포넌트
- metro.config.js: 메트로 설정 파일(웹팩 대신 사용)
- tsconfig.json: 타입스크립트 설정
- android/app/src/main/java/com/fooddeliveryapp/MainActivity.java: 안드로이드 액티비티에서 js엔진 통해 리액트 코드 실행 + bridge로 소통


## 리액트 네이티브 폴더 구조

- src 폴더 생성(지금 바로 생성 안 하고 폴더 안에 파일이 들 때 생성해도 됨)
- src/assets: 이미지, 폰트, 비디오, gif 등
- src/constants: 상수
- src/pages: 페이지 단위 컴포넌트
- src/components: 기타 컴포넌트
- src/contexts: context api 모음
- src/hooks: 커스텀 훅 모음
- src/modules: 네이티브 모듈
- src/store: 리덕스 스토어 세팅
- src/slices: 리덕스 슬라이스
- types: 타입 정의
