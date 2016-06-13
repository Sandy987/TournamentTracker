import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {connect} from 'react-redux';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import {initiateAcceptChallenge} from '../../actions/challenge_actions';
import {initiateDeclineChallenge} from '../../actions/challenge_actions';

const NotificationList = React.createClass({
    onOptionClick: function(e, option, challengeId) {
        if(option === "accept")
            this.props.dispatch(initiateAcceptChallenge(challengeId));
        else
             this.props.dispatch(initiateDeclineChallenge(challengeId));
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
                            title={`${SendingPlayerName} -- ${Timestamp}`}
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
    var notificationsSorted = state.notifications.notifications.slice();
    notificationsSorted.sort(function(a, b) {return a.Timestamp - b.Timestamp});

    return {
        notifications: notificationsSorted
    }
}

export default connect(mapStateToProps)(NotificationList);