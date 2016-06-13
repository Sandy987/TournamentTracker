import checkStatus from '../utils/check_http_status';

export const REQUEST_MATCH = 'REQUEST_MATCH';
export const RECEIVE_MATCH = 'RECEIVE_MATCH';

export const REQUEST_MATCH_HISTORY = 'REQUEST_MATCH_HISTORY';
export const RECEIVE_MATCH_HISTORY = 'RECEIVE_MATCH_HISTORY';

export const REQUEST_MATCH_SCORE_UPDATE = 'REQUEST_MATCH_SCORE_UPDATE';
export const RECEIVE_MATCH_SCORE_UPDATE = 'RECEIVE_MATCH_SCORE_UPDATE';

export function requestMatch(matchId){
    return{
        type: REQUEST_MATCH,
        matchId: matchId
    }
}

export function receiveMatch(match){
    return{
        type: RECEIVE_MATCH,
        match: match
    }
}

export function initiateLoadMatch(matchId){
    return function(dispatch){

        //First dispatch: app state is updated to informat that api call is starting
        dispatch(requestMatch(matchId));

        //TODO: update so it works with the real api
        return fetch(`/api/match/${matchId}`,{
            credentials: 'same-origin'
        })
            .then(checkStatus)
            .then(response => response.json())
            .then(response =>
                dispatch(receiveMatch(response.match))
            )
            .catch(err => 
                dispatch(receiveMatch(null)) //TODO: Do this better
            );
    }
}

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

        return fetch(`/api/match/GetByPlayer/${playerId}`)
            .then(checkStatus)
            .then(response => response.json())
            .then(response =>
                {
                    return dispatch(receiveMatchHistory(playerId, response));
                }
            )
            .catch(err => 
                {
                    return dispatch(receiveMatchHistory(playerId, null)); //TODO: Do this better
                }
            );
    }
}

export function requestMatchScoreUpdate(matchId){
    return{
        type: REQUEST_MATCH_SCORE_UPDATE,
        matchId: matchId
    }
}

export function receiveMatchScoreUpdate(status, matchId, playerOneScore, playerTwoScore){
    return{
        type: RECEIVE_MATCH_SCORE_UPDATE,
        matchId: matchId,
        playerOneScore: playerOneScore,
        playerTwoScore: playerTwoScore
    }
}

export function initiateMatchScoreUpdate(matchId, playerOneId, playerOneScore, playerTwoId, playerTwoScore){
    return function(dispatch){

        //First dispatch: app state is updated to informat that api call is starting
        dispatch(requestMatchScoreUpdate(matchId));

        //TODO: update so it works with the real api
        return fetch(`/api/match/`,{
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                Id: matchId,
                PlayerOneId: playerOneId,
                PlayerOneScore: playerOneScore,
                PlayerTwoId: playerTwoId,
                PlayerTwoScore: playerTwoScore
            })
        })
            .then(checkStatus)
            .then(response => response.json())
            .then(response =>
                dispatch(receiveMatchScoreUpdate(true, matchId, playerOneScore, playerTwoScore))
            )
            .catch(err => 
                dispatch(receiveMatchScoreUpdate(false)) //TODO: Do this better
            );
    }
}