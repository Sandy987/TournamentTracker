import checkStatus from '../utils/check_http_status';

export const REQUEST_PLAYERS = 'REQUEST_PLAYERS';
export const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';

export const UPDATE_PLAYER_FILTER = 'UPDATE_PLAYER_FILTER';

export function requestPlayers(){
    return{
        type: REQUEST_PLAYERS,
    }
}

export function receivePlayers(players){
    return{
        type: RECEIVE_PLAYERS,
        players: players
    }
}

export function updatePlayerFilter(filter){
    return {
        type: UPDATE_PLAYER_FILTER,
        filter: filter
    }
}

export function initiateLoadPlayers(){
    return function(dispatch){

        //First dispatch: app state is updated to informat that api call is starting
        dispatch(requestPlayers());

        dispatch(receivePlayers(getSamplePlayers()))

        //TODO: Update so it works with real api
        // return fetch(`/api/players/`,{
        //     credentials: 'same-origin'
        // })
        //     .then(checkStatus)
        //     .then(response => response.json())
        //     .then(response =>
        //         dispatch(receivePlayers(response.players))
        //     )
        //     .catch(err => 
        //         dispatch(receiveMatch(null)) //TODO: Do this better
        //     );
    }
}

function getSamplePlayers(){
    return [
        {playerName: 'Player One', playerRank: 1000},
        {playerName: 'Player Two', playerRank: 1500},
        {playerName: 'Player Three', playerRank: 500},
        {playerName: 'Player Four', playerRank: 800},
    ];
}