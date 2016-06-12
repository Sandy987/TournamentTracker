import * as matchActions from '../actions/match_actions';
import * as playerActions from '../actions/player_actions';
import * as notificationActions from '../actions/notification_actions';

export default store => next => action => {
    if (action.type === 'NAVIGATE'){
        if (action.path.includes('/player/')){
            var playerId = action.path.replace('/player/', '');
            store.dispatch(playerActions.initiateLoadPlayers());
            store.dispatch(matchActions.initiateLoadMatchHistory(playerId));
        }
        else if(action.path.includes('/notifications/')){
            var playerId = action.path.replace('/notifications/', '');
            store.dispatch(notificationActions.initiateLoadNotifications(playerId));
        }
    } 
    return next(action); //This sends the action to the store after middleware is complete
}