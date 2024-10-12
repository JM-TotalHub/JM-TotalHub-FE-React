import { createSlice } from '@reduxjs/toolkit';

const alertStatusSlice = createSlice({
  name: 'alertStatusSlice',
  initialState: {
    alertStatus: false,
    message: '',
    link: null,
    linkMessage: null,
  },
  reducers: {
    onAlert: (state, action) => {
      state.alertStatus = true;
      state.message = action.payload.message;
      state.link = action.payload.link ? action.payload.link : '';
      state.linkMessage = action.payload.linkMessage
        ? action.payload.linkMessage
        : '이동';
    },
    offAlert: (state, action) => {
      state.alertStatus = false;
      state.message = '';
      state.link = '';
    },
  },
});

export const { onAlert, offAlert } = alertStatusSlice.actions;
export default alertStatusSlice;
