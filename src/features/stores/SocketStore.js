import { combineReducers } from 'redux';
import SocketConnectSlice from '../domains/socket/slices/socketConnectSlice';

const socketReducer = combineReducers({
  socketConnect: SocketConnectSlice.reducer,
});

export default socketReducer;
