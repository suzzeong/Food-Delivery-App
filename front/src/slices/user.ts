import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// store -> reducer(state) -> user slice, order slice
// ex) state.user.email, state.order, state.ui.loading

// action: state를 바꾸는 행위/동작
// dispatch: 그 액션을 실제로 실행하는 함수
// reducer: 액션이 실제로 실행되면 state를 바꾸는 로직

const initialState = {
  name: '',
  email: '',
  accessToken: '',
  money: 0,
  phoneToken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 동기 액션
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
    setMoney(state, action: PayloadAction<number>) {
      state.money = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setPhoneToken(state, action) {
      state.phoneToken = action.payload;
    },
  },
  extraReducers: builder => {
    // 비동기 액션
  },
});

export default userSlice;
