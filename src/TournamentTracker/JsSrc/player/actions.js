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

        return fetch(`/api/user/getall`,{
            credentials: 'same-origin'
        })
            .then(checkStatus)
            .then(response => response.json())
            .then(response =>
                dispatch(receivePlayers(response))
            )
            .catch(err => 
                dispatch(receivePlayers(null)) //TODO: Do this better
            );
    }
}