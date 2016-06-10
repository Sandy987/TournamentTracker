import {REQUEST_LOGIN, RECEIVE_LOGIN, RECEIVE_ACTIVE_USER} from '../actions/user_actions';


export default function(state, action) {
    if (!state)
        state = {
            isLoggingIn: false
        }; 

    switch (action.type) {
        case REQUEST_LOGIN:
            return Object.assign({}, state, requestLogin(action)); 
        case RECEIVE_LOGIN:
            return Object.assign({}, state, receiveLogin(action));
        case RECEIVE_ACTIVE_USER:
            return Object.assign({}, state, receiveActiveUser(action));
    }

    return state;
}

function requestLogin(action){
    return {
        user: null,
        isLoggingIn: true
    }
}

function receiveActiveUser(action){
    if (action.user){
        return {
            user: action.user,
            isLoggingIn: false
        }
    } else{
        return {
            user: null,
            isLoggingIn: false
        }
    }
}