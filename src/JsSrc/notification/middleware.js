import * as challengeActions from '../challenge/actions';
import * as notificationActions from './actions';

export default store => next => action => {
    if (action.type === challengeActions.RECEIVE_CHALLENGE_ACCEPT || action.type === challengeActions.RECEIVE_CHALLENGE_DECLINE){
        store.dispatch(notificationActions.initiateLoadNotifications(store.getState().activeUser.user.Id));
    }
    return next(action); //This sends the action to the store after middleware is complete
};