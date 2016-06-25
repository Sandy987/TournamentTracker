import * as userActions from './actions';
import {push} from 'react-router-redux';

export default store => next => action => {
    
    if (action.type === userActions.RECEIVE_ACTIVE_USER_COMPLETE && !store.getState().activeUser.isLoggingIn){
        store.dispatch(push('/home'));
    } else if (action.type === userActions.LOGOUT_USER){
        store.dispatch(push('/login'));
    }
    return next(action); //This sends the action to the store after middleware is complete
};