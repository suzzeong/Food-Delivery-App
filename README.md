- [Delivery icons created by dreamicons - Flaticon](https://www.flaticon.com/free-icons/delivery)

# 첫 시작(setting)

[공식문서](https://reactnative.dev/)

- 초기 세팅: [반드시 따라하기](https://reactnative.dev/docs/environment-setup)
- java 17 버전 설치하면 안 됨(11버전 설치할 것), 환경 변수 설정도 잘 해 놓을 것(JAVA_HOME)
- Android SDK 30이 있어야 함. 가상기기는 Nexus 5로 받을 것
- [adb](https://developer.android.com/studio/releases/platform-tools) 설치 필요, ANDROID_HOME 환경변수도
- [m1 mac용 설정](https://qnrjs42.blog/react-native/m1-arm64-setting)
- [읽어보면 좋은 벨로퍼트님의 글](https://ridicorp.com/story/react-native-1year-review/)

```shell
(프로젝트를 만들고자 하는 폴더로 이동)
npm i -g react-native (안 해도 됨)
npx react-native init FoodDeliveryApp --template react-native-template-typescript
```

설치 시 마지막에 다음 에러가 나오면 cd ./FoodDeliveryApp/ios && pod install 입력할 것

```
error Error: Failed to install CocoaPods dependencies for iOS project, which is required by this template.
Please try again manually: "cd ./FoodDeliveryApp/ios && pod install".
```

**잠깐!!** 이 명령어를 입력하면 항상 최신 버전의 react를 받아오므로 강좌의 버전(0.66)과 일치하지 않게 됨. 현재 최신 버전은 0.71이라서 상당히 차이가 남.
강좌랑 동일한 버전으로 하지 않으면 많은 스트레스를 받을 수 있음. 강좌랑 동일한 버전으로 하려면 이미 초반 세팅이 다 되어 있는 setting 폴더를 git clone받아 시작하는 것이 좋음(클론 후 npm i && npx pod-install 수행 필요).

보통은 강의용으로 자동생성 안 좋아하는데 RN은 자동생성하지 않으면 네이티브단까지 처리하기 어려움

```shell
cd FoodDeliveryApp # 폴더로 이동
npm run android # 안드로이드 실행 명령어
npm run ios # 아이폰 실행 명령어
```

서버가 하나 뜰 것임. Metro 서버. 여기서 서버가 안 뜨고 No device 등의 에러 메시지가 뜬다면 에뮬레이터 실행한 채로 다시 명령어 입력할 것.
Metro 서버에서 소스 코드를 컴파일하고 앱으로 전송해줌. 기본 8081포트.
메트로 서버가 꺼져있다면 터미널을 하나 더 열어

```shell
npm start
```

개발은 iOS 기준으로 하는 게 좋다(개인 경험). 그러나 강좌는 어쩔 수 없이 Windows로 한다.

react-native@0.66 버전, 한 달에 0.1씩 올라가는데 요즘 개발 속도가 느려져서 규칙이 깨짐. 거의 완성 단계라 신규 기능은 npm에서 @react-native-community로부터 받아야 함. 버전 업그레이드 함부로 하지 말 것!

[맥 전용]npx pod-install도 미리 한 번, iOS 라이브러리 받는 용도

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

## 앱 실행 후

- cmd + R로 리로딩
- cmd + D로 디버그 메뉴
- Debugging with Chrome으로 개발자 도구 사용 가능
- Configure Bundler로 메트로 서버 포트 변경 가능
- Show Perf Monitor로 프레임 측정 가능

[Flipper](https://fbflipper.com/) 페이스북이 만든 모바일앱 디버거도 좋음(다만 연결 시 에러나는 사람 다수 발견)

- setup doctor 문제 해결할 것

```shell
npm i react-native-flipper redux-flipper rn-async-storage-flipper @react-native-async-storage/async-storage --force
npx pod-install # 아이폰 전용
```

- flipper-plugin-async-storage
- flipper-plugin-redux-debugger
- Layout, Network, Images, Database(sqlite), React Devtools, Hermes Debugger 사용 가능

## 앱 이름 변경

\android\app\src\main\res\values\strings.xml

app.json의 displayName

\ios\FoodDeliveryApp\Info.plist의
`<string>CFBundleDisplayName</string>`

캐시가 남아있을 수 있기 때문에 메트로 서버 끄고 다시 실행(npm run android)

**단!** 0.68버전부터는 app.json, strings.xml, CFBundleDisplayName을 한글로하면 튕기는 문제 발생. 그럴때는 전부 영어로 되돌리고
ios에서는 [링크](https://thddudco.tistory.com/16) 따라서 다국어 설정으로 한국어 설정할 것.
또한 안드로이드에서는 \android\app\src\main\res\values\strings.xml은 영어로 두고 \android\app\src\main\res\values-ko\strings.xml 을 새로 만들어 여기서 한글로 변경할 것

android/gradle.properties

```
FLIPPER_VERSION=0.145.0
```

플리퍼 버전을 0.145.0으로 높일 것.

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

# 코딩 시작!

## App.tsx 분석

- View가 div, Text가 span이라고 생각하기(1대1 매칭은 아님)
- css는 dp 단위(density-independent pixels, 다양한 화면 크기에 영향받지 않음)
- [css 속성 리스트](https://github.com/vhpoet/react-native-styling-cheat-sheet): 좀 오래됨
- flex에서는 flexDirection이 Column이 default

## React Navigation

react-router-native도 대안임(웹에서 넘어온 개발자들에게 친숙, 웹처럼 주소 기반)

```shell
npm i @react-navigation/native
npm i @react-navigation/native-stack
npm i react-native-screens react-native-safe-area-context
npx pod-install # 맥 전용
```

android/app/src/main/java/FoodDeliveryApp/MainActivity.java

```java
import android.os.Bundle;
...
@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(null);
}
```

android/build.gradle

```
buildscript {
    ext {
        ...
        kotlin_version = '1.6.10'
    }
    ...
    dependencies {
        ...
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
    ...
}
```

App.tsx 교체

```typescript jsx
import * as React from "react";
import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Text, TouchableHighlight, View } from "react-native";
import { useCallback } from "react";

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
type DetailsScreenProps = NativeStackScreenProps<ParamListBase, "Details">;

function HomeScreen({ navigation }: HomeScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate("Details");
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableHighlight onPress={onClick}>
        <Text>Home Screen</Text>
      </TouchableHighlight>
    </View>
  );
}

function DetailsScreen({ navigation }: DetailsScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableHighlight onPress={onClick}>
        <Text>Details Screen</Text>
      </TouchableHighlight>
    </View>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Overview" }}
        />
        <Stack.Screen name="Details">
          {(props) => <DetailsScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```

- NavigationContainer 내에 safe-area가 적용되어 있음
- NavigationContainer: 내비게이션 상태 저장
- Navigator 안에 Screen들 배치
- Screen name 대소문자 상관 없음, component는 보통 두 가지 방식 사용(컴포넌트 그 자체 vs Render Callback)
- props로 navigation과 route가 전달됨
- Pressable, Button, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, TouchableNativeFeedback
- navigation.navigate로 이동 가능
- navigation.push로 쌓기 가능(브라우저의 history와 같은 개념)
- navigation.goBack으로 이전으로 이동
- params 추가 가능(params에 user같은 객체를 통째로 넣지 말기, id를 넣고 user는 글로벌 스토어에 넣기)
- Screen options.title: 제목
- Screen options에 함수를 넣어 route.params로 params 접근 가능
- navigation.setOptions로 옵션 변경 가능
- Navigator screenOptions로 공통 옵션 설정
- Screen options.headerShown로 헤더표시여부
- Screen options.headerTitle로 커스텀 컴포넌트
- Screen options.headerRight로 우측 버튼(useLayoutEffect)
- [옵션 목록](https://reactnavigation.org/docs/screen-options)

# 리액트 내비게이션[ch1]

## 실제 라우터 만들기

```shell
npm install @react-navigation/bottom-tabs
```

App.tsx

```typescript jsx
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Settings from "./src/pages/Settings";
import Orders from "./src/pages/Orders";
import Delivery from "./src/pages/Delivery";
import { useState } from "react";
import SignIn from "./src/pages/SignIn";
import SignUp from "./src/pages/SignUp";

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: { orderId: string };
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Orders"
            component={Orders}
            options={{ title: "오더 목록" }}
          />
          <Tab.Screen
            name="Delivery"
            component={Delivery}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{ title: "내 정보" }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ title: "로그인" }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: "회원가입" }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
```

- Tab.Navigator 도입
- isLoggedIn 분기처리
- Drawer과 Tab.Group 사용처 소개
  src/pages/Delivery.tsx

```typescript jsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Complete from "./Complete";
import Ing from "./Ing";

const Stack = createNativeStackNavigator();

function Delivery() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ing" component={Ing} options={{ title: "내 오더" }} />
      <Stack.Screen
        name="Complete"
        component={Complete}
        options={{ title: "완료하기" }}
      />
    </Stack.Navigator>
  );
}

export default Delivery;
```

- Navigator는 nesting 가능

## 회원가입, 로그인 화면 만들기

src/components/DismissKeyBoardView.tsx

```typescript jsx
import React from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const DismissKeyboardView: React.FC<{
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}> = ({ children, ...props }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAvoidingView
      {...props}
      style={props.style}
      behavior={Platform.OS === "android" ? "position" : "padding"}
    >
      {children}
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
```

인풋 바깥 클릭 시 키보드를 가리기 위함

- src/pages/SignIn.tsx
- src/pages/SignUp.tsx
- src/components/DismissKeyboardView.tsx
- TextInput, StyleSheet.compose 사용
- DismissKeyboardView 만들기(Keyboard, KeyboardAvoidingView)
- KeyboardAvoidingView는 불편함
- react-native-keyboard-aware-scrollview를 대안으로 사용

```shell
npm i react-native-keyboard-aware-scrollview
```

- 타이핑이 없으므로 직접 타입 추가해야 함
- react-native-keyboard-aware-scroll-view 라이브러리는 타입이 있음 (타입 추가 안해도 됨)

types/react-native-keyboard-aware-scroll-view

```typescript jsx
declare module "react-native-keyboard-aware-scrollview" {
  import * as React from "react";
  import { Constructor, ViewProps } from "react-native";

  class KeyboardAwareScrollViewComponent extends React.Component<ViewProps> {}
  const KeyboardAwareScrollViewBase: KeyboardAwareScrollViewComponent &
    Constructor<any>;
  class KeyboardAwareScrollView extends KeyboardAwareScrollViewComponent {}
  export { KeyboardAwareScrollView };
}
```

src/components/DismissKeyBoardView.tsx

```typescript jsx
import React from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const DismissKeyboardView: React.FC<{
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}> = ({ children, ...props }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView {...props} style={props.style}>
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
```

# 서버 API와 연동하기[ch2]

## 서버 요청 보내기

back 서버 실행 필요, DB 없이도 되게끔 만들어둠. 서버 재시작 시 데이터는 날아가니 주의

```shell
# 터미널 하나 더 켜서
cd C:\Users\back 복사된주소
npm i
npm start
```

리덕스 설정

```shell
npm i @reduxjs/toolkit react-redux redux-flipper
```

src/store/index.ts 작성

```typescript jsx
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import rootReducer from "./reducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    if (__DEV__) {
      const createDebugger = require("redux-flipper").default;
      return getDefaultMiddleware().concat(createDebugger());
    }
    return getDefaultMiddleware();
  },
});
export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
```

src/store/reducer.ts

```typescript jsx
import { combineReducers } from "redux";

import userSlice from "../slices/user";

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
```

src/slices/user.ts

```typescript jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  accessToken: "",
  refreshToken: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: (builder) => {},
});

export default userSlice;
```

AppInner.tsx 생성 및 isLoggedIn을 redux로 교체(AppInner 분리 이유는 App.tsx에서 useSelector를 못 씀)

App.tsx

```typescript jsx
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/store";
import AppInner from "./AppInner";

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppInner />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
```

## 회원가입, 로그인

액세스토큰/리프레시토큰을 받아서 다음 라이브러리로 저장

```shell
npm install react-native-encrypted-storage
npx pod-install # ios 전용
```

서버 요청은 axios 사용(요즘 ky나 got으로 넘어가는 추세이나 react-native와 호환 여부 불투명)

```shell
npm i axios
```

환경변수, 키 값을 저장할 config 패키지

```shell
npm i react-native-config
```

```typescript jsx
import Config from "react-native-config";
```

android에서 http 요청이 안 보내지면

- android/app/src/main/AndroidManifest.xml 에서 <application> 태그에 android:usesCleartextTraffic="true" 추가

-Android에서 Config가 적용이 안 되면 다음 추가해야함

android/app/proguard-rules.pro

```
-keep class com.fooddeliveryapp.BuildConfig { *; }
```

android/app/build.gradle

```
apply plugin: "com.android.application"
apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
...
    defaultConfig {
        ...
        resValue "string", "build_config_package", "com.fooddeliveryapp"
    }
```

- .env에 키=값 저장해서(예를 들어 abc=def) Config.abc로 꺼내 씀
  .env

```
API_URL=http://10.0.2.2:3105
```

- 아이피는 10.0.2.2로 해야 함(localhost로 하면 안드로이드에서 안 됨)
- 10.0.2.2가 안 되면 네이버에 내 아이피 쳐서 외부IP도 입력해보고, ipconfig 터미널에 입력할 때 나오는 내부IP도 입력해서 되는 것 찾기
- 에뮬레이터/시뮬레이터/실제 기기에서 브라우저를 켜서 아이피:3105 입력했을 때 페이지가 제대로 뜨는 IP가 실제로 작동하는 IP
- [ios]에서 안 될 때는 Podfile에 pod 'react-native-config', :path => '../node_modules/react-native-config/react-native-config.podspec' 추가해보기

암호화해서 저장할 데이터는 다음 패키지에

```
import EncryptedStorage from 'react-native-encrypted-storage';
```

```typescript jsx
await EncryptedStorage.setItem("키", "값");
await EncryptedStorage.removeItem("키");
const 값 = await EncryptedStorage.getItem("키");
```

- redux에 넣은 데이터는 앱을 끄면 날아감
- 앱을 꺼도 저장되어야 하고 민감한 값은 encrypted-storage에
- 개발 환경별로 달라지는 값은 react-native-config에 저장하면 좋음(암호화 안 됨)
- 그 외에 유지만 되면 데이터들은 async-storage에 저장(npm install @react-native-async-storage/async-storage) -> 공개되어도 되는 값

```typescript jsx
await AsyncStorage.setItem("키", "값");
await AsyncStorage.removeItem("키");
const 값 = await AsyncStorage.getItem("키");
```

src/pages/SignUp.tsx, src/pages/SignIn.tsx

```

```

ActivityIndicator로 로딩창 꾸미기

## 소켓IO 연결

웹소켓 기반 라이브러리

- 요청-응답 방식이 아니라 실시간 양방향 통신 가능

```shell
npm i socket.io-client
```

src/hooks/useSocket.ts

```typescript jsx
import { useCallback } from "react";
import { io, Socket } from "socket.io-client";
import Config from "react-native-config";

let socket: Socket | undefined;
const useSocket = (): [Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = undefined;
    }
  }, []);
  if (!socket) {
    socket = io(`${Config.API_URL}`, {
      transports: ["websocket"],
    });
  }
  return [socket, disconnect];
};

export default useSocket;
```

AppInner.tsx

```typescript jsx
const [socket, disconnect] = useSocket();

useEffect(() => {
  const helloCallback = (data: any) => {
    console.log(data);
  };
  if (socket && isLoggedIn) {
    console.log(socket);
    socket.emit("login", "hello");
    socket.on("hello", helloCallback);
  }
  return () => {
    if (socket) {
      socket.off("hello", helloCallback);
    }
  };
}, [isLoggedIn, socket]);

useEffect(() => {
  if (!isLoggedIn) {
    console.log("!isLoggedIn", !isLoggedIn);
    disconnect();
  }
}, [isLoggedIn, disconnect]);
```

- login을 emit하면 그때부터 서버가 hello로 데이터를 보내줌 \*로그아웃 시에 disconnect해주는 것 잊지 말기

## 로그아웃

src/pages/Settings.tsx

```

```

# 주문 수락, 거절, 완료[ch3]

## 실제 주문 받기

socket.io에서 주문 내역 받아서 store에 넣기

AppInner.tsx

```typescript
useEffect(() => {
  const callback = (data: any) => {
    console.log(data);
    dispatch(orderSlice.actions.addOrder(data));
  };
  if (socket && isLoggedIn) {
    socket.emit("acceptOrder", "hello");
    socket.on("order", callback);
  }
  return () => {
    if (socket) {
      socket.off("order", callback);
    }
  };
}, [isLoggedIn, socket]);
```

## 앱 다시 켤 때 자동로그인되게

encrypted-storage에서 토큰 불러오기

AppInner.tsx

```typescript
// 앱 실행 시 토큰 있으면 로그인하는 코드
const dispatch = useAppDispatch();

useEffect(() => {
  const getTokenAndRefresh = async () => {
    try {
      const token = await EncryptedStorage.getItem("refreshToken");
      if (!token) {
        return;
      }
      const response = await axios.post(
        `${Config.API_URL}/refreshToken`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        userSlice.actions.setUser({
          name: response.data.data.name,
          email: response.data.data.email,
          accessToken: response.data.data.accessToken,
        })
      );
    } catch (error: any) {
      console.error(error);
      if (error.response?.data.code === "expired") {
        Alert.alert("알림", "다시 로그인 해주세요.");
      }
    }
  };
  getTokenAndRefresh();
}, [dispatch]);
```

- 잠깐 로그인 화면이 보이는 것은 SplashScreen으로 숨김

## 주문 데이터 리덕스에 저장하기

src/slices/order.ts

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Order {
  orderId: string;
  start: {
    latitude: number;
    longitude: number;
  };
  end: {
    latitude: number;
    longitude: number;
  };
  price: number;
}

interface initialState {
  orders: Order[];
  deliveries: Order[];
}

const initialState: initialState = {
  orders: [],
  deliveries: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    acceptOrder(state, action: PayloadAction<string>) {
      const index = state.orders.findIndex((v) => v.orderId === action.payload);
      if (index > -1) {
        state.deliveries.push(state.orders[index]);
        state.orders.splice(index, 1);
      }
    },
    rejectOrder(state, action) {
      const index = state.orders.findIndex((v) => v.orderId === action.payload);
      if (index > -1) {
        state.orders.splice(index, 1);
      }
      const delivery = state.deliveries.findIndex(
        (v) => v.orderId === action.payload
      );
      if (delivery > -1) {
        state.deliveries.splice(delivery, 1);
      }
    },
  },
  extraReducers: (builder) => {},
});

export default orderSlice;
```

## 수익금 확인하기

src/pages/Settings.tsx

```typescript
import React, { useCallback, useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import axios, { AxiosError } from "axios";
import Config from "react-native-config";
import { useAppDispatch } from "../store";
import userSlice from "../slices/user";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import EncryptedStorage from "react-native-encrypted-storage";

function Settings() {
  const money = useSelector((state: RootState) => state.user.money);
  const name = useSelector((state: RootState) => state.user.name);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getMoney() {
      const response = await axios.get<{ data: number }>(
        `${Config.API_URL}/showmethemoney`,
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      dispatch(userSlice.actions.setMoney(response.data.data));
    }
    getMoney();
  }, [accessToken, dispatch]);

  const onLogout = useCallback(async () => {
    try {
      await axios.post(
        `${Config.API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      Alert.alert("알림", "로그아웃 되었습니다.");
      dispatch(
        userSlice.actions.setUser({
          name: "",
          email: "",
          accessToken: "",
        })
      );
      await EncryptedStorage.removeItem("refreshToken");
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      console.error(errorResponse);
    }
  }, [accessToken, dispatch]);

  return (
    <View>
      <View style={styles.money}>
        <Text style={styles.moneyText}>
          {name}님의 수익금{" "}
          <Text style={{ fontWeight: "bold" }}>
            {money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
          원
        </Text>
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={StyleSheet.compose(
            styles.loginButton,
            styles.loginButtonActive
          )}
          onPress={onLogout}
        >
          <Text style={styles.loginButtonText}>로그아웃</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  money: {
    padding: 20,
  },
  moneyText: {
    fontSize: 16,
  },
  buttonZone: {
    alignItems: "center",
    paddingTop: 20,
  },
  loginButton: {
    backgroundColor: "gray",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: "blue",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Settings;
```

## 주문 화면 만들기(수락/거절)

src/pages/Orders.tsx

```typescript jsx
import React, { useCallback } from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import EachOrder from "../components/EachOrder";
import { Order } from "../slices/order";
import { RootState } from "../store/reducer";

function Orders() {
  const orders = useSelector((state: RootState) => state.order.orders);

  const renderItem = useCallback(({ item }: { item: Order }) => {
    return <EachOrder item={item} />;
  }, []);

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.orderId}
      renderItem={renderItem}
    />
  );
}

export default Orders;
```

- ScrollView + map 조합은 좋지 않음
- FlatList를 쓰기
- 반복되는 것은 컴포넌트로 빼는 것이 좋음
- keyExtractor 반드시 설정하기

src/components/EachOrder.tsx

```typescript jsx
import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios, { Axios, AxiosError } from "axios";
import { useCallback, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Config from "react-native-config";
import { useSelector } from "react-redux";
import { LoggedInParamList } from "../../AppInner";
import orderSlice, { Order } from "../slices/order";
import { useAppDispatch } from "../store";
import { RootState } from "../store/reducer";

interface Props {
  item: Order;
}

function EachOrder({ item }: Props) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [detail, showDetail] = useState(false);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  // 수락
  const onAccept = useCallback(async () => {
    if (!accessToken) {
      return;
    }
    try {
      await axios.post(
        `${Config.API_URL}/accept`,
        { orderId: item.orderId },
        { headers: { authorization: `Bearer ${accessToken}` } }
      );
      dispatch(orderSlice.actions.acceptOrder(item.orderId));
      navigation.navigate("Delivery");
    } catch (error: any) {
      let errorResponse = (error as AxiosError).response;
      if (errorResponse?.status === 400) {
        // 타인이 이미 수락한 경우
        Alert.alert("알림", (errorResponse.data as any).message);
        dispatch(orderSlice.actions.rejectOrder(item.orderId));
      }
    }
  }, [navigation, dispatch, item, accessToken]);

  // 거절
  const onReject = useCallback(() => {
    dispatch(orderSlice.actions.rejectOrder(item.orderId));
  }, [dispatch, item]);

  const toggleDetail = useCallback(() => {
    showDetail((prevState) => !prevState);
  }, []);

  return (
    <View style={styles.orderContainer}>
      <Pressable onPress={toggleDetail} style={styles.info} disabled={loading}>
        <Text style={styles.eachInfo}>
          {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
        </Text>
        <Text>삼성동</Text>
        <Text>왕십리동</Text>
      </Pressable>
      {detail && (
        <View>
          <View>
            <Text>네이버맵이 들어갈 장소</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <Pressable
              onPress={onAccept}
              style={styles.acceptButton}
              disabled={loading}
            >
              <Text style={styles.buttonText}>수락</Text>
            </Pressable>
            <Pressable
              onPress={onReject}
              style={styles.rejectButton}
              disabled={loading}
            >
              <Text style={styles.buttonText}>거절</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  orderContainer: {
    borderRadius: 5,
    margin: 5,
    padding: 10,
    backgroundColor: "lightgray",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eachInfo: {
    // flex: 1,
  },
  buttonWrapper: {
    flexDirection: "row",
  },
  acceptButton: {
    backgroundColor: "blue",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    flex: 1,
  },
  rejectButton: {
    backgroundColor: "red",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EachOrder;
```

## accessToken 만료시 자동으로 refresh되게

axios.interceptor 설정하기

```typescript
useEffect(() => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status },
      } = error;
      if (status === 419) {
        if (error.response.data.code === "expired") {
          const originalRequest = config;
          const refreshToken = await EncryptedStorage.getItem("refreshToken");
          // token refresh 요청
          const { data } = await axios.post(
            `${Config.API_URL}/refreshToken`, // token refresh api
            {},
            { headers: { authorization: `Bearer ${refreshToken}` } }
          );
          // 새로운 토큰 저장
          dispatch(userSlice.actions.setAccessToken(data.data.accessToken));
          originalRequest.headers.authorization = `Bearer ${data.data.accessToken}`;
          // 419로 요청 실패했던 요청 새로운 토큰으로 재요청
          return axios(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );
}, [dispatch]);
```

# 네이버맵에 내 위치 표시하기[ch4]

## 네이버 지도 사용하기

```shell
npm i react-native-nmap --force
```

[ios]git-lfs로 추가 설치 필요 [참고](https://github.com/navermaps/ios-map-sdk#%EB%8C%80%EC%9A%A9%EB%9F%89-%ED%8C%8C%EC%9D%BC%EC%9D%84-%EB%B0%9B%EA%B8%B0-%EC%9C%84%ED%95%B4-git-lfs-%EC%84%A4%EC%B9%98%EA%B0%80-%ED%95%84%EC%9A%94%ED%95%A9%EB%8B%88%EB%8B%A4)

네이버 맵 버전 명시(**3.10.1보다 더 최신버전 잘 돌아가는 거 있으면 알려주세요!**)

Podfile

```
...
  use_flipper!()
  pod 'NMapsMap', '3.10.1'

  post_install do |installer|
...
```

```shell
npx pod-install # ios 전용
```

- 안드로이드 앱 패키지 이름: com.[원하는이름].fooddeliveryapp (ex: com.suz.fooddeliveryapp)
- [커밋 참조](https://github.com/ZeroCho/food-delivery-app/commit/36295cabf2cdab4ed68fa3b907c7b467101a02a5) (폴더 등 변경할 게 많음)
  _0.68 버전 이상부터는_
  [링크](https://www.inflearn.com/questions/583155) 참고해서 newarchitecture 부분의 이름도 수정해야 합니다.
  [링크](https://github.com/QuadFlask/react-native-naver-map)

- [ios]Xcode로는 xcworkspace 파일을 열어야함(xcodeproj 열면 안됨, xcworkspace가 없다면 ios 폴더에서 pod install 한 번 입력해볼 것)
- [ios]iOS Bundle ID: com.[원하는이름].fooddeliveryapp(ex: com.zerocho.fooddeliveryapp)로 수정
- [ios]실제 기기에서 네이버 지도 하는 법 [링크](https://www.inflearn.com/questions/605689)

src/components/EachOrder.tsx

```typescript jsx
<View
  style={{
    width: Dimensions.get("window").width - 30,
    height: 200,
    marginTop: 10,
  }}
>
  <NaverMapView
    style={{ width: "100%", height: "100%" }}
    zoomControl={false}
    center={{
      zoom: 10,
      tilt: 50,
      latitude: (start.latitude + end.latitude) / 2,
      longitude: (start.longitude + end.longitude) / 2,
    }}
  >
    <Marker
      coordinate={{
        latitude: start.latitude,
        longitude: start.longitude,
      }}
      pinColor="blue"
    />
    <Path
      coordinates={[
        {
          latitude: start.latitude,
          longitude: start.longitude,
        },
        { latitude: end.latitude, longitude: end.longitude },
      ]}
    />
    <Marker coordinate={{ latitude: end.latitude, longitude: end.longitude }} />
  </NaverMapView>
</View>
```

- 빌드 잘 안될 때,

```shell
cd android
gradlew clean
react-native start --reset-cache
```

## 위도 경도를 km로 바꿔주는 함수

src/util.ts

```typescript
function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export default getDistanceFromLatLonInKm;
```

## 위치 정보 가져오기

권한 얻기(위치정보, 카메라, 갤러리)
[링크](https://github.com/zoontek/react-native-permissions)

```shell
npm i react-native-permissions
```

ios/Podfile

```1
permissions_path = '../node_modules/react-native-permissions/ios'
pod 'Permission-Camera', :path => "#{permissions_path}/Camera"
pod 'Permission-LocationAccuracy', :path => "#{permissions_path}/LocationAccuracy"
pod 'Permission-LocationAlways', :path => "#{permissions_path}/LocationAlways"
pod 'Permission-LocationWhenInUse', :path => "#{permissions_path}/LocationWhenInUse"
pod 'Permission-Notifications', :path => "#{permissions_path}/Notifications"
pod 'Permission-PhotoLibrary', :path => "#{permissions_path}/PhotoLibrary"
```

ios/FoodDeliveryApp/Info.plist

```
<key>NSCameraUsageDescription</key>
<string>배송완료 사진 촬영을 위해 카메라 권한이 필요합니다.</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>배송중 위치 확인을 위해서 위치 권한이 필요합니다.</string>
<key>NSLocationAlwaysUsageDescription</key>
<string>배송중 위치 확인을 위해서 위치 권한이 필요합니다.</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>배송중 위치 확인을 위해서 위치 권한이 필요합니다.</string>
<key>NSMotionUsageDescription</key>
<string>배송중 위치 확인을 위해서 위치 권한이 필요합니다.</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>배송완료 사진 선택을 위해 라이브러리 접근 권한이 필요합니다.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>배송완료 사진 선택을 위해 라이브러리 접근 권한이 필요합니다.</string>
```

android/app/src/main/AndroidManifest.xml

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.VIBRATE"/>
```

```shell
npx pod-install
```

- [플로우](https://github.com/zoontek/react-native-permissions)를 잘 볼 것

src/hooks/usePermissions.ts

```typescript jsx
import { useEffect } from "react";
import { Alert, Linking, Platform } from "react-native";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";

function usePermissions() {
  // 권한 관련
  useEffect(() => {
    if (Platform.OS === "android") {
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then((result) => {
          console.log("check location", result);
          if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
            Alert.alert(
              "이 앱은 위치 권한 허용이 필요합니다.",
              "앱 설정 화면을 열어서 항상 허용으로 바꿔주세요.",
              [
                {
                  text: "네",
                  onPress: () => Linking.openSettings(),
                },
                {
                  text: "아니오",
                  onPress: () => console.log("No Pressed"),
                  style: "cancel",
                },
              ]
            );
          }
        })
        .catch(console.error);
    } else if (Platform.OS === "ios") {
      check(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then((result) => {
          if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
            Alert.alert(
              "이 앱은 백그라운드 위치 권한 허용이 필요합니다.",
              "앱 설정 화면을 열어서 항상 허용으로 바꿔주세요.",
              [
                {
                  text: "네",
                  onPress: () => Linking.openSettings(),
                },
                {
                  text: "아니오",
                  onPress: () => console.log("No Pressed"),
                  style: "cancel",
                },
              ]
            );
          }
        })
        .catch(console.error);
    }
    if (Platform.OS === "android") {
      check(PERMISSIONS.ANDROID.CAMERA)
        .then((result) => {
          if (result === RESULTS.DENIED || result === RESULTS.GRANTED) {
            return request(PERMISSIONS.ANDROID.CAMERA);
          } else {
            console.log(result);
            throw new Error("카메라 지원 안 함");
          }
        })
        .catch(console.error);
    } else {
      check(PERMISSIONS.IOS.CAMERA)
        .then((result) => {
          if (
            result === RESULTS.DENIED ||
            result === RESULTS.LIMITED ||
            result === RESULTS.GRANTED
          ) {
            return request(PERMISSIONS.IOS.CAMERA);
          } else {
            console.log(result);
            throw new Error("카메라 지원 안 함");
          }
        })
        .catch(console.error);
    }
  }, []);
}

export default usePermissions;
```

- Platform으로 운영체제 구별
- Linking으로 다른 서비스 열기 가능

## 위치 정보 가져오기

```shell
npm i @react-native-community/geolocation
```

src/pages/Ing.tsx

```typescript jsx
import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import NaverMapView, { Marker, Path } from "react-native-nmap";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import Geolocation from "@react-native-community/geolocation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LoggedInParamList } from "../../AppInner";

type IngScreenProps = NativeStackScreenProps<LoggedInParamList, "Delivery">;

function Ing({ navigation }: IngScreenProps) {
  console.dir(navigation);
  const deliveries = useSelector((state: RootState) => state.order.deliveries);
  const [myPosition, setMyPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (info) => {
        setMyPosition({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      console.error,
      {
        enableHighAccuracy: true,
        timeout: 20000,
      }
    );
  }, []);

  if (!deliveries?.[0]) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Text>주문을 먼저 수락해주세요!</Text>
      </View>
    );
  }

  if (!myPosition || !myPosition.latitude) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Text>내 위치를 로딩 중입니다. 권한을 허용했는지 확인해주세요.</Text>
      </View>
    );
  }

  const { start, end } = deliveries?.[0];

  return (
    <View>
      <View
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
      >
        <NaverMapView
          style={{ width: "100%", height: "100%" }}
          zoomControl={false}
          center={{
            zoom: 10,
            tilt: 50,
            latitude: (start.latitude + end.latitude) / 2,
            longitude: (start.longitude + end.longitude) / 2,
          }}
        >
          {myPosition?.latitude && (
            <Marker
              coordinate={{
                latitude: myPosition.latitude,
                longitude: myPosition.longitude,
              }}
              width={15}
              height={15}
              anchor={{ x: 0.5, y: 0.5 }}
              caption={{ text: "나" }}
              image={require("../assets/red-dot.png")}
            />
          )}
          {myPosition?.latitude && (
            <Path
              coordinates={[
                {
                  latitude: myPosition.latitude,
                  longitude: myPosition.longitude,
                },
                { latitude: start.latitude, longitude: start.longitude },
              ]}
              color="orange"
            />
          )}
          <Marker
            coordinate={{
              latitude: start.latitude,
              longitude: start.longitude,
            }}
            width={15}
            height={15}
            anchor={{ x: 0.5, y: 0.5 }}
            caption={{ text: "출발" }}
            image={require("../assets/blue-dot.png")}
          />
          <Path
            coordinates={[
              {
                latitude: start.latitude,
                longitude: start.longitude,
              },
              { latitude: end.latitude, longitude: end.longitude },
            ]}
            color="orange"
          />
          <Marker
            coordinate={{ latitude: end.latitude, longitude: end.longitude }}
            width={15}
            height={15}
            anchor={{ x: 0.5, y: 0.5 }}
            caption={{ text: "도착" }}
            image={require("../assets/green-dot.png")}
            onClick={() => {
              console.log(navigation);
              navigation.push("Complete", { orderId: deliveries[0].orderId });
            }}
          />
        </NaverMapView>
      </View>
    </View>
  );
}

export default Ing;
```

## 이미지 선택하기(주문 완료)

src/pages/Complete.tsx

```typescript jsx
import React, { useCallback, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { LoggedInParamList } from "../../AppInner";
import ImagePicker from "react-native-image-crop-picker";
import ImageResizer from "react-native-image-resizer";
import axios, { AxiosError } from "axios";
import Config from "react-native-config";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import orderSlice from "../slices/order";
import { useAppDispatch } from "../store";

function Complete() {
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<LoggedInParamList>>();
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  }>();
  const [preview, setPreview] = useState<{ uri: string }>();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const onResponse = useCallback(async (response) => {
    console.log(response.width, response.height, response.exif);
    setPreview({ uri: `data:${response.mime};base64,${response.data}` });
    const orientation = (response.exif as any)?.Orientation;
    console.log("orientation", orientation);
    return ImageResizer.createResizedImage(
      response.path,
      600,
      600,
      response.mime.includes("jpeg") ? "JPEG" : "PNG",
      100,
      0
    ).then((r) => {
      console.log(r.uri, r.name);

      setImage({
        uri: r.uri,
        name: r.name,
        type: response.mime,
      });
    });
  }, []);

  const onTakePhoto = useCallback(() => {
    return ImagePicker.openCamera({
      includeBase64: true,
      includeExif: true,
      saveToPhotos: true,
    })
      .then(onResponse)
      .catch(console.log);
  }, [onResponse]);

  const onChangeFile = useCallback(() => {
    return ImagePicker.openPicker({
      includeExif: true,
      includeBase64: true,
      mediaType: "photo",
    })
      .then(onResponse)
      .catch(console.log);
  }, [onResponse]);

  const orderId = route.params?.orderId;
  const onComplete = useCallback(async () => {
    if (!image) {
      Alert.alert("알림", "파일을 업로드해주세요.");
      return;
    }
    if (!orderId) {
      Alert.alert("알림", "유효하지 않은 주문입니다.");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    formData.append("orderId", orderId);
    try {
      await axios.post(`${Config.API_URL}/complete`, formData, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      Alert.alert("알림", "완료처리 되었습니다.");
      navigation.goBack();
      navigation.navigate("Settings");
      dispatch(orderSlice.actions.rejectOrder(orderId));
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        Alert.alert("알림", errorResponse.data.message);
      }
    }
  }, [dispatch, navigation, image, orderId, accessToken]);

  return (
    <View>
      <View style={styles.orderId}>
        <Text>주문번호: {orderId}</Text>
      </View>
      <View style={styles.preview}>
        {preview && <Image style={styles.previewImage} source={preview} />}
      </View>
      <View style={styles.buttonWrapper}>
        <Pressable style={styles.button} onPress={onTakePhoto}>
          <Text style={styles.buttonText}>이미지 촬영</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onChangeFile}>
          <Text style={styles.buttonText}>이미지 선택</Text>
        </Pressable>
        <Pressable
          style={
            image
              ? styles.button
              : StyleSheet.compose(styles.button, styles.buttonDisabled)
          }
          onPress={onComplete}
        >
          <Text style={styles.buttonText}>완료</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orderId: {
    padding: 20,
  },
  preview: {
    marginHorizontal: 10,
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height / 3,
    backgroundColor: "#D2D2D2",
    marginBottom: 10,
  },
  previewImage: {
    height: Dimensions.get("window").height / 3,
    resizeMode: "contain",
  },
  buttonWrapper: { flexDirection: "row", justifyContent: "center" },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 120,
    alignItems: "center",
    backgroundColor: "yellow",
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: "black",
  },
  buttonDisabled: {
    backgroundColor: "gray",
  },
});

export default Complete;
```

이미지 선택 후 리사이징

```shell
npm i react-native-image-crop-picker
npm i react-native-image-resizer
npx pod-install # ios 전용
```

- 이미지 업로드에는 multipart/form-data를 사용함
- 이미지는 { uri: 주소, name: 파일명, type: 확장자 } 꼴
- base64로 이미지를 텍스트꼴로 표현 가능(용량 33% 증가)
- resizeMode: cover(꽉 차게), contain(딱 맞게), stretch(비율 무시하고 딱 맞게), repeat(반복되게), center(중앙 정렬)

# 네이티브 모듈 수정하기[ch5]

## 사진 찍을 때 이미지를 카메라롤/갤러리에 저장하고 싶음

- fork 떠서 package.json 에서 "react-native-nmap": "https://github.com/자기 깃헙이름/react-native-nmap" 으로 수정
- Native Module Patching (최근 방식)

```shell
npm i patch-package
```

package.json

```json
  "scripts": {
    "postinstall": "patch-package",
    "android": "react-native run-android",
```

- patch 후 적용하기

```shell
npx patch-package react-native-image-crop-picker
```

- 앞으로 npm i 할 때마다 자동으로 패치가 적용됨(postinstall 스크립트 덕분)
- 이런 것 때문에 네이티브를 알아야함 ㅠ

## Tmap 연결하기(Native Modules)

[가입](https://openapi.sk.com/)

- My Project - 프로젝트 생성 - TMap API 신청(무료)
- [앱키](https://openapi.sk.com/products/detail?linkMenuSeq=126#%EC%95%B1%ED%82%A4%ED%99%95%EC%9D%B8%ED%95%98%EA%B8%B0)
- [sdk](https://tmapapi.sktelecom.com/main.html#android/sample/androidSample.sdk_download)
- [안드로이드 연동](http://tmapapi.sktelecom.com/main.html#android/guide/androidGuide.sample1)
- [ios][ios 연동](http://tmapapi.sktelecom.com/main.html#ios/guide/iosGuide.sample1)
- [ios]iOS 연동시 Header 파일들이 project.pbxproj에 등록되었나 확인(다른 것도 당연히)
- android/app/src/java/com/zerocho/fooddeliveryapp/TMapModule.java 생성
- android/app/src/java/com/zerocho/fooddeliveryapp/TMapPackage.java 생성
- android/app/src/java/com/zerocho/fooddeliveryapp/MainApplication에 TMapPackage 연결
- [ios]ios/FoodDeliveryApp/RCTTMap.h
- [ios]ios/FoodDeliveryApp/RCTTMap.m
- [ios]ios/FoodDeliveryApp-Bridging-Header.h
<details>
<summary>- src/modules/TMap.ts</summary>
<div markdown="1">

```typescript
import { NativeModules } from "react-native";
const { TMap } = NativeModules;

interface TMapInterface {
  openNavi(
    name: string,
    long: string,
    lat: string,
    naviVehicle: string
  ): Promise<boolean>;
}
export default TMap as TMapInterface;
```

</div>
</details>

android/app/src/main/AndroidManifest.xml

```xml
...
  <queries>
    <package android:name="com.skt.tmap.ku" />
  </queries>
</manifest>
```

src/pages/Ing.tsx

```typescript jsx
onClick={() => {
  TMap.openNavi(
    "도착지",
    end.longitude.toString(),
    end.latitude.toString(),
    "MOTORCYCLE"
  ).then((data) => {
    console.log("TMap callback", data);
    if (!data) {
      Alert.alert("알림", "티맵을 설치하세요.");
    }
  });
}}
```

## react-native-splash-screen

```shell
npm i react-native-splash-screen
```

- [여기서](https://github.com/crazycodeboy/react-native-splash-screen) Third step과 Getting Started 따라하기
- android/app/src/main/res/drawable 폴더 만들고 그 안에 launch_screen.png 넣기
  AppInner.tsx

```tsx
...
        const token = await EncryptedStorage.getItem('refreshToken');
        if (!token) {
          SplashScreen.hide(); // here
          return;
        }
        ...
      } finally {
        SplashScreen.hide();  // here
      }
    };
    getTokenAndRefresh();
  }, [dispatch]);
```

## 앱 icon 변경

- [Android](<http://romannurik.github.io/AndroidAssetStudio/icons-launcher.html#foreground.type=image&foreground.space.trim=1&foreground.space.pad=0.25&foreColor=rgba(96%2C%20125%2C%20139%2C%200)&backColor=rgb(255%2C%20255%2C%20255)&crop=0&backgroundShape=square&effects=none&name=ic_launcher>) 다운받은 후 android/app/src/main 아래에 넣기
- [ios] [링크](https://appicon.co/) 에서 다운로드된 Assets.xcassets를 ios/FoodDeliveryApp 내부에 넣기
- [ios]Xcode에서 아이콘 연결 필요

## 앱 하단 메뉴 아이콘

```shell
npm i react-native-vector-icons
npm i -D @types/react-native-vector-icons
```

[목록](https://oblador.github.io/react-native-vector-icons/)

- android/app/src/main/assets/fonts에 node_modules/react-native-vector-icons/Fonts 폴더 복사
- [ios]Xcode에서 New Group으로 메뉴를 생성하고 Fonts 그룹에 node_modules/react-native-vector-icons/Fonts 폰트들을 추가

## 주문완료 사진들 보여주기

```shell
npm i react-native-fast-image
```

[링크](https://github.com/DylanVann/react-native-fast-image)
src/slices/order.ts

```typescript
interface InitialState {
  ...
  completes: Order[];
}
const initialState: InitialState = {
  ...
  completes: [],
};
...
    setCompletes(state, action) {
      state.completes = action.payload;
    },
```

src/pages/Settings.tsx

```typescript jsx

```

## FCM

푸쉬알림 보내기

- [링크](https://console.firebase.google.com/)에서 앱 만들기

```shell
npm i @react-native-firebase/analytics @react-native-firebase/app @react-native-firebase/messaging

npm i react-native-push-notification @react-native-community/push-notification-ios

npm i -D @types/react-native-push-notification

npx pod-install
```

[android] [따라할 것](https://github.com/zo0r/react-native-push-notification)
[ios] [따라할 것](https://github.com/react-native-push-notification/ios)

- firebase 프로젝트 설정 - Admin SDK - Node.js - 새 비공개키 생성 - back 폴더 안에 넣고 app.js 소스 수정
- 안드로이드 앱 설정 후 google-services.json을 android/app에 넣기
- [ios] 아이폰 앱 설정 후 ios/GoogleService-Info.plist 생성
- 배송 완료시 push 알림이 올 것임(에뮬레이터에서는 안 올 수 있음)

[리액트 내비게이션과 연동](https://reactnavigation.org/docs/navigation-container/#linkinggetinitialurl)

App.tsx

```tsx
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});
PushNotification.configure({
  // (optional) 토큰이 생성될 때 실행됨(토큰을 서버에 등록할 때 쓸 수 있음)
  onRegister: function (token: any) {
    console.log("TOKEN:", token);
  },

  // (required) 리모트 노티를 수신하거나, 열었거나 로컬 노티를 열었을 때 실행
  onNotification: function (notification: any) {
    console.log("NOTIFICATION:", notification);
    if (notification.channelId === "riders") {
      // if (notification.message || notification.data.message) {
      //   store.dispatch(
      //     userSlice.actions.showPushPopup(
      //       notification.message || notification.data.message,
      //     ),
      //   );
      // }
    }
    // process the notification

    // (required) 리모트 노티를 수신하거나, 열었거나 로컬 노티를 열었을 때 실행
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) 등록한 액션을 눌렀고 invokeApp이 false 상태일 때 실행됨, true면 onNotification이 실행됨 (Android)
  onAction: function (notification: any) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err: Error) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

// 여러 채널 만들기
PushNotification.createChannel(
  {
    channelId: "riders", // (required)
    channelName: "앱 전반", // (required)
    channelDescription: "앱 실행하는 알림", // (optional) default: undefined.
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created: boolean) =>
    console.log(`createChannel riders returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);
```

## 실기기 사용하기[ch6]

[링크](https://reactnative.dev/docs/running-on-device)

- samsung dex같은 건 끄기
- 핸드폰 usb 연결 시 usb 디버깅 허용하기
- .env에서 ip주소 바꾸기

```shell
adb devices
adb -s <기기이름> reverse tcp:8081 tcp:8081
```

여러 문제 발견 가능

- 폰트가 흰색: style에 color 주기
- vector-icons 안 뜸: 역시 style에 color 주기(ch6 AppInner.tsx 참고)

## 배포 관련

### Android

android/app/build.gradle

```
def enableSeparateBuildPerCPUArchitecture = true

/**
* Run Proguard to shrink the Java bytecode in release builds.
*/
def enableProguardInReleaseBuilds = true
```

package.json

```json
  "scripts": {
    ...
    "build:android": "npm ci && cd android && ./gradlew bundleRelease && cd .. && open android/app/build/outputs/bundle/release",
    "apk:android": "npm ci && cd android && ./gradlew assembleRelease && cd .. && open android/app/build/outputs/apk/release",
```

[출시 과정](https://reactnative.dev/docs/signed-apk-android)

### iOS

iOS 개발자 멤버쉽 가입 필요

[출시 과정](https://reactnative.dev/docs/publishing-to-app-store)

- Xcode로 Archive(이 때 simulator를 선택한 상태이면 안 됨)

### [ios]fastlane

버저닝, 배포 자동화 가능

### CodePush

- 실시간으로 앱 수정 가능(JS코드, 이미지, 비디오만)
- 노드모듈, 네이티브쪽 수정은 앱 배포 필요
- 0.71버전에서 호환 안 되는 이슈 있었으니 조심할 것

[앱센터 가입](https://appcenter.ms/)

- [여기서](https://appcenter.ms/apps/create) 앱 만들기(iOS, Android 따로)

```shell
npm i react-native-code-push
npm install appcenter appcenter-analytics appcenter-crashes
npm i -g appcenter-cli

appcenter login
appcenter codepush deployment list -a su981006-naver.com/food-delivery-app-android -k
```

- appcenter > distribute > codepush
- these instructions 클릭해서 추가 작업
- Staging: 개발용
- Production: 실제제품

- android/app/src/main/assets/appcenter-config.json
- android/app/src/main/res/values/strings.xml 수정
- [추가 작업](https://github.com/microsoft/react-native-code-push/blob/master/docs/setup-android.md)
- [ios] ios/AppCenter-Config.plist
- [ios] [추가 작업](https://github.com/microsoft/react-native-code-push/blob/master/docs/setup-ios.md)

package.json

```json
"codepush:android": "appcenter codepush release-react -a 아이디/앱이름 -d 배포이름 --sourcemap-output --output-dir ./build -m -t 타겟버전",
"codepush:ios": "appcenter codepush release-react -a 아이디/앱이름 -d 배포이름 --sourcemap-output --output-dir ./build -m -t 타겟버전",
"bundle:android": "react-native bundle --assets-dest build/CodePush --bundle-output build/CodePush/index.android.bundle --dev false --entry-file index.js --platform android --sourcemap-output build/CodePush/index.android.bundle.map",
"bundle:ios": "react-native bundle --assets-dest build/CodePush --bundle-output build/CodePush/main.jsbundle --dev false --entry-file index.js --platform ios --sourcemap-output build/CodePush/main.jsbundle.map",
```

- package.json version에 대하여
- "version": "0.0.1" 버전은 점을 기준으로 총 세가지로 나눌 수 있다. 제일 앞의 자리는 메이저 즉, 다른 버전과 호환할 수 없는 자리다. 그 말인 즉슨, "0.0.1" 버전과 "1.0.1" 버전은 호환되지 않는다는 뜻이다. 두번째 중간에 있는 자리는 마이너 자리다. 앞의 자리가 같다면 호환이 가능하도록 수정이 되었지만, 기존 사람들이 버전을 올려도 깨지지 않는다. 마지막 자리는 단순한 버그 패치들이다. 코드푸쉬로 해결할 수 있는 부분은 마지막 세번째 자리를 업그레이드 시키면 된다.
- 앱스토어 출시할 때, 심사 중에는 코드푸쉬 하면 거절되기 때문에 하면 안됨
- 실제 예시는 package.json 참조

App.tsx

```typescript jsx
import CodePush, { CodePushOptions } from "react-native-code-push";

const codePushOptions: CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  // 언제 업데이트를 체크하고 반영할지를 정한다.
  // ON_APP_RESUME은 Background에서 Foreground로 오는 것을 의미
  // ON_APP_START은 앱이 실행되는(켜지는) 순간을 의미
  installMode: CodePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  // 업데이트를 어떻게 설치할 것인지 (IMMEDIATE는 강제설치를 의미)
};
function App() {}

export default CodePush(codePushOptions)(App);
```

## iOS Pod 관련

[맥 전용]ios 폴더 안에서 pod 명령어 수행 가능, but npx pod-install은 프로젝트 폴더 어디서나 가능

- Podfile: 설치할 Pod과 개별설정들 기록
- pod deintegrate: 기존 pod들 제거
- pod update: 기존 pod 버전 업그레이드(pod install 시)
- pod install: npx pod-install 역할 Podfile.lock에 따라 설치
- pod install --repo-update: pod들 설치하면서 최신으로 유지

## 안드로이드 앱 배포 과정

### Hermes 켜기

시작 성능 빨라지고, 메모리 사용량 적고, 앱 사이즈 작아짐

[헤르메스 켜기](https://reactnative.dev/docs/hermes)

```tsx
def enableSeparateBuildPerCPUArchitecture = true
def enableProguardInReleaseBuilds = true

android {
  signingConfigs {  // 추가
    debug {
      storeFile file('debug.keystore')
      storePassword 'android'
      keyAlias 'androiddebugkey'
      keyPassword 'android'
    }
    release {
      if (project.hasProperty('RELEASE_STORE_FILE')) {
          storeFile file(RELEASE_STORE_FILE)
          storePassword RELEASE_STORE_PASSWORD
          keyAlias RELEASE_KEY_ALIAS
          keyPassword RELEASE_KEY_PASSWORD
      }
    }
  }
  buildTypes {
    debug {
      signingConfig signingConfigs.debug // 추가
    }
    release {
      signingConfig signingConfigs.debug // 추가
    }
  }
}
```

### 키 저장소 비밀번호 설정

```shell
keytool -genkey -v -keystore fooddeliveryapp.keystore -alias fooddeliveryappkey -keyalg RSA -keysize 2048 -validity 10000
```

- 키 저장소 비밀번호 입력: su981006
- 인적사항들 입력한 후 마지막 질문에 Y를 눌러준다
- 그러면 android>app에 fooddeliveryapp.keystore 파일이 생성됨(다른 위치에 생성될 수도 있음, 확인 후 위치 변경해주기)

- android > gradle.properties 파일에 추가하기

```
RELEASE_STORE_FILE=fooddeliveryapp.keystore
RELEASE_KEY_ALIAS=fooddeliveryappkey
RELEASE_STORE_PASSWORD=su981006
RELEASE_KEY_PASSWORD=su981006
```

- android > app > build.gradle lintOptions 추가

```
android {
  lintOptions {
    checkReleaseBuilds false
    // Or, if you prefer, you can continue to check for errors in release builds,
    // but continue the build even when errors are found:
    abortOnError false
  }
}
```

- package.json

```json
"scripts": {
  "aab:android": "npm ci && cd android && ./gradlew bundleRelease && cd .. && open android/app/build/outputs/bundle/release",
  "apk:android": "npm ci && cd android && ./gradlew assembleRelease && cd .. && open android/app/build/outputs/apk/release",
}
```

# 꿀팁들

- [patch-package](https://www.npmjs.com/package/patch-package): 노드모듈즈 직접 수정 가능, 유지보수 안 되는 패키지 업데이트 시 유용, 다만 patch-package한 패키지는 추후 버전 안 올리는 게 좋음
- [Sentry](https://sentry.io/): 배포 시 React Native용으로 붙여서 에러 모니터링하면 좋음(무료 지원)
- [react-native-upgrade helper](https://react-native-community.github.io/upgrade-helper/): 버전 업그레이드 방법 나옴

## 에러들

### Error: listen EADDRINUSE: address already in use :::8081

이미 메트로 서버가 다른 데서 켜져 있는 것임. 메트로 서버를 실행하고 있는 터미널 종료하기

### npm run android 시 Running jetifier to migrate libraries to AndroidX.쪽에서 안 넘어가는 경우

메트로 서버 꺼볼 것

### 완료처리 시 "유효하지 않은 주문입니다."

axios@0.24 설치(axios@0.25.0에 문제 있음)
[링크](https://github.com/axios/axios/issues/4406)

### java.lang.RuntimeException: Unable to load script. Make sure you're either running Metro (run 'npx react-native start') or that your bundle 'index.android.bundle' is packaged correctly for release.

- android/app/src/main/assets 폴더 만들기

```shell
cd android
./gradlew clean
cd ..
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle
```

### Execution failed for task ':app:packageDebug'. > java.lang.OutOfMemoryError (no error message)

android/gradle.properties에 다음 줄 추가

```
org.gradle.jvmargs=-XX\:MaxHeapSize\=1024m -Xmx1024m
```

또는

android/app/src/main/AndroidManifest.xml 에서 <application> 태그에 android:largeHeap="true" 추가

### warn No apps connected. Sending "reload" to all React Native apps failed. Make sure your app is running in the simulator or on a phone connected via USB.

```
npx react-native start --reset-cache
cd android && ./gradlew clean
cd ..
npx react-native run-android
```

### ERR_OSSL_DSO_COULD_NOT_LOAD_THE_SHARED_LIBRARY

윈도에서 발생하는 에러인데 choco로 openssl 다시 설치하기

### Error: spawn ./gradlew EACCES

```shell
chmod 755 android/gradlew
```

### error: bundling failed: TypeError: Cannot read property 'transformFile' of undefined

node.js 16버전으로 할 것, node 17버전부터 해당 에러 발생함.

### ERROR Invariant Violation: Module AppRegistry is not a registered callable module (calling runApplication)

보통 App.tsx 부분이 여러번 실행되어서 발생함. Metro 서버를 껐다가 켜고, 에뮬레이터에서 앱을 지웠다가 다시 설치하면 해결 됨

### Manifest merger failed : android:exported needs to be explicitly specified for element <receiver#com.dieam.reactnativepushnotification.modules.RNPushNotificationBootEventReceiver>. Apps targeting Android 12 and higher are required to specify an explicit value for `android:exported` when the corresponding component has an intent filter defined

[링크](https://www.inflearn.com/questions/630107)

## 스스로 해보면 좋을 것

- loading, disabled 처리 모두 다 하기
- 내 위치 앱 시작하고 권한 있을 때 미리 받아놓기
- refreshtoken이 만료되면 어떻게?(현재는 무한 419뜸)
