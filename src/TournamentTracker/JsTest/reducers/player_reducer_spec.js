import {expect} from 'chai';
import playerReducer from '../../JsSrc/reducers/player_reducer'
import {requestPlayers, receivePlayers, updatePlayerFilter} from '../../JsSrc/actions/player_actions'

describe('player_reducer', () =>{
    it('handles default state', () => {
        const nextState = playerReducer(initialState, null);
        
        expect(nextState.players).to.be.not.null;
    });

    it('handles REQUEST_PLAYERS', () =>{
        const initialState = {};
        const action = requestPlayers();

        const nextState = playerReducer(initialState, action);
        
        expect(nextState.isLoadingPlayers).to.be.true;
    });

    it('handles RECEIVE_PLAYERS', () =>{
        const initialState = {};
        const players = [{playerName: 'Player1'}, {playerName: 'Player2'}];

        const action = receivePlayers(players);

        const nextState = playerReducer(initialState, action);
      
        expect(nextState.isLoadingPlayers).to.be.false;
        expect(nextState.players).to.equal(players);
    });

    it('handles UPDATE_PLAYER_FILTER', () =>{
        const initialState = {};
        const action = updatePlayerFilter( "FILTER");

        const nextState = playerReducer(initialState, action);
      
        expect(nextState.filter).to.equal("FILTER");
    });
   
});