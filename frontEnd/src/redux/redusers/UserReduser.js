// features/currentUserSlice.js
import { createSlice } from '@reduxjs/toolkit';

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: null, // حالة البداية لا يوجد مستخدم مسجل دخول
  reducers: {
    login: (state, action) => {
      // تعيين بيانات المستخدم الحالي
      return action.payload;
    },
    logout: () => {
      // إعادة تعيين الحالة إلى null عند تسجيل الخروج
      return null;
    },
  },
});

export const { login, logout } = currentUserSlice.actions;
export default currentUserSlice.reducer;
