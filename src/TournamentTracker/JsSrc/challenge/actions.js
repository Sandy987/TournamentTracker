import checkStatus from '../utils/check_http_status';
export const REQUEST_CHALLENGE_PLAYER = 'challenge/REQUEST_CHALLENGE_PLAYER';
export const RECEIVE_CHALLENGE_PLAYER = 'challenge/RECEIVE_CHALLENGE_PLAYER';
export const REQUEST_CHALLENGES = 'challenge/REQUEST_CHALLENGES';
export const RECEIVE_CHALLENGES = 'challenge/RECEIVE_CHALLENGES';

export const REQUEST_CHALLENGE_ACCEPT = 'challenge/REQUEST_CHALLENGE_ACCEPT';
export const RECEIVE_CHALLENGE_ACCEPT = 'challenge/RECEIVE_CHALLENGE_ACCEPT';

export const REQUEST_CHALLENGE_DECLINE = 'challenge/REQUEST_CHALLENGE_DECLINE';
export const RECEIVE_CHALLENGE_DECLINE = 'challenge/RECEIVE_CHALLENGE_DECLINE';

export const REQUEST_CHALLENGE_COMPLETE = 'challenge/REQUEST_CHALLENGE_COMPLETE';
export const RECEIVE_CHALLENGE_COMPLETE = 'RECEIVE_CHALLENGE_COMPLETE';

export const OPEN_CHALLENGE_DIALOG = 'challenge/OPEN_CHALLENGES_DIALOG';
export const CLOSE_CHALLENGE_DIALOG = 'challenge/CLOSE_CHALLENGES_DIALOG';


export function openChallengeDialog(){
    return {
        type: OPEN_CHALLENGE_DIALOG
    }
}

export function closeChallengeDialog(){
    return {
        type: CLOSE_CHALLENGE_DIALOG
    }
}

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
        challenges: challenges
    }
}

//request to accept a challenge
export function requestChallengeAccept(){
    return{
        type: REQUEST_CHALLENGE_ACCEPT
    }
}

export function receiveChallengeAccept(challengeId){
    return{
        type: RECEIVE_CHALLENGE_ACCEPT,
        challengeId: challengeId
    }
}

//request to decline a challenge
export function requestChallengeDecline(){
    return{
        type: REQUEST_CHALLENGE_DECLINE
    }
}

export function receiveChallengeDecline(challengeId){
    return{
        type: RECEIVE_CHALLENGE_DECLINE,
        challengeId: challengeId
    }
}

//request to complete a challenge
export function requestChallengeComplete(){
    return{
        type: REQUEST_CHALLENGE_COMPLETE
    }
}

export function receiveChallengeComplete(challengeId){
    return{
        type: RECEIVE_CHALLENGE_COMPLETE,
        challangeId: challengeId
    }
}


export function initiateAcceptChallenge(challengeId, playerId) {
     return function(dispatch){
            dispatch(requestChallengeAccept());
            //TODO: update so it works with the real api
            return fetch(`/api/challenge/${challengeId}/accept`,{
                method: 'POST',
                credentials: 'same-origin'
            })
            .then(checkStatus)
            .then(r =>{
                dispatch(receiveChallengeAccept(challengeId));
                dispatch(initiateLoadChallenges(playerId));
            })
            .catch(err => 
                dispatch(receiveChallengeAccept(null)) //TODO: Do this better
            );
     }
}

export function initiateDeclineChallenge(challengeId, playerId) {
     return function(dispatch){
            dispatch(requestChallengeDecline());
            //TODO: update so it works with the real api
            return fetch(`/api/challenge/${challengeId}/decline`,{
                method: 'POST',
                credentials: 'same-origin'
            })
            .then(checkStatus)
            .then(r =>{
                dispatch(receiveChallengeDecline(challengeId));
                dispatch(initiateLoadChallenges(playerId));
            })
            .then(dispatch(initiateLoadChallenges(playerId)))
            .catch(err => 
                dispatch(receiveChallengeDecline(null)) //TODO: Do this better
            );
     }
}


export function initiateCompleteChallenge(challengeId, playerId) {
     return function(dispatch){
            dispatch(requestChallengeComplete());
            //TODO: update so it works with the real api
            return fetch(`/api/challenge/${challengeId}/complete`,{
                method: 'POST',
                credentials: 'same-origin'
            })
            .then(checkStatus)
            .then(r =>{
                dispatch(receiveChallengeComplete(challengeId));
                dispatch(initiateLoadChallenges(playerId));
            })
            .then(dispatch(initiateLoadChallenges(playerId)))
            .catch(err => 
                dispatch(receiveChallengeComplete(null)) //TODO: Do this better
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
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({SendingPlayerId: challengerId, ReceivingPlayerId: challangeeId})
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