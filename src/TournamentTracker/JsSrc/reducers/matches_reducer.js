import * as matchActions from '../actions/match_actions';

//TODO: write tests
export default function(state, action) {
    if (!state)
        state = {
            isRetrievingMatchHistory: false
        }; 

    switch (action.type) {
        case matchActions.REQUEST_MATCH_HISTORY:
            return Object.assign({}, state, requestMatchHistory(action)); 
        case matchActions.RECEIVE_MATCH_HISTORY:
            return Object.assign({}, state, receiveMatchHistory(action));
        case matchActions.REQUEST_MATCH:
            return Object.assign({}, state, requestMatch(action)); 
        case matchActions.RECEIVE_MATCH:
            return Object.assign({}, state, receiveMatch(action)); 
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

//TODO: Index matches by player id?
function requestMatchHistory(action){
    return {
        matches: null,
        isRetrievingMatchHistory: true
    }
}

function receiveMatchHistory(action){
    if (action.status){
        return {
            matches: action.matches,
            isRetrievingMatchHistory: false
        }
    } else{
        return {
            matches: actions.matches,
            isRetrievingMatchHistory: false
        }
    }
}