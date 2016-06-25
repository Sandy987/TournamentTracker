import * as userActions from './actions';


export default function(state, action) {
    if (!state)
        state = {
            isLoggingIn: false
        }; 

    switch (action.type) {
        case userActions.REQUEST_LOGIN:
            return Object.assign({}, state, requestLogin(action));
        case userActions.REQUEST_REGISTER:
            return Object.assign({}, state, requestLogin(action));
        case userActions.LOGIN_FAILED:
            return Object.assign({}, state, loginFailed(action));
        case userActions.RECEIVE_ACTIVE_USER:
            return Object.assign({}, state, receiveActiveUser(action));
        case userActions.REQUEST_SAVE_USER:
            return Object.assign({}, state, {isSavingUser: true});
        case userActions.RECEIVE_SAVE_USER: //TODO: Maybe we need to do mroe stuff if we received a failed status?
            return Object.assign({}, state, receiveSaveUser(state, action));
        case userActions.LOGOUT_USER:
            return Object.assign({}, state, logoutUser(action));
    }

    return state;
}

function logoutUser(action){
    return {
        user: null,
        isLoggingIn: false
    }
}

function requestLogin(action){
    return {
        user: null,
        isLoggingIn: true
    }
}

function requestRegister(action){
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

function receiveSaveUser(state, action){
    var newUser = Object.assign({}, state.user, action.newUserDetails)
    return {
        user: newUser,
        isSavingUser : false
    }
}