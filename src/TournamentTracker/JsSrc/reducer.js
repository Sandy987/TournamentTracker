import {combineReducers} from 'redux';
import DefaultReducer from './reducers/default_reducer';
import PingReducer from './reducers/ping_reducer';

export default combineReducers({
    DefaultReducer,
    PingReducer
})