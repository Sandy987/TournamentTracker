import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Paper from 'material-ui/Paper';
import MatchList from '../matches/MatchList';
import UserProfileForm from '../users/UserProfileForm';
import {connect} from 'react-redux';

const AccountForm = React.createClass({
    mixins: [PureRenderMixin],
    
    render: function(){
        if (this.props.playerLoading || this.props.matchesLoading){
            return <div>Loading Spinner</div>;
        } else if(!this.props.player || !this.props.matches){
            return <div>Player or matches not found</div>;
        } else {
            const player = this.props.player;
            return <Paper zDepth={2}>
                <div className="user-profile-form"><UserProfileForm/></div>
                <div className="account-match-list-form"><MatchList matches={this.props.matches}/></div>
            </Paper>;
        }
    }
});

function mapStateToProps(state){
    const pId = state.activeUser.user.Id;
    return{
        playerId: pId,
        playerLoading: state.players.isPlayersLoading,
        player: !state.players.isPlayersLoading ? state.players.players.find((p) => p.Id === pId) : null,
        matchesLoading: state.matches.isRetrievingMatchHistory,
        matches: !state.matches.isRetrievingMatchHistory ? state.matches.matches.filter((x) => x.PlayerOneId === pId || x.PlayerTwoId === pId) : null
    }
}

export default connect(mapStateToProps)(AccountForm);