export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';


export function requestLogin(username, password, rememberMe){
    return{
        type: REQUEST_LOGIN,
        username: username,
        password: password,
        rememberMe: rememberMe
    }
}

export function receiveLogin(status, message, user){
    return{
        type: RECEIVE_LOGIN,
        status: status,
        message: message,
        user: user
    }
}

//TODO: Update the contents of this to make sure it actually works with the api
export function initiateLogin(username, password, rememberMe){
    return function(dispatch){

        //First dispatch: app state is updated to informat that api call is starting
        dispatch(requestLogin(username, password, rememberMe));


        return fetch(`/account/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password, rememberMe: rememberMe})
        })
          .then(response => response.json())
          .then(response =>
              dispatch(receiveLogin(response.status, response.message, response.user))
          )
          .catch(err => 
              dispatch(receiveLogin(false, 'An unexpected error occurred'), null) //TODO: Do this better
          );
    }
}