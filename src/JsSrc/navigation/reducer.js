import * as navActions from './actions';

//TODO: write tests
export default function(state, action) {
    if (!state)
        state = {
            players: [],
            isPlayersLoading: false
        }; 

    switch (action.type) {
        case navActions.OPENMENU:
            return Object.assign({}, state, openMenu());
        case navActions.CLOSEMENU:
            return Object.assign({}, state, closeMenu());
    }

    return state;
}

function openMenu(){
    return{
        isMenuOpen: true
    }
}

function closeMenu(){
    return{
        isMenuOpen: false
    }
}