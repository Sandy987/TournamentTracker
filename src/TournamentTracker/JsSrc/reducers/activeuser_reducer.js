import {REQUEST_LOGIN, LOGIN_FAILED, RECEIVE_ACTIVE_USER} from '../actions/user_actions';


export default function(state, action) {
    if (!state)
        state = {
            isLoggingIn: false
        }; 

    switch (action.type) {
        case REQUEST_LOGIN:
            return Object.assign({}, state, requestLogin(action));
        case LOGIN_FAILED:
            return Object.assign({}, state, loginFailed(action));
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

function loginFailed(action){
    return{
        user: null,
        isLoggingIn: false,
        errorMessage: action.message
    }
}

function receiveActiveUser(action){
    return {
        user: action.user,
        isLoggingIn: false
    }
}