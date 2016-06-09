import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const ProfileCard = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        return <div class="profile-card">
           //TODO: put profile image?
           <span className="player-name">{this.props.playerName}</span>
           <span className="player-score">{this.props.playerScore}</span>
        </div>;
    }
});
