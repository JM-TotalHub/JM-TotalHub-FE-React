import { createSlice } from '@reduxjs/toolkit';
import React from 'react';

const systemConfigSlice = createSlice({
  name: 'systemConfigSlice',
  initialState: {
    device: 'desktop', // 기본값을 'desktop'으로 설정
    screenSize: window.innerWidth,
  },
  reducers: {
    updateDevice: (state, action) => {
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

export default systemConfigSlice;
