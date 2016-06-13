import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {connect} from 'react-redux';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';

const NotificationList = React.createClass({
    mixins: [PureRenderMixin],
    getListItem: function(notification){
        const {Id, Message, SendingPlayerName, Status, Subject, HasOptions} = notification;
        var optionButtons = [];
        if(HasOptions){
            optionButtons = [<FlatButton label="Accept" /> , <FlatButton label="Decline" />]
        }
        var status = Status ? Status : "";

        return <ListItem 
                key={Id}
                classname={status}>
                    <Card>
                        <CardHeader
                            title={SendingPlayerName}
                            subtitle={Subject}
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            {Message}
                        </CardText>
                        <CardActions expandable={true}>
                        {optionButtons}
                        </CardActions>
                    </Card>
                </ListItem>
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