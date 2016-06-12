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
        const match = challenge.match;
        const cardTitle = `${challenge.SendingPlayerName} -> ${challenge.ReceivingPlayerName}`;
        const subTitle = `${challenge.SendingPlayerName}: ${challenge.SendingPlayerStatus} - ${challenge.ReceivingPlayerName}: ${challenge.ReceivingPlayerStatus}`;

        var cardText;
        if (match){
            const isScoreEditable = false; //TODO figure out when score should be editable
            var initialValues = { //We need to pass in 'initial values' to the form version
                matchId : match.Id,
                playerOneId : match.PlayerOneId,
                playerTwoId : match.PlayerTwoId,
                playerOneScore : match.PlayerOneScore,
                playerTwoScore : match.PlayerTwoScore
            };
            cardText = isScoreEditable 
                        ? <MatchCardEditable initialValues={initialValues} onScoreUpdate={() => console.log(match)} /> 
                        : <MatchCard {...match} />; 
        } else {
            cardText = "No Match Available";
        }

        const acceptChallengeButton = <FlatButton label="Accept" onTouchTap={() => console.log(challenge)} />;
        const declineChallengeButton = <FlatButton label="Decline" onTouchTap={() => console.log(challenge)} />;
        const completeChallengeButton = <FlatButton label="Complete" onTouchTap={() => console.log(challenge)} />;

        //TODO: Figure out what buttons we need to display based on challenge status
        const buttons = [acceptChallengeButton, declineChallengeButton, completeChallengeButton];

        return <Card>
            <CardTitle title={cardTitle} subtitle={subTitle} actAsExpander={true} showExpandableButton={true} ></CardTitle>
            <CardText expandable={true}>{cardText}</CardText>
            <CardActions></CardActions>
        </Card>;
    }
});


export default ChallengeMatchCard;