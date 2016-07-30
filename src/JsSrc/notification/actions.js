import checkStatus from '../utils/check_http_status';

export const REQUEST_NOTIFICATIONS = 'notification/REQUEST_NOTIFICATIONS';
export const RECEIVE_NOTIFICATIONS = 'notification/RECEIVE_NOTIFICATIONS';

export function requestNotifications(){
    return{
        type: REQUEST_NOTIFICATIONS,
    }
}

export function receiveNotifications(notifications){
    return{
        type: RECEIVE_NOTIFICATIONS,
        notifications: notifications
    }
}

export function initiateLoadNotifications(playerId){
    return function(dispatch){

        //First dispatch: app state is updated to informat that api call is starting
        dispatch(requestNotifications());

        //TODO: Update so it works with real api
        return fetch(`/api/notification/getallplayer/${playerId}`,{
            credentials: 'same-origin'
        })
            .then(checkStatus)
            .then(response => response.json())
            .then(response =>
                dispatch(receiveNotifications(response))
            )
            .catch(err => 
                dispatch(receiveNotifications(null)) //TODO: Do this better
            );
    }
}