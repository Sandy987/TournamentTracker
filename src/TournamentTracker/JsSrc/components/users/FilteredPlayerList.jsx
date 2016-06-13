import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import PlayerList from './PlayerList';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as playerActions from '../../actions/player_actions';
import * as challengeActions from '../../actions/challenge_actions';
import {push} from 'react-router-redux';

const FilteredPlayerList = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        return <Paper zDepth={1}>
            <Paper zDepth={2}>
                <RaisedButton label="Refresh Players" onTouchTap={(e) => this.props.initiateLoadPlayers()} />
                <TextField hintText="Filter Players" onChange={(e) => this.props.updatePlayerFilter(e.target.value)} />
            </Paper>
            <PlayerList 
                players={this.props.filteredPlayers} 
                handlePlayerChallenged={(p) => this.props.initiateChallengePlayer(activeUserId, p.Id)} 
                handlePlayerProfiled={(p) => this.props.push(`/player/${p.Id}`)} />
        </Paper>;
    }
});

const mapDispatchToProps = {
    initiateLoadPlayers: playerActions.initiateLoadPlayers,
    updatePlayerFilter: playerActions.updatePlayerFilter,
    initiateChallengePlayer: challengeActions.initiateChallengePlayer,
    push: push
};

function mapStateToProps(state){
    if (state.players.players){
        return {
            activePlayerId: state.activeUser.user.Id,
            filterText: state.players.filter,
            filteredPlayers: state.players.players.filter((p) => {
                if (state.players.filter && state.players.filter.length > 0){
                    if (p.playerName)
                        return p.playerName.includes(state.players.filter);
                    else
                        return false;
                } else {
                    return true;
                }
            })
        }
    } else{
        return {
            activePlayerId: state.activeUser.user.Id,
            filterText: state.players.filter,
            filteredPlayers: []
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FilteredPlayerList);
