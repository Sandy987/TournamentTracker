import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, ListItem} from 'material-ui/List';
import {connect} from 'react-redux';

const NotificationList = React.createClass({
    mixins: [PureRenderMixin],
    getListItem: function(notification){
        const {from, message, status} = notification;
        return <div className={status}>
                    <span className="notification-from">{from}</span>
                    <span className="notification-message">{message}</span>
                </div>
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