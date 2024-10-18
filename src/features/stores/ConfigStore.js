import { combineReducers } from 'redux';

import systemConfigSlice from '../domains/config/slices/systemConfigSlice';

const configReducer = combineReducers({
  systemConfig: systemConfigSlice.reducer,
});

export default configReducer;
