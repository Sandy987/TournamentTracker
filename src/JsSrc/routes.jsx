import React from 'react';
import {Router, Route, hashHistory} from 'react-router'; //Use # history instead of HTML5 history API
import {createStore, applyMiddleware} from 'redux';

import App from './App';
import HomePageContainer from './HomePage';
import LoginForm from './activeUser/components/LoginForm';
import RegisterForm from './activeUser/components/RegisterForm';

import PlayerProfile from './player/components/PlayerProfile';
import UserProfileForm from './activeUser/components/UserProfileForm';
import AccountForm from './activeUser/components/AccountForm';

import ChallengesContainer from './challenge/components/ChallengesContainer';

import NotificationList from './notification/components/NotificationList';


export default (history) =>  <Router history={history}>
                <Route path="/login" component={LoginForm}/>
                <Route path="/register" component={RegisterForm} />
                <Route path="/" component ={App}>
                    <Route path="/home" component={HomePageContainer}/>
                    <Route path="/account" component={AccountForm} />
                    <Route path="/challenges" component={ChallengesContainer} />
                    <Route path="/player/:playerId" component={PlayerProfile}/>
                    <Route path="/notifications/:playerId" component={NotificationList}/>
                </Route>
            </Router>