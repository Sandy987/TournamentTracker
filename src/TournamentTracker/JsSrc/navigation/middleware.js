import {push} from 'react-router-redux';
import {initiateReceiveCurrentUser} from '../activeUser/actions'

export default store => next => action => {
    if (action.type === 'NAVIGATE'){
        var isNotLoggingIn = (!store.getState().activeUser || !store.getState().activeUser.isLoggingIn);
        var isNoUser = (!store.getState().activeUser || !store.getState().activeUser.user);
        var isNotOnLoginPageOrRegister = !(action.path.includes("login") || action.path.includes('register'));

        if ((isNotOnLoginPageOrRegister && isNotLoggingIn && isNoUser)){
            store.dispatch(push('/login'));
        }

        if (action.path === '/'){
            if (store.getState().activeUser.user){
                store.dispatch(push('/home'));
            }
        }
    } 
    return next(action); //This sends the action to the store after middleware is complete
}