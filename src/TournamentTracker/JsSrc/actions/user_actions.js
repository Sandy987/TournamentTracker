export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_ACTIVE_USER = 'RECEIVE_ACTIVE_USER';

export function requestLogin(){
    return{
        type: REQUEST_LOGIN
    }
}

export function receiveActiveUser(user){
    return{
        type: RECEIVE_ACTIVE_USER,
        user: user
    }
}

//TODO: Update the contents of this to make sure it actually works with the api
export function initiateLogin(email, password, rememberMe){
    return function(dispatch){

        //First dispatch: app state is updated to informat that api call is starting
        dispatch(requestLogin());


        return fetch(`/account/apilogin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Email: email, Password: password, RememberMe: rememberMe})
        })
          .then(response =>
              fetch(`/api/user/${response.text()}`)
                    .then(response => {
                        return response.json();
                    })
                    .then(user => {
                        return dispatch(receiveActiveUser(user))
                    })
          )
          .catch(err => 
              dispatch(receiveActiveUser(null)) //TODO: Do this better
          );
    }
}