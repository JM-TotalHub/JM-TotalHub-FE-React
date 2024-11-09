import { createSlice } from '@reduxjs/toolkit';
import React from 'react';

// 현재 안쓰는 중
// useMediaDevice 로 대체, 혹시 다른 설정에 쓸까봐 냅둠
const systemConfigSlice = createSlice({
  name: 'systemConfigSlice',
  initialState: {
    device: 'desktop',
    screenSize: window.innerWidth,
  },
  reducers: {
    updateScreenSize: (state, action) => {
      const screenSize = action.payload;

      state.screenSize = screenSize;

      if (screenSize < 768) {
        state.device = 'mobile';
      } else if (screenSize >= 768 && screenSize <= 1024) {
        state.device = 'tablet';
      } else {
        state.device = 'desktop';
      }
    },
  },
});

export const { updateScreenSize } = systemConfigSlice.actions;
export default systemConfigSlice;
