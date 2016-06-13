import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MatchCardEditable from '../matches/MatchCardEditable';
import MatchCard from '../matches/MatchCard';

const ChallengeMatchCard = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        const challenge = this.props.challenge;
        const match = this.props.match;
        const cardTitle = `${challenge.SendingPlayerName} -> ${challenge.ReceivingPlayerName}`;
        const subTitle = `${challenge.SendingPlayerName}: ${challenge.SendingPlayerStatus} - ${challenge.ReceivingPlayerName}: ${challenge.ReceivingPlayerStatus}`;
        const acceptChallengeButton = <FlatButton label="Accept" onTouchTap={() => this.props.onAcceptClicked(challenge.Id)} />;
        const declineChallengeButton = <FlatButton label="Decline" onTouchTap={() => this.props.onDeclineClicked(challenge.Id)} />;
        const completeChallengeButton = <FlatButton label="Complete" onTouchTap={() => this.props.onCompleteClicked(challenge.Id)} />;

        var challengeStatus;
        if (this.props.activeUser.user.Id === challenge.SendingPlayerId){
            challengeStatus = challenge.SendingPlayerStatus;
        } else {
            challengeStatus = challenge.ReceivingPlayerStatus;
        }
 
        //TODO: Figure out what buttons we need to display based on challenge status
        var buttons = [];
        var isScoreEditable = false;
        switch (challengeStatus){
            case 0: //Pending?
            isScoreEditable = false;
            buttons = [acceptChallengeButton, declineChallengeButton];
            case 1: //Accepted
            isScoreEditable = true;
            buttons = [completeChallengeButton];
            case 2: //Completed
            isScoreEditable = false;
            buttons = [];
        }


        var cardText;
        if (match){
            var initialValues = { //We need to pass in 'initial values' to the form version
                matchId : match.Id,
                playerOneId : match.PlayerOneId,
                playerTwoId : match.PlayerTwoId,
                playerOneScore : match.PlayerOneScore,
                playerTwoScore : match.PlayerTwoScore
            };
            cardText = isScoreEditable 
                        ? <MatchCardEditable initialValues={initialValues} /> 
                        : <MatchCard {...match} />; 
        } else {
            cardText = "No Match Available";
        }
        

        
        

        return <Card key={this.props.challenge.Id} >
            <CardTitle title={cardTitle} subtitle={subTitle} actAsExpander={true} showExpandableButton={true} ></CardTitle>
            <CardText expandable={true}>{cardText}</CardText>
            <CardActions>{buttons}</CardActions>
        </Card>;
    }
});


export default ChallengeMatchCard;