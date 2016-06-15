import * as challengeActions from '../actions/challenge_actions';
import _ from 'lodash';

//TODO: write tests
export default function(state, action) {
    if (!state){
        state = {
            isRetrievingChallenges: false, //TODO: Make this better, we should have one for every player
            challenges: []
        }; 
    }

    switch (action.type) {
        case challengeActions.REQUEST_CHALLENGE_PLAYER:
            return Object.assign({}, state, {isRetrievingChallenges : true}); 
        case challengeActions.RECEIVE_CHALLENGE_PLAYER:
            return Object.assign({}, state, receiveChallengePlayer(state, action)); 
        case challengeActions.REQUEST_CHALLENGES:
            return Object.assign({}, state, requestChallenges(action)); 
        case challengeActions.RECEIVE_CHALLENGES:
            return Object.assign({}, state, receiveChallenges(action)); 
        case challengeActions.REQUEST_CHALLENGE_ACCEPT :
        	return Object.assign({}, state, {}); //TODO: Do something?
		case challengeActions.RECEIVE_CHALLENGE_ACCEPT :
			return Object.assign({}, state, updateChallengeStatus(state, action.challengeId, 'ACCEPT')); //TODO: Make this actually update the status of the challenge in memory?
		case challengeActions.REQUEST_CHALLENGE_DECLINE :
			return Object.assign({}, state, {}); //TODO: Do something?
		case challengeActions.RECEIVE_CHALLENGE_DECLINE :
			return Object.assign({}, state, updateChallengeStatus(state, action.challengeId, 'DECLINE')); //TODO: Make this actually update the status of the challenge in memory?
		case challengeActions.REQUEST_CHALLENGE_COMPLETE:
			return Object.assign({}, state, {}); //TODO: Do something?
		case challengeActions.RECEIVE_CHALLENGE_COMPLETE:
			return Object.assign({}, state, updateChallengeStatus(state, action.challengeId, 'COMPLETE')); //TODO: Make this actually update the status of the challenge in memory?
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

    newChallenges = _.unionWith(newChallenges, [action.challenge], (x,y) => x.Id === y.Id);

    return {
        challenges: newChallenges,
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

//This is bad and inefficient...probably
function updateChallengeStatus(state, challengeId, status){
    if (!challengeId || !status){
        return {}; //Don't change anything
    }
    var challengeToUpdate = state.challenges.find((x) => x.Id === challengeId);
    
    if (!challengeToUpdate){
        return;
    }

    challengeToUpdate = Object.assign({}, challengeToUpdate, {}); //TODO: This is WRONG! We need to know WHO'S state we are updating!!!!

    return{
        challenges : _.unionWith(state.challenges, [challengeToUpdate], (x,y) => x.Id === y.Id) 
    };
}