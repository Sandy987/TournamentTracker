import {push} from 'react-router-redux';

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

        if (action.path.includes('/player/')){
            var playerId = action.path.replace('/player/', '');
            store.dispatch(matchActions.initiateLoadMatchHistory(playerId));
        }
        else if(action.path.includes('/notifications/')){
            var playerId = action.path.replace('/notifications/', '');
            store.dispatch(notificationActions.initiateLoadNotifications(playerId));
        }
    } 
    return next(action); //This sends the action to the store after middleware is complete
}