import { combineReducers } from 'redux';
import socketConnectSlice from '../domains/socket/socketConnectSlice';

const socketReducer = combineReducers({
  socketConnect: socketConnectSlice.reducer,
});

export default socketReducer;
