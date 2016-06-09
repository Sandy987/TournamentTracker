import * as userActions from '../actions/user_actions';


export default function(state, action) {
    if (!state)
        state = {
            isLoggingIn: false
        }; //TODO: Figure out what the default state should be

    switch (action.type) {
        case userActions.REQUEST_LOGIN:
            return Object.assign({}, state, requestLogin(action)); 
        case userActions.RECEIVE_LOGIN:
            return Object.assign({}, state, receiveLogin(action))
    }

    return state;
}

function requestLogin(action){
    return {
        user: null,
        message: 'In progress',
        isLoggingIn: true
    }
}

function receiveLogin(action){
    if (action.status){
        return {
            user: action.user,
            message: null,
            isLoggingIn: false
        }
    } else{
        return {
            user: null,
            message: action.message,
            isLoggingIn: false
        }
    }
}