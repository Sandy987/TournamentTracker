import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MatchCardEditable from '../matches/MatchCardEditable';
import MatchCard from '../matches/MatchCard';
import * as ChallengeStatus from '../../constants/ChallengeStatus';

const ChallengeMatchCard = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        const challenge = this.props.challenge;
        const match = this.props.match;
        const cardTitle = `${challenge.SendingPlayerName} -> ${challenge.ReceivingPlayerName}`;
        const subTitle = `${challenge.SendingPlayerName}: ${ChallengeStatus.getNameFromStatus(challenge.SendingPlayerStatus)} - ${challenge.ReceivingPlayerName}: ${ChallengeStatus.getNameFromStatus(challenge.ReceivingPlayerStatus)}`;
        const acceptChallengeButton = <FlatButton label="Accept Challenge" onTouchTap={() => this.props.onAcceptClicked(challenge.Id)} />;
        const declineChallengeButton = <FlatButton label="Decline Challenge" onTouchTap={() => this.props.onDeclineClicked(challenge.Id)} />;
        const completeChallengeButton = <FlatButton label="Finalise" onTouchTap={() => this.props.onCompleteClicked(challenge.Id)} />;

        var challengeStatus;
        if (this.props.activePlayerId=== challenge.SendingPlayerId){
            challengeStatus = challenge.SendingPlayerStatus;
        } else {
            challengeStatus = challenge.ReceivingPlayerStatus;
        }
 
        var buttons = [];
        var isScoreEditable = false;
        switch (challengeStatus){
            case ChallengeStatus.PENDING:
            isScoreEditable = false;
            buttons = [acceptChallengeButton, declineChallengeButton];
            break;
            case ChallengeStatus.ACCEPTED:
            isScoreEditable = true;
            buttons = [completeChallengeButton];
            break;
            case ChallengeStatus.DECLINED:
            isScoreEditable = false;
            buttons = [];
            break;
            case ChallengeStatus.COMPLETED:
            isScoreEditable = false;
            buttons = [];
            break;
            default:
            isScoreEditable = false,
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
                        ? <MatchCardEditable initialValues={initialValues} {...match}/> 
                        : <MatchCard {...match} />; 
        } else {
            cardText = "Waiting for other player to accept";
        }
    

        return <Card>
            <CardTitle title={cardTitle} subtitle={subTitle} actAsExpander={true} showExpandableButton={true} ></CardTitle>
            <CardText expandable={true}>{cardText}</CardText>
            <CardActions>{buttons}</CardActions>
        </Card>;
    }
});


export default ChallengeMatchCard;