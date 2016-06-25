import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {connect} from 'react-redux';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import {initiateAcceptChallenge, initiateDeclineChallenge} from '../../challenge/actions';

const NotificationList = React.createClass({
    onOptionClick: function(e, option, challengeId) {
        if(option === "accept")
            this.props.dispatch(initiateAcceptChallenge(challengeId, this.props.activePlayerId));
        else
             this.props.dispatch(initiateDeclineChallenge(challengeId, this.props.activePlayerId));
    },
    mixins: [PureRenderMixin],
    getListItem: function(notification){
        const {Id, Message, SendingPlayerName, Status, Subject, HasOptions, ChallengeId, Timestamp} = notification;
        var optionButtons = [];
        if(HasOptions){
            optionButtons = [
                <FlatButton label="Accept" onTouchTap={(e) => this.onOptionClick(e, "accept", ChallengeId)}/> , 
                <FlatButton label="Decline" onTouchTap={(e) => this.onOptionClick(e, "decline", ChallengeId)}/>]
        }
        var status = Status ? Status : "";

        return <ListItem 
                key={Id}
                classname={status}>
                    <Card>
                        <CardHeader
                            title={`${Subject}`}
                            subtitle={`${SendingPlayerName} -- ${new Date(Timestamp).toUTCString()}`}
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
    var notificationsSorted = state.notifications.notifications.slice();
    notificationsSorted.sort(function(a, b) 
    {
        return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    return {
        notifications: notificationsSorted,
        activePlayerId: state.activeUser.user.Id
    }
}

export default connect(mapStateToProps)(NotificationList);