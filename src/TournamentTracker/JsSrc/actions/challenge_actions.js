import checkStatus from '../utils/check_http_status';

export const REQUEST_CHALLENGE_PLAYER = 'REQUEST_CHALLENGE_PLAYER';
export const RECEIVE_CHALLENGE_PLAYER = 'RECEIVE_CHALLENGE_PLAYER';



export const REQUEST_CHALLENGES = 'REQUEST_CHALLENGES';
export const RECEIVE_CHALLENGES = 'RECEIVE_CHALLENGES';

//TODO: Do these properly
export function requestChallengePlayer(){
    return{
        type: REQUEST_CHALLENGE_PLAYER
    }
}

//TODO: Do these properly
export function receiveChallengePlayer(challenge){
    return{
        type: RECEIVE_CHALLENGE_PLAYER,
        challenge: challenge
    }
}

export function requestChallenges(){
    return{
        type: REQUEST_CHALLENGES
    }
}

export function receiveChallenges(challenges){
    return{
        type: RECEIVE_CHALLENGES,
        challenges: challenges
    }
}

export function initiateChallengePlayer(challengerId, challangeeId){
    return function(dispatch){

        //First dispatch: app state is updated to informat that api call is starting
        dispatch(requestChallengePlayer());

        //TODO: update so it works with the real api
        return fetch(`/api/challenge/`,{
            method: 'POST',
            credentials: 'same-origin',
            body: {ChallengerId: challengerId, ChallangeeId: challangeeId}
        })
            .then(checkStatus)
            .then(response => response.json())
            .then(challenge =>
                dispatch(receiveChallengePlayer(challenge))
            )
            .catch(err => 
                dispatch(receiveChallengePlayer(null)) //TODO: Do this better
            );
    }
}

export function initiateLoadChallenges(playerId){
    return function(dispatch){

        //First dispatch: app state is updated to informat that api call is starting
        dispatch(requestChallenges());

        //TODO: update so it works with the real api
        return fetch(`/api/challenge/${playerId}`,{
            credentials: 'same-origin'
        })
            .then(checkStatus)
            .then(response => response.json())
            .then(challenges =>
                dispatch(receiveChallenges(challenges))
            )
            .catch(err => 
                dispatch(receiveChallenges(null)) //TODO: Do this better
            );
    }
}