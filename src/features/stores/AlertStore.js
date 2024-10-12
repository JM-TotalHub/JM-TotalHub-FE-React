import { combineReducers } from 'redux';

import alertStatusSlice from '../domains/alert/slices/alertStatusSlice';

const alertReducer = combineReducers({
  commonAlert: alertStatusSlice.reducer,
});

export default alertReducer;
