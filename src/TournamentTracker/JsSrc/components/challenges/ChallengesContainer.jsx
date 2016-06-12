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
                <RaisedButton label="Refresh Challenges" onTouchTap={(e) => this.props.initiateLoadChallenges()} />
            </Paper>
            <ChallengeMatchList 
                challenges={this.props.challenges}/>
        </Paper>;
    }
});

function mapStateToProps(state){
    if (state.challenges.challenges){
        const mappedChallenges = []; //TODO: do this mapping correctly
        return {
            isRetrievingChallenges: state.challenges.isRetrievingChallenges,
            challenges: mappedChallenges
        }
    } else{
        return {
            isRetrievingChallenges: state.challenges.isRetrievingChallenges,
            challenges: []
        }
    }
}


export default connect(mapStateToProps, challengeActions)(ChallengesContainer);
