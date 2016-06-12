import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Paper from 'material-ui/Paper';
import MatchList from '../matches/MatchList';
import {connect} from 'react-redux';
import * as matchActions from '../../actions/match_actions';

const PlayerProfile = React.createClass({
    mixins: [PureRenderMixin],
    
    render: function(){
        if (!this.props.player || !this.props.matches){
            return <div>Loading Spinner</div>;
        } else {
            const player = this.props.player;
            return <Paper zDepth={2}>
                <div className="tt-player-profile" >
                    <div>{player.PlayerName}</div>
                    <div>{player.PlayerElo}</div>
                    <div>{player.PlayerWins}</div>
                    <div>{player.PlayerLoses}</div>
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
        player: !state.players.isPlayersLoading ? state.players.players.find((p) => p.Id === pId) : null,
        matches: !state.matches.isRetrievingMatchHistory ? state.matches.matches.find((x) => x.PlayerOneId === pId || x.PlayerTwoId === pId) : null
    }
}

export default connect(mapStateToProps, matchActions)(PlayerProfile);