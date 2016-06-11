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

import App from './components/App';
import HomePageContainer from './components/HomePage';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';

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
                    authMiddleware, //Makes sure any failed login actions exit from the app
                    loggerMiddleware) //Neat middleware that logs actions
);

// const routes = <Route component ={App}>
//     <Route path="/" component={VotingContainer} />
//     <Route path="/results" component={ResultsContainer} />
// </Route>;

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/" component ={App}>
                <Route path="/home" component={HomePageContainer}/>
            </Route>
        </Router>
    </Provider>,
document.getElementById('app')
);