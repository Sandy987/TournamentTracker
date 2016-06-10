import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const MatchCard = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        //TODO: Add profile image? 
        //TODO: Add a buton for initiating challenge?
        return <div class="profile-card">
           <span className="player-name">{this.props.playerName}</span>
           <span className="player-score">{this.props.playerScore}</span>
        </div>;
    }
});
