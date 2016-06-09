import fetch from 'isomorphic-fetch';

export const PING_API = 'PING_API';
export const RECEIVE_PING = 'RECEIVE_PING';

export function pingApi(){
    return {
        type: PING_API
    }
}

export function receivePing(){
    return{
        type: RECEIVE_PING,
        receivedAt: Date.now()
    }
}

export function initiatePing(){
    return function(dispatch){

        //First dispatch: app state is updated to informat that api call is starting
        dispatch(pingApi());

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch(`/api/ping`)
          //.then(response => response.json())
          .then(response =>

              // We can dispatch many times!
              // Here, we update the app state with the results of the API call.

              dispatch(receivePing())
          )

        // In a real world app, you also want to
        // catch any error in the network call.
    }
}