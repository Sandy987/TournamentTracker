import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as challengeActions from '../actions';
import ChallengeMatchList from './ChallengeMatchList';
import {push} from 'react-router-redux';
import {getActiveUser} from '../../activeUser/selectors';

const ChallengesContainer = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        if (this.props.isRetrievingChallenges)
        {
           return <div className="loading"></div>;
        }
        return <Paper zDepth={1}>
            <Paper zDepth={2}>
                <RaisedButton label="Refresh Challenges" onTouchTap={(e) => this.props.initiateLoadChallenges(this.props.activePlayerId)} />
            </Paper>
            <ChallengeMatchList 
                challengeMatches={this.props.challengeMatches}
                activePlayerId={this.props.activePlayerId}
                onAcceptChallenge={(x) => this.props.initiateAcceptChallenge(x, this.props.activePlayerId)}
                onDeclineChallenge={(x) => this.props.initiateDeclineChallenge(x, this.props.activePlayerId)}
                onCompleteChallenge={(x) => this.props.initiateCompleteChallenge(x, this.props.activePlayerId)} />
        </Paper>;
    }
});

function mapStateToProps(state){
    if (state.challenges.challenges){
        const mappedChallenges = state.challenges.challenges.map((c) => {
            var match = state.matches.matches.find((x) => x.Id === c.MatchId);
            return {
                challenge: c,
                match: match
            }
        }); //TODO: do this mapping correctly
        return {
            isRetrievingChallenges: state.challenges.isRetrievingChallenges,
            challengeMatches: mappedChallenges,
            activePlayerId: getActiveUser(state).Id
        }
    } else{
        return {
            isRetrievingChallenges: state.challenges.isRetrievingChallenges,
            challengeMatches: [],
            activePlayerId: getActiveUser(state).Id
        }
    }
}


export default connect(mapStateToProps, challengeActions)(ChallengesContainer);
