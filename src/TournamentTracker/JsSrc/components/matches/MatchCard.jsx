import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Paper from 'material-ui/Paper';

const MatchCard = React.createClass({
    mixins: [PureRenderMixin],
    getPlayerView: function(id, name, score, winnerId){
        var className = id === winnerId ? "player-winner" : "";
        return <div className={className}>
                    <span>Name: </span><span className="player-name">{name}</span>
                    <span>Score: </span><span className="player-score">{score}</span>
                </div>
    },
    render: function(){
        return <Paper zDepth={2}>
            <div className="tt-match-summary" >
                {this.getPlayerView(this.props.PlayerOneId, this.props.PlayerOneName, this.props.PlayerOneScore, this.props.MatchWinnerId)}
                {this.getPlayerView(this.props.PlayerTwoId, this.props.PlayerTwoName, this.props.PlayerTwoScore, this.props.MatchWinnerId)}
                <div className="match-status">
                    <span>Match Status: </span>
                    <span>{this.props.MatchStatus}</span>
                </div>
                <div className="match-completion">
                    <span>Match Completion: </span>
                    <span>{this.props.MatchCompletion}</span>
                </div>
            </div>
        </Paper>;
    }
});


export default MatchCard;