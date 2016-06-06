import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router'; //Use # history instead of HTML5 history API
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducer';

import {setState} from './actions/action_creators';
import * as pingActions from './actions/ping_actions';

import App from './components/App';
import {HomePageContainer} from './components/HomePage';

const loggerMiddleware = createLogger();

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware, //Lets us dispatch() functions
                    loggerMiddleware) //Neat middleware that logs actions
);

//TODO: Remove. Let's start a ping!
store.dispatch(pingActions.initiatePing());

//You would typically define routes in a seperate file, for obvious reasons
const routes = <Route component ={App}>
    <Route path="/" component={HomePageContainer} />
</Route>;


ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>{routes}</Router>
    </Provider>,
document.getElementById('app')
);