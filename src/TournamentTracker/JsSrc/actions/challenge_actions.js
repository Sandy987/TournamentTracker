import checkStatus from '../utils/check_http_status';
import initiateLoadNotifications from './notification_actions'
export const REQUEST_CHALLENGE_PLAYER = 'REQUEST_CHALLENGE_PLAYER';
export const RECEIVE_CHALLENGE_PLAYER = 'RECEIVE_CHALLENGE_PLAYER';
export const REQUEST_CHALLENGES = 'REQUEST_CHALLENGES';
export const RECEIVE_CHALLENGES = 'RECEIVE_CHALLENGES';

export const REQUEST_CHALLENGE_ACCEPT = 'REQUEST_CHALLENGE_ACCEPT';
export const RECEIVE_CHALLENGE_ACCEPT = 'RECEIVE_CHALLENGE_ACCEPT';

export const REQUEST_CHALLENGE_DECLINE = 'REQUEST_CHALLENGE_DECLINE';
export const RECEIVE_CHALLENGE_DECLINE = 'RECEIVE_CHALLENGE_DECLINE';

export const REQUEST_CHALLENGE_COMPLETION_ACCEPT = 'REQUEST_CHALLENGE_COMPLETION_ACCEPT';
export const RECEIVE_CHALLENGE_COMPLETION_ACCEPT = 'RECEIVE_CHALLENGE_COMPLETION_ACCEPT';

export const REQUEST_CHALLENGE_COMPLETION_DECLINE = 'REQUEST_CHALLENGE_COMPLETION_DECLINE';
export const RECEIVE_CHALLENGE_COMPLETION_DECLINE = 'RECEIVE_CHALLENGE_COMPLETION_DECLINE';



//request a challenge against a player
export function requestChallengePlayer(){
    return{
        type: REQUEST_CHALLENGE_PLAYER
    }
}

export function receiveChallengePlayer(challenge){
    return{
        type: RECEIVE_CHALLENGE_PLAYER,
        challenge: challenge
    }
}

//request list of all current challenges
export function requestChallenges(){
    return{
        type: REQUEST_CHALLENGES
    }
}

export function receiveChallenges(challenges){
    return{
        type: RECEIVE_CHALLENGES,
        challenge: challenge
    }
}

//request to accept a challenge
export function requestChallengeAccept(){
    return{
        type: REQUEST_CHALLENGE_ACCEPT
    }
}

export function receiveChallengeAccept(challenge){
    return{
        type: REQUEST_CHALLENGE_ACCEPT,
        challenge: challenge
    }
}

//request to decline a challenge
export function requestChallengeDecline(){
    return{
        type: REQUEST_CHALLENGE_DECLINE
    }
}

export function receiveChallengeDecline(challenge){
    return{
        type: REQUEST_CHALLENGE_DECLINE,
        challenge: challenge
    }
}


export function initiateAcceptChallenge(challengeId) {
     return function(dispatch){
            dispatch(requestChallengeAccept());
            //TODO: update so it works with the real api
            return fetch(`/api/challenge/${challengeId}/accept`,{
                method: 'POST',
                credentials: 'same-origin'
            })
            .then(checkStatus)
            .then(response => response.json())
            .then(challenge =>
                dispatch(receiveChallengeAccept(challenge))
            )
            .then(dispatch())
            .catch(err => 
                dispatch(receiveChallengeAccept(null)) //TODO: Do this better
            );
     }
}

export function initiateDeclineChallenge(challengeId) {
     return function(dispatch){
            dispatch(requestChallengeDecline());
            //TODO: update so it works with the real api
            return fetch(`/api/challenge/${challengeId}/decline`,{
                method: 'POST',
                credentials: 'same-origin'
            })
            .then(checkStatus)
            .then(response => response.json())
            .then(challenge =>
                dispatch(receiveChallengeDecline(challenge))
            )
            .catch(err => 
                dispatch(receiveChallengeDecline(null)) //TODO: Do this better
            );
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
        return fetch(`/api/challenge/GetAllPlayer/${playerId}`,{
            credentials: 'same-origin'
        })
            .then(checkStatus)
            .then(response => response.json())
            .then(challenges =>
                {
                    return dispatch(receiveChallenges(challenges));
                }
            )
            .catch(err => 
                {
                    return dispatch(receiveChallenges(null));
                } //TODO: Do this better
            );
    }
}