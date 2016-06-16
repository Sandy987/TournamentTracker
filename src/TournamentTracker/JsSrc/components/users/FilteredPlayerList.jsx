import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import PlayerList from './PlayerList';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import * as playerActions from '../../actions/player_actions';
import * as challengeActions from '../../actions/challenge_actions';
import {push} from 'react-router-redux';

const FilteredPlayerList = React.createClass({
    mixins: [PureRenderMixin],
    handlePlayerChallenged: function(p){
        this.props.openChallengeDialog();
        this.props.initiateChallengePlayer(this.props.activePlayerId, p.Id);
    },

    render: function(){
        const actions = [<FlatButton label="Ok" onTouchTap={() => this.props.closeChallengeDialog()} primary={true}/>];

        return <Paper zDepth={1}>
            <Paper zDepth={2}>
                <RaisedButton label="Refresh Players" onTouchTap={(e) => this.props.initiateLoadPlayers()} />
                <TextField hintText="Filter Players" onChange={(e) => this.props.updatePlayerFilter(e.target.value)} />
            </Paper>
            <PlayerList 
                players={this.props.filteredPlayers} 
                handlePlayerChallenged={(p) => this.handlePlayerChallenged(p)} 
                handlePlayerProfiled={(p) => this.props.push(`/player/${p.Id}`)} />
            <Dialog
                title="Challenge Sent"
                actions={actions}
                modal={false}
                open={this.props.isDialogOpen}
                onRequestClose={() => this.props.closeChallengeDialog()}
                >
                Challenge Sent
            </Dialog>
        </Paper>;
    }
});

const mapDispatchToProps = {
    initiateLoadPlayers: playerActions.initiateLoadPlayers,
    updatePlayerFilter: playerActions.updatePlayerFilter,
    initiateChallengePlayer: challengeActions.initiateChallengePlayer,
    openChallengeDialog: challengeActions.openChallengeDialog,
    closeChallengeDialog: challengeActions.closeChallengeDialog,
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
            }).sort((x,y) => {
                if (y.PlayerElo === x.PlayerElo){
                    return y.PlayerWins - x.PlayerWins;
                } else{
                    return y.PlayerElo - x.PlayerElo;
                }
            }),
            isDialogOpen: state.challenges.isDialogOpen
        }
    } else{
        return {
            activePlayerId: state.activeUser.user.Id,
            filterText: state.players.filter,
            filteredPlayers: [],
            isDialogOpen: state.challenges.isDialogOpen
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FilteredPlayerList);
