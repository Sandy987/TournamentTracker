import {expect} from 'chai';
import activeuserReducer from '../../JsSrc/reducers/activeuser_reducer'
import {requestLogin, receiveActiveUser} from '../../JsSrc/actions/user_actions'

describe('activeuser_reducer', () =>{
    it('handles REQUEST_LOGIN', () =>{
        const initialState = {};
        const action = requestLogin('username', 'password', true);

        const nextState = activeuserReducer(initialState, action);
        
        expect(nextState.isLoggingIn).to.be.true;
        expect(nextState.user).to.be.null;
    });

    it('handles RECEIVE_ACTIVE_USER with success status', () =>{
        const initialState = {};
        const user = {name: 'Username'};

        const action = receiveActiveUser(user, true);

        const nextState = activeuserReducer(initialState, action);
      
        expect(nextState.isLoggingIn).to.be.false;
        expect(nextState.user).to.equal(user);
    });

    it('handles RECEIVE_ACTIVE_USER with fail status', () =>{
        const initialState = {};
        const action = receiveActiveUser(null, false);

        const nextState = activeuserReducer(initialState, action);
      
        expect(nextState.isLoggingIn).to.be.false;
        expect(nextState.user).to.be.null;
    });
   
});