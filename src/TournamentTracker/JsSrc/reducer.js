import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';
import DefaultReducer from './reducers/default_reducer';
import PingReducer from './reducers/ping_reducer';
import ActiveUserReducer from './reducers/activeuser_reducer';

export default combineReducers({
    default: DefaultReducer,
    form: FormReducer,
    ping: PingReducer,
    activeUser: ActiveUserReducer
})