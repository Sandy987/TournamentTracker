import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';
import ActiveUserReducer from './activeUser/reducer';
import MatchReducer from './match/reducer';
import PlayerReducer from './player/reducer';
import NotificationReducer from './notification/reducer';
import NavReducer from './navigation/reducer'; 
import ChallengeReducer from './challenge/reducer';

export default combineReducers({
    form: FormReducer,
    routing: routerReducer,
    activeUser: ActiveUserReducer,
    matches: MatchReducer,
    players: PlayerReducer,
    notifications: NotificationReducer,
    nav: NavReducer,
    challenges: ChallengeReducer
})