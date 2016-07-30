import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Paper from 'material-ui/Paper';
import * as matchStatus from '../MatchStatus';

const MatchCard = React.createClass({
    mixins: [PureRenderMixin],
    getPlayerView: function(id, name, score, winnerId){
        var className = id === winnerId ? "player-winner" : "";
        return <div className={className}>
                    <div><span className="bold-text">Name: </span><span className="player-name">{name}</span></div>
                    <div><span className="bold-text">Score: </span><span className="player-score">{score}</span></div>
                </div>
    },
    render: function(){
        return <Paper className="match-card" zDepth={2}>
            <div className="tt-match-summary" >
                {this.getPlayerView(this.props.PlayerOneId, this.props.PlayerOneName, this.props.PlayerOneScore, this.props.MatchWinnerId)}
                {this.getPlayerView(this.props.PlayerTwoId, this.props.PlayerTwoName, this.props.PlayerTwoScore, this.props.MatchWinnerId)}
                <div className="match-status">
                    <span className="bold-text">Match Status: </span>
                    <span>{matchStatus.getNameFromStatus(this.props.MatchStatus)}</span>
                </div>
                <div className="match-completion">
                    <span className="bold-text">Match Completion: </span>
                    <span>{this.props.MatchCompletion}</span>
                </div>
            </div>
        </Paper>;
    }
});


export default MatchCard;