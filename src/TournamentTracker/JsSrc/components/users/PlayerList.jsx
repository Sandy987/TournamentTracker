import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, ListItem} from 'material-ui/List';
import {red500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const PlayerList = React.createClass({
    mixins: [PureRenderMixin],
    getListItem: function(player){
        
        var iconButtonElement = <IconButton
                                        touch={true}
                                        tooltip="challenge"
                                        tooltipPosition="bottom-left"
                                        onTouchTap={() => this.props.handlePlayerTouched(player)}
                                    >
                                    <MoreVertIcon color={red500} />
                                </IconButton>

        return <ListItem
          key={player.id}
          rightIconButton={iconButtonElement}
          primaryText={player.playerName}
          secondaryText={player.playerRank}
          secondaryTextLines={1}
        />
    },
    render: function(){
        return <List>
           {this.props.players.map((player) => this.getListItem(player))}
        </List>;
    }
});


export default PlayerList;