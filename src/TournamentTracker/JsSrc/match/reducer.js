import * as matchActions from './actions';
import _ from 'lodash';

//TODO: write tests
export default function(state, action) {
    if (!state)
        state = {
            isRetrievingMatchHistory: false, //TODO: Make this better, we should have one for every player
            matches: []
        }; 

    switch (action.type) {
        case matchActions.REQUEST_MATCH_HISTORY:
            return Object.assign({}, state, requestMatchHistory(action)); 
        case matchActions.RECEIVE_MATCH_HISTORY:
            return Object.assign({}, state, receiveMatchHistory(state, action));
        case matchActions.REQUEST_MATCH:
            return Object.assign({}, state, requestMatch(action)); 
        case matchActions.RECEIVE_MATCH:
            return Object.assign({}, state, receiveMatch(action)); 
        case matchActions.REQUEST_MATCH_SCORE_UPDATE:
            return Object.assign({}, state, requestMatchScoreUpdate(action)); 
        case matchActions.RECEIVE_MATCH_SCORE_UPDATE:
            return Object.assign({}, state, receiveMatchScoreUpdate(action)); 
    }

    return state;
}

function requestMatch(matchId){
    return{
        activeMatch: null
    }
}

function receiveMatch(match){
    return{
        activeMatch: match
    }
}

function requestMatchHistory(action){
    return {
        isRetrievingMatchHistory: true
    }
}

function receiveMatchHistory(state, action){
    var newMatches;
    if (Array.isArray(state.matches)){
        newMatches = state.matches.splice();
    }
    else {
        newMatches = [];
    }

    newMatches = _.unionWith(newMatches, action.matches, (x,y) => x.Id === y.Id);

    return {
        matches: newMatches,
        isRetrievingMatchHistory: false
    }
}

function requestMatchScoreUpdate(action){
    return{
       //TODO: do something here?
    }
}

//TODO: Do something smart here about updating the match?
function receiveMatchScoreUpdate(action){
    return {

    }
}