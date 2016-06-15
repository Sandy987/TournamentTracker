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
    getListItem: function(player){
        
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
        var profileElement = <IconButton
                                        touch={true}
                                        tooltip="profile"
                                        tooltipPosition="bottom-left"
                                        onTouchTap={() => this.props.handlePlayerProfiled(player)}
                                    >
                                    <ActionFace />
                                </IconButton>;
        

        

        return <ListItem
          key={player.Id}
          leftIcon={profileElement}
          rightIconButton={challengeElement}
          primaryText={player.PlayerName}
          secondaryText={subText}
          secondaryTextLines={1}
        />

        /*jshint ignore:end */
    },
    /*jshint ignore:start */
    render: function(){
        return <List>
           {this.props.players.map((player) => this.getListItem(player))}
        </List>;
    }
    /*jshint ignore:end */
});


export default PlayerList;