import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Paper from 'material-ui/Paper';
import MatchList from '../matches/MatchList';
import {connect} from 'react-redux';

const PlayerProfile = React.createClass({
    mixins: [PureRenderMixin],
    
    render: function(){
        if (this.props.playerLoading || this.props.matchesLoading){
            return <div>Loading Spinner</div>;
        } else if(!this.props.player){
            return <div>Player not found</div>;
        } else {
            const player = this.props.player;
            return <Paper zDepth={2}>
                <div className="tt-player-profile" >
                    <div>{this.props.player.PlayerName}</div>
                    <div>{this.props.player.PlayerElo}</div>
                    <div>{this.props.player.PlayerWins}</div>
                    <div>{this.props.player.PlayerLoses}</div>
                </div>
                <MatchList matches={this.props.matches}/>
            </Paper>;
        }
    }
});

function mapStateToProps(state, ownProps){
    const pId = ownProps.params.playerId;
    return{
        playerId: pId,
        playerLoading: state.players.isPlayersLoading,
        player: !state.players.isPlayersLoading ? state.players.players.find((p) => p.Id === pId) : null,
        matchesLoading: state.matches.isRetrievingMatchHistory,
        matches: !state.matches.isRetrievingMatchHistory ? state.matches.matches.find((x) => x.PlayerOneId === pId || x.PlayerTwoId === pId) : null
    }
}

export default connect(mapStateToProps)(PlayerProfile);