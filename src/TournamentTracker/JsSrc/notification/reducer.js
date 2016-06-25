import * as notificationActions from './actions';

//TODO: write tests
export default function(state, action) {
    if (!state)
        state = {
            notifications: [],
            isNotificationLoading: false
        }; 

    switch (action.type) {
        case notificationActions.REQUEST_NOTIFICATIONS:
            return Object.assign({}, state, requestNotifications(action)); 
        case notificationActions.RECEIVE_NOTIFICATIONS:
            return Object.assign({}, state, receiveNotifications(action)); 
    }

    return state;
}

function requestNotifications(){
    return{
        isNotificationLoading: true
    }
}

function receiveNotifications(action){
    return{
        isNotificationLoading: false,
        notifications: action.notifications
    }
}