import {expect} from 'chai';
import pingReducer from '../../JsSrc/reducers/ping_reducer'

describe('ping_reducer', () =>{
    it('handles PING_API', () =>{
        const initialState = {};
        const action = {
            type: 'PING_API'
        };

        const nextState = pingReducer(initialState, action);
        
        expect(nextState.isPinging).to.be.true;
        expect(nextState.pingReceived).to.be.null;
    });

    it('handles RECEIVE_PING', () =>{
        const initialState = {};
        const action = {
            type: 'RECEIVE_PING',
            receivedAt: new Date(2020,12,12)
        };

        const nextState = pingReducer(initialState, action);
      
        expect(nextState.isPinging).to.be.false;
        expect(nextState.pingReceived.getTime()).to.equal(new Date(2020,12,12).getTime());
    });
   
});