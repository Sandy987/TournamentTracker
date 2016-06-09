import * as pingActions from '../actions/ping_actions';

export default function(state, action){
    if (!state)
        state = {};

    switch (action.type){
        case pingActions.PING_API:
            return Object.assign({},
                                state,
                                {
                                    isPinging: true,
                                    pingReceived: null
                                });
             
        case pingActions.RECEIVE_PING:
            return Object.assign({},
                                state,
                                {
                                    isPinging: false,
                                    pingReceived: action.receivedAt,
                                });
    }

    return state;
}