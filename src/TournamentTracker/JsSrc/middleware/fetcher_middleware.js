import * as matchActions from '../actions/match_actions';

export default store => next => action => {
    if (action.type === 'NAVIGATE'){
        if (action.path.includes('/player/')){
            var playerId = action.path.replace('/player/', '');
            store.dispatch(matchActions.initiateLoadMatchHistory(playerId));
        }
    } 
    return next(action); //This sends the action to the store after middleware is complete
}