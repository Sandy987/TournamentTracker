import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ProfileCard from './ProfileCard';

const PlayerList = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        return <div className="player-list">
           {this.props.players.map((player) => <ProfileCard playerName={player.playerName} playerRank={player.playerRank} /> )}
        </div>;
    }
});


export default PlayerList;