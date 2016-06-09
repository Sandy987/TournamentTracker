import {expect} from 'chai';
import activeuserReducer from '../../JsSrc/reducers/activeuser_reducer'
import {requestLogin, receiveLogin} from '../../JsSrc/actions/user_actions'

describe('activeuser_reducer', () =>{
    it('handles REQUEST_LOGIN', () =>{
        const initialState = {};
        const action = requestLogin('username', 'password', true);

        const nextState = pingReducer(initialState, action);
        
        expect(nextState.isLoggingIn).to.be.true;
        expect(nextState.user).to.be.null;
    });

    it('handles RECEIVE_LOGIN with success status', () =>{
        const initialState = {};
        const user = {name: 'Username'};

        const action = receiveLogin(true, 'OK', user);

        const nextState = pingReducer(initialState, action);
      
        expect(nextState.isLoggingIn).to.be.false;
        expect(nextState.user).to.equal(user);
    });

    it('handles RECEIVE_LOGIN with fail status', () =>{
        const initialState = {};
        const action = receiveLogin(false, 'NOT OK', null);

        const nextState = pingReducer(initialState, action);
      
        expect(nextState.isLoggingIn).to.be.false;
        expect(nextState.user).to.be.null;
        expect(nextState.message).to.equal('NOT OK');
    });
   
});