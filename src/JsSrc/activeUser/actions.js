import checkStatus from '../utils/check_http_status';

export const REQUEST_LOGIN = 'activeUser/REQUEST_LOGIN';
export const REQUEST_REGISTER = 'activeUser/REQUEST_REGISTER';
export const LOGIN_FAILED = 'activeUser/LOGIN_FAILED';
export const RECEIVE_ACTIVE_USER = 'activeUser/RECEIVE_ACTIVE_USER';
export const REQUEST_SAVE_USER = 'activeUser/REQUEST_SAVE_USER';
export const RECEIVE_SAVE_USER = 'activeUser/RECEIVE_SAVE_USER';
export const RECEIVE_ACTIVE_USER_COMPLETE = 'activeUser/RECEIVE_ACTIVE_USER_COMPLETE';

export const LOGOUT_USER = 'activeUser/LOGOUT_USER';

export function initiateLogout() {
  return function (dispatch) {
    return fetch('/api/user/logoff', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(checkStatus)
      .then(user => dispatch({ type: LOGOUT_USER }));
  };
}

export function requestLogin() {
  return {
      type: REQUEST_LOGIN,
    };
}

export function requestRegister() {
  return {
      type: REQUEST_REGISTER,
    };
}

export function loginFailed(message) {
  return {
      type: LOGIN_FAILED,
      message,
    };
}

export function receiveActiveUser(user) {
  return {
      type: RECEIVE_ACTIVE_USER,
      user,
    };
}

export function receiveActiveUserComplete() {
  return {
      type: RECEIVE_ACTIVE_USER_COMPLETE,
    };
}

export function initiateReceiveCurrentUser() {
  return function (dispatch) {
      return fetch('/api/user/getcurrentuser', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
              'Accept': 'application/json',
            },
        })
          .then(checkStatus)
          .then(response => response.json())
          .then(user => dispatch(receiveActiveUser(user)))
          .catch(err => {});
    };
}
export function initiateLogin(email, password, rememberMe) {
  return function (dispatch) {
        // First dispatch: app state is updated to informat that api call is starting
      dispatch(requestLogin());


      return fetch('/api/user/login', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          body: JSON.stringify({ Email: email, Password: password, RememberMe: rememberMe }),
        })
          .then(checkStatus)
          .then(response => response.json())
          .then(user => dispatch(receiveActiveUser(user)))
          .then(r => dispatch(receiveActiveUserComplete()))
          .catch(err =>
                err.response.text().then((t) => dispatch(loginFailed(t)))
            );
    };
}

export function initiateRegister(playername, email, password) {
  return function (dispatch) {
        // First dispatch: app state is updated to informat that api call is starting
      dispatch(requestRegister());


      return fetch('/api/user/register', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          body: JSON.stringify({ PlayerName: playername, Email: email, Password: password }),
        })
          .then(checkStatus)
          .then(response => response.json())
          .then(user => dispatch(receiveActiveUser(user)))
          .then(r => dispatch(receiveActiveUserComplete()))
          .catch(err =>
                err.response.text().then((t) => dispatch(loginFailed(t)))
            );
    };
}

export function requestSaveUser() {
  return {
      type: REQUEST_SAVE_USER,
    };
}

// TODO: fill this out? maybe with a status or with the user details
export function receiveSaveUser(status, newDetails) {
  return {
      type: RECEIVE_SAVE_USER,
      newUserDetails: newDetails,
    };
}

export function initiateSaveUserDetails(playerId, playerName, email, userName) {
  return function (dispatch) {
        // First dispatch: app state is updated to informat that api call is starting
      dispatch(requestSaveUser());


      return fetch('/api/user/', {
          method: 'PATCH',
          credentials: 'same-origin',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          body: JSON.stringify({ Id: playerId, PlayerName: playerName, Email: email, UserName: userName }),
        })
          .then(checkStatus)
          .then(user => {
              return dispatch(receiveSaveUser(true, { Id: playerId, PlayerName: playerName, Email: email, UserName: userName }));
            })
          .catch(err =>
            {
              return dispatch(receiveSaveUser(false));
            }
            );
    };
}