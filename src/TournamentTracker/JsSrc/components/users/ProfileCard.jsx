import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes = {
        playerName: React.PropTypes.string.isRequired,
        playerRank: React.PropTypes.number.isRequired
    },
    render: function(){
        //TODO: Add profile image? 
        //TODO: Add a buton for initiating challenge?
        return <div class="profile-card">
           <span className="player-name">{this.props.playerName}</span>
           <span className="player-rank">{this.props.playerRank}</span>
        </div>;
    }
});


