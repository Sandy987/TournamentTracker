import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],

    propTypes:{
        winningPlayer: React.PropTypes.object.isRequired,
        losingPlayer: React.PropTypes.object.isRequired,
        matchTime: React.PropTypes.any.isRequired //TODO: This should be a date?
    },

    render: function(){
        return <div class="match-card">
           <span className="player-name">{this.props.playerName}</span>
           <span className="player-score">{this.props.playerScore}</span>
        </div>;
    }
});
