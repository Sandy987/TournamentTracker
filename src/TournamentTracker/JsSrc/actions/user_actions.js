import checkStatus from '../utils/check_http_status';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const RECEIVE_ACTIVE_USER = 'RECEIVE_ACTIVE_USER';

export function requestLogin(){
    return{
        type: REQUEST_LOGIN
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


        return fetch(`/account/apilogin`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Email: email, Password: password, RememberMe: rememberMe})
        })
            .then(checkStatus)
            .then(response => response.text())
            .then(userId =>
                fetch(`/api/user/${userId}`, {
                    credentials: 'same-origin'
                })
                    .then(checkStatus)
                    .then(response => {
                        return response.json();
                    })
                    .then(user => {
                        return dispatch(receiveActiveUser(user))
                    })
            )
            .catch(err => 
                dispatch(loginFailed(err.message))
            );
    }
}