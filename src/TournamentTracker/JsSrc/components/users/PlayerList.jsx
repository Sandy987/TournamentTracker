import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ProfileCard from './ProfileCard';

export default PlayerList = React.createClass({
    mixins: [PureRenderMixin],
    propTypes = {
        players: React.PropTypes.arrayOf(React.PropTypes.object)
    },
    render: function(){
        return <div class="player-list">
           {this.props.players.map((player) =>
               <ProfileCard playerName={player.playerName} playerRank={player.playerRank} />
               )}
        </div>;
    }
});


