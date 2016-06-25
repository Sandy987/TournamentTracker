import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionFace from 'material-ui/svg-icons/action/face';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const PlayerList = React.createClass({
    mixins: [PureRenderMixin],
    getListItem: function(player, index){
        
        var subText = `${player.PlayerElo} - Wins: ${player.PlayerWins} - Losses: ${player.PlayerLoses}`;
        
        /*jshint ignore:start */
        
        var challengeElement = <IconButton
                                        touch={true}
                                        tooltip="challenge"
                                        tooltipPosition="top-right"
                                        onTouchTap={() => this.props.handlePlayerChallenged(player)}
                                    >
                                    <ActionGrade />
                                </IconButton>;

        //Don't show challenge button for active player
        if (this.props.activePlayerId === player.Id){
            challengeElement = null;
        }

        var profileElement = <IconButton
                                        touch={true}
                                        tooltip="profile"
                                        tooltipPosition="bottom-left"
                                        onTouchTap={() => this.props.handlePlayerProfiled(player)}
                                    >
                                    <ActionFace />
                                </IconButton>;
        

        
        var playerPrimaryText = `${index + 1} - ${player.PlayerName} ${this.props.activePlayerId === player.Id ? ' (Me)' : ''}`;
        return <ListItem
          key={player.Id}
          leftIcon={profileElement}
          rightIconButton={challengeElement}
          primaryText={playerPrimaryText}
          secondaryText={subText}
          secondaryTextLines={1}
        />

        /*jshint ignore:end */
    },
    /*jshint ignore:start */
    render: function(){
        return <List className="player-list">
           {this.props.players.map((player, index) => this.getListItem(player, index))}
        </List>;
    }
    /*jshint ignore:end */
});


export default PlayerList;