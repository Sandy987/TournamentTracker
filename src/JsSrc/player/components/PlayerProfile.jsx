import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Paper from 'material-ui/Paper';
import MatchList from '../../match/components/MatchList';
import {connect} from 'react-redux';

const PlayerProfile = React.createClass({
    mixins: [PureRenderMixin],
    
    render: function(){
        if (this.props.isRetrievingChallenges)
        {
        return <div classname="loading"></div>;
        } else if(!this.props.player || !this.props.matches){
            return <div>Player or matches not found</div>;
        } else {
            const player = this.props.player;
            return <Paper zDepth={2}>
                <div className="tt-player-profile" >
                    <div><span className="bold-text">Player Name: </span><span>{this.props.player.PlayerName}</span></div>
                    <div><span className="bold-text">Player ELO: </span><span>{this.props.player.PlayerElo}</span></div>
                    <div><span className="bold-text">Wins: </span><span>{this.props.player.PlayerWins}</span></div>
                    <div><span className="bold-text">Losses: </span><span>{this.props.player.PlayerLoses}</span></div>
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
        matches: !state.matches.isRetrievingMatchHistory ? state.matches.matches.filter((x) => x.PlayerOneId === pId || x.PlayerTwoId === pId) : null
    }
}

export default connect(mapStateToProps)(PlayerProfile);