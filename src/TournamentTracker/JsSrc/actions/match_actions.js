export const REQUEST_MATCH_HISTORY = 'REQUEST_MATCH_HISTORY';
export const RECEIVE_MATCH_HISTORY = 'RECEIVE_MATCH_HISTORY';

export function requestMatchHistory(playerId){
    return{
        type: REQUEST_MATCH_HISTORY,
        playerId: playerId
    }
}

export function receiveMatchHistory(playerId, matches){
    return{
        type: RECEIVE_MATCH_HISTORY,
        playerId: playerId,
        matches: matches
    }
}


export function initiateLoadMatchHistory(playerId){
    return function(dispatch){

        //First dispatch: app state is updated to informat that api call is starting
        dispatch(requestMatchHistory(playerId));

        //TODO: update so it works with the real api
        return fetch(`/api/match/${playerId}`)
          .then(response => response.json())
          .then(response =>
              dispatch(receiveMatchHistory(playerId, response.matches))
          )
          .catch(err => 
              dispatch(receiveMatchHistory(playerId, null)) //TODO: Do this better
          );
    }
}