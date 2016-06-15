import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';
import ActiveUserReducer from './reducers/activeuser_reducer';
import MatchesReducer from './reducers/matches_reducer';
import PlayersReducer from './reducers/player_reducer';
import NotificationsReducer from './reducers/notifications_reducer';
import NavReducer from './reducers/nav_reducer'; 
import ChallengesReducer from './reducers/challenges_reducer';

export default combineReducers({
    form: FormReducer,
    routing: routerReducer,
    activeUser: ActiveUserReducer,
    matches: MatchesReducer,
    players: PlayersReducer,
    notifications: NotificationsReducer,
    nav: NavReducer,
    challenges: ChallengesReducer
})