import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router'; //Use # history instead of HTML5 history API
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import injectTapEventPlugin from 'react-tap-event-plugin';

import reducer from './reducer';

import Routes from './routes';

import * as navActions from './navigation/actions';
import * as userActions from './activeUser/actions';

import authMiddleware from './activeUser/middleware';
import fetcherMiddleware from './middleware/fetcher_middleware'; //TODO: Replace fetcher middleware with onEnter actions on the routes
import redirectMiddleware from './navigation/middleware';
import notificationsMiddleware from './notification/middleware';

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const loggerMiddleware = createLogger();

const store = createStore(
    reducer,
    applyMiddleware(routerMiddleware(hashHistory),
                    thunkMiddleware, //Lets us dispatch() functions
                    authMiddleware, //Makes sure any failed login actions exit from the app
                    redirectMiddleware,
                    notificationsMiddleware,
                    fetcherMiddleware,
                    loggerMiddleware) //Neat middleware that logs actions
);

//TODO: Holy shit, this is so bad. We need to figure out a different way of loading the user on app entry
userActions.initiateReceiveCurrentUser()(store.dispatch)
.then(() => {
    const history = syncHistoryWithStore(hashHistory, store);
    history.listen(location => store.dispatch(navActions.routerDidNavigate(location.pathname)));


    ReactDOM.render(
        <Provider store={store}>
            {Routes(history)}
        </Provider>,
    document.getElementById('app')
    );
});

