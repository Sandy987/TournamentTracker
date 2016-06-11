import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';
import ActiveUserReducer from './reducers/activeuser_reducer';
import MatchesReducer from './reducers/matches_reducer';
import PlayersReducer from './reducers/player_reducer';

export default combineReducers({
    form: FormReducer,
    activeUser: ActiveUserReducer,
    matches: MatchesReducer,
    players: PlayersReducer
})