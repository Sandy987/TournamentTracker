import * as userActions from '../actions/user_actions';
import {push} from 'react-router-redux'

export default store => next => action => {
    if (action.type == userActions.LOGIN_FAILED){
         store.dispatch(push('/login'));
    }
    return next(action); //This sends the action to the store after middleware is complete
}