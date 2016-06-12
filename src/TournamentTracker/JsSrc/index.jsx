import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router'; //Use # history instead of HTML5 history API
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducer';

import * as navActions from './actions/nav_actions';

import authMiddleware from './middleware/auth_middleware';
import fetcherMiddleware from './middleware/fetcher_middleware';

import App from './components/App';
import HomePageContainer from './components/HomePage';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';

import PlayerProfile from './components/users/PlayerProfile';
import UserProfileForm from './components/users/UserProfileForm';

import NotificationList from './components/notifications/NotificationList';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const loggerMiddleware = createLogger();



const store = createStore(
    reducer,
    applyMiddleware(routerMiddleware(hashHistory),
                    thunkMiddleware, //Lets us dispatch() functions
                    fetcherMiddleware,
                    authMiddleware, //Makes sure any failed login actions exit from the app
                    loggerMiddleware) //Neat middleware that logs actions
);

const history = syncHistoryWithStore(hashHistory, store);
history.listen(location => store.dispatch(navActions.routerDidNavigate(location.pathname)));


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/" component ={App}>
                <Route path="/" component={HomePageContainer}/>
                <Route path="/account" component={UserProfileForm} />
                <Route path="/player/:playerId" component={PlayerProfile}/>
                <Route path="/notifications/:playerId" component={NotificationList}/>
            </Route>
        </Router>
    </Provider>,
document.getElementById('app')
);