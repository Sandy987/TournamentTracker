import * as actionCreators from '../actions/action_creators';


export default function(state, action) {
    if (!state)
        state = {};

    switch (action.type) {
        case actionCreators.SET_STATE:
            return Object.assign({}, state, action.state); //Merges two states
    }

    return state;
}