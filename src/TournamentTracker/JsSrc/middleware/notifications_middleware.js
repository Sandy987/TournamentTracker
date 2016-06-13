import * as challengeActions from '../actions/challenge_actions';
import * as notificationActions from '../actions/notification_actions';

export default store => next => action => {
    if (action.type === challengeActions.RECEIVE_CHALLENGE_ACCEPT){
        store.dispatch(notificationActions.initiateLoadNotifications(store.getState().activeUser.user.Id));
    }
    return next(action); //This sends the action to the store after middleware is complete
};