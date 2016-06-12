import * as challengeActions from '../actions/challenge_actions';

//TODO: write tests
export default function(state, action) {
    if (!state)
        state = {
            isRetrievingChallenges: false, //TODO: Make this better, we should have one for every player
            challenges: []
        }; 

    switch (action.type) {
        case matchActions.REQUEST_CHALLENGE_PLAYER:
            return Object.assign({}, state, {isRetrievingChallenges : true}); //TODO: Do something
        case matchActions.RECEIVE_CHALLENGE_PLAYER:
            return Object.assign({}, state, receiveChallengePlayer(state, action)); //TODO: Do something
        case matchActions.REQUEST_CHALLENGES:
            return Object.assign({}, state, requestChallenges(action)); 
        case matchActions.RECEIVE_CHALLENGES:
            return Object.assign({}, state, receiveChallenges(action)); 
    }

    return state;
}

function receiveChallengePlayer(state, action){
    if (!action.challenge)
        return {isRetrievingChallenges: false};

    var newChallenges;
    if (Array.isArray(state.challenges)){
        newChallenges = state.challenges;
    }
    else {
        newChallenges = [];
    }

    return {
        challenges: newChallenges.concat([action.challenge]),
        isRetrievingChallenges: false
    }
}

function requestChallenges(action){
    return {
        isRetrievingChallenges : true
    }
}

function receiveChallenges(action){
    return {
        isRetrievingChallenges: false,
        challenges: action.challenges ? action.challenges : []
    }
}