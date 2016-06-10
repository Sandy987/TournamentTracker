import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router'; //Use # history instead of HTML5 history API
import {routerMiddleware} from 'react-router-redux';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducer';

import authMiddleware from './middleware/auth_middleware';

import {setState} from './actions/action_creators';
import * as pingActions from './actions/ping_actions';

import routes from './routes';

const loggerMiddleware = createLogger();

const store = createStore(
    reducer,
    applyMiddleware(routerMiddleware(hashHistory),
                    thunkMiddleware, //Lets us dispatch() functions
                    authMiddleware, //Makes sure any failed login actions exit from the app
                    loggerMiddleware) //Neat middleware that logs actions
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/login" component={LoginForm} />
            {routes}
        </Router>
    </Provider>,
document.getElementById('app')
);