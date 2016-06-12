import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, ListItem} from 'material-ui/List';
import {connect} from 'react-redux';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

const NotificationList = React.createClass({
    mixins: [PureRenderMixin],
    getListItem: function(notification){
        const {Id, Message, SendingPlayerName, Status} = notification;
        
        return <ListItem
        key={Id}
         primaryText={SendingPlayerName}
          secondaryText={
            <p>
              <span style={{color: darkBlack}}> {Message}</span>
             
            </p>
          }
          secondaryTextLines={2}

        />
    },
    render: function(){
        return <List>
           {this.props.notifications.map((notification) => this.getListItem(notification))}
        </List>;
    }
});

function mapStateToProps(state){
    return {
        notifications: state.notifications.notifications
    }
}

export default connect(mapStateToProps)(NotificationList);