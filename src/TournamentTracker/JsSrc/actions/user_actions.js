import checkStatus from '../utils/check_http_status';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const REQUEST_REGISTER = 'REQUEST_REGISTER';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const RECEIVE_ACTIVE_USER = 'RECEIVE_ACTIVE_USER';

export function requestLogin(){
    return{
        type: REQUEST_LOGIN
    }
}

export function requestRegister(){
    return{
        type: REQUEST_REGISTER
    }
}

export function loginFailed(message){
    return {
        type: LOGIN_FAILED,
        message: message
    }
}

export function receiveActiveUser(user){
    return{
        type: RECEIVE_ACTIVE_USER,
        user: user
    }
}

export function initiateLogin(email, password, rememberMe){
    return function(dispatch){

        //First dispatch: app state is updated to informat that api call is starting
        dispatch(requestLogin());


        return fetch(`/api/user/login`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Email: email, Password: password, RememberMe: rememberMe})
        })
            .then(checkStatus)
            .then(response => response.json())
            .then(user =>  dispatch(receiveActiveUser(user)))
            .catch(err => 
                dispatch(loginFailed(err.message))
            );
    }
}

export function initiateRegister(email, password){
    return function(dispatch){

        //First dispatch: app state is updated to informat that api call is starting
        dispatch(requestRegister());


        return fetch(`/api/user/register`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Email: email, Password: password})
        })
            .then(checkStatus)
            .then(response => response.json())
            .then(user =>  dispatch(receiveActiveUser(user)))
            .catch(err => 
                dispatch(loginFailed(err.message))
            );
    }
}