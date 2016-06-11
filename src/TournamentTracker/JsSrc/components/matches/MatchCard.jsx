import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Paper from 'material-ui/Paper';

const MatchCard = React.createClass({
    mixins: [PureRenderMixin],
    getPlayerView: function(id, name, score, winnerId){
        var className = id === winnerId ? "player-winner" : "player-loser"
        return <div className={className}>
                    <span className="player-name">{name}</span>
                    <span className="player-score">{score}</span>
                </div>
    },
    render: function(){
        return <Paper zDepth={2}>
            <div className="tt-match-summary" >
                {this.getPlayerView(this.props.playerOneId, this.props.playerOneName, this.props.playerOneScore, this.props.matchWinnerId)}
                {this.getPlayerView(this.props.playerTwoId, this.props.playerTwoName, this.props.playerTwoScore, this.props.matchWinnerId)}
                <div className="match-status">
                    {this.props.matchStatus}
                </div>
                <div className="match-completion">
                    {this.props.matchCompletion}
                </div>
            </div>
        </Paper>;
    }
});


export default MatchCard;