import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as challengeActions from '../../actions/challenge_actions';
import ChallengeMatchList from './ChallengeMatchList';
import {push} from 'react-router-redux';

const ChallengesContainer = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        if (this.props.isRetrievingChallenges)
            return <div>Loading Spinner</div>;
        
        return <Paper zDepth={1}>
            <Paper zDepth={2}>
                <RaisedButton label="Refresh Challenges" onTouchTap={(e) => this.props.initiateLoadChallenges(this.props.activePlayerId)} />
            </Paper>
            <ChallengeMatchList 
                challengeMatches={this.props.challengeMatches}
                onAcceptChallenge={(x) => this.props.initiateAcceptChallenge(x)}
                onDeclineChallenge={(x) => this.props.initiateDeclineChallenge(x)}
                onCompleteChallenge={(x) => this.props.initiateCompleteChallenge(x)}/>
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
            activePlayerId: state.activeUser.user.Id
        }
    } else{
        return {
            isRetrievingChallenges: state.challenges.isRetrievingChallenges,
            challengeMatches: [],
            activePlayerId: state.activeUser.user.Id
        }
    }
}


export default connect(mapStateToProps, challengeActions)(ChallengesContainer);
