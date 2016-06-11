import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const ProfileCard = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        //TODO: Add profile image? 
        //TODO: Add a buton for initiating challenge?
        return <div className="profile-card">
           <span className="player-name">{this.props.playerName}</span>
           <span className="player-rank">{this.props.playerRank}</span>
        </div>;
    }
});

export default ProfileCard;
