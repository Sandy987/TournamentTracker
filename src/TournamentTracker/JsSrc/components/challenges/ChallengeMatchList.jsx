import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ChallengeMatchCard from './ChallengeMatchCard';

//Challenges are assumed to have a match property containing the linked match

const ChallengeMatchList = React.createClass({
    mixins: [PureRenderMixin],
    getListItem: function(challengeMatch){
        return <ChallengeMatchCard 
                    key={challengeMatch.challenge.Id} 
                    challenge={challengeMatch.challenge} 
                    match={challengeMatch.match} 
                    activePlayerId={this.props.activePlayerId}
                    onAcceptClicked={(x) => this.props.onAcceptChallenge(x)}
                    onDeclineClicked={(x) => this.props.onDeclineChallenge(x)}
                    onCompleteClicked={(x) => this.props.onCompleteChallenge(x)} />
    },
    render: function(){
        return <div>
           {this.props.challengeMatches.map((challengeMatches) => this.getListItem(challengeMatches))}
        </div>;
    }
});


export default ChallengeMatchList;