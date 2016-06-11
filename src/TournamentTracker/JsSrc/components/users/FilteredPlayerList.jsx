import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import PlayerList from './PlayerList';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as playerActions from '../../actions/player_actions';

const FilteredPlayerList = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        return <div >
            <RaisedButton label="Load Players" onClick={(e) => this.props.initiateLoadPlayers()} />
            <TextField hintText="Filter Players" onChange={(e) => this.props.updatePlayerFilter(e.target.value)} />
            <PlayerList players={this.props.filteredPlayers} />
        </div>;
    }
});

function mapStateToProps(state){
    return {
        filterText: state.players.filter,
        filteredPlayers: state.players.players.filter((p) => {
            if (state.players.filter && state.players.filter.length > 0){
                return p.playerName.includes(state.players.filter);
            } else {
                return true;
            }
        })
    }
}

export default connect(mapStateToProps, playerActions)(FilteredPlayerList);
