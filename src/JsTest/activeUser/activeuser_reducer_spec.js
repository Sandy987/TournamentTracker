import {expect} from 'chai';
import activeuserReducer from '../../JsSrc/activeUser/reducer'
import {requestLogin, loginFailed, receiveActiveUser} from '../../JsSrc/activeUser/actions'

describe('activeuser_reducer', () =>{
    it('handles REQUEST_LOGIN', () =>{
        const initialState = {};
        const action = requestLogin('username', 'password', true);

        const nextState = activeuserReducer(initialState, action);
        
        expect(nextState.isLoggingIn).to.be.true;
        expect(nextState.user).to.be.null;
    });

    it('handles RECEIVE_ACTIVE_USER', () =>{
        const initialState = {};
        const user = {name: 'Username'};

        const action = receiveActiveUser(user, true);

        const nextState = activeuserReducer(initialState, action);
      
        expect(nextState.isLoggingIn).to.be.false;
        expect(nextState.user).to.equal(user);
    });

    it('handles LOGIN_FAILED', () =>{
        const initialState = {};
        const action = loginFailed( "FAIL");

        const nextState = activeuserReducer(initialState, action);
      
        expect(nextState.isLoggingIn).to.be.false;
        expect(nextState.user).to.be.null;
        expect(nextState.errorMessage).to.equal(action.message);
    });
   
});