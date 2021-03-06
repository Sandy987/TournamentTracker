import * as matchActions from '../actions/match_actions';
import * as playerActions from '../actions/player_actions';
import * as notificationActions from '../actions/notification_actions';
import * as challengeActions from '../actions/challenge_actions';

//TODO: This is super bad. We shouldn't be loading data everytime we navigate to the page, we should be smarter about this.
export default store => next => action => {
    if (action.type === 'NAVIGATE'){
        if (action.path.includes('/home')){
            store.dispatch(playerActions.initiateLoadPlayers());
        }
        if (action.path.includes('/player/')){
            var playerId = action.path.replace('/player/', '');
            store.dispatch(playerActions.initiateLoadPlayers());
            store.dispatch(matchActions.initiateLoadMatchHistory(playerId));
        }
        else if(action.path.includes('/notifications/')){
            var playerId = action.path.replace('/notifications/', '');
            store.dispatch(notificationActions.initiateLoadNotifications(playerId));
        }
        else if (action.path.includes('/challenges')){
            var playerId = store.getState().activeUser ? store.getState().activeUser.user.Id : null;
            store.dispatch(challengeActions.initiateLoadChallenges(playerId));
            store.dispatch(matchActions.initiateLoadMatchHistory(playerId));
        }
         else if (action.path.includes('/account')){
            var playerId = store.getState().activeUser ? store.getState().activeUser.user.Id : null;
            store.dispatch(playerActions.initiateLoadPlayers());
            store.dispatch(matchActions.initiateLoadMatchHistory(playerId));
        }
    } 
    return next(action); //This sends the action to the store after middleware is complete
}