import * as playerActions from '../actions/player_actions';

//TODO: write tests
export default function(state, action) {
    if (!state)
        state = {
            players: [],
            isPlayersLoading: false
        }; 

    switch (action.type) {
        case playerActions.UPDATE_PLAYER_FILTER:
            return Object.assign({}, state, updatePlayerFilter(action));
        case playerActions.REQUEST_PLAYERS:
            return Object.assign({}, state, requestPlayers(action)); 
        case playerActions.RECEIVE_PLAYERS:
            return Object.assign({}, state, receivePlayers(action)); 
    }

    return state;
}

function requestPlayers(){
    return{
        isPlayersLoading: true
    }
}

function receivePlayers(action){
    return{
        isPlayersLoading: false,
        players: action.players
    }
}

function updatePlayerFilter(action){
    return {
        filter: action.filter
    }
}