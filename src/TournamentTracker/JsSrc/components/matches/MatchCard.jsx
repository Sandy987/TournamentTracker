import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const MatchCard = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        return <div class="match-card">
           <span className="player-name">{this.props.playerName}</span>
           <span className="player-score">{this.props.playerScore}</span>
        </div>;
    }
});


export default MatchCard;