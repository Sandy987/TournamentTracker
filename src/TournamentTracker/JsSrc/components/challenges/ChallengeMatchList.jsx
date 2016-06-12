import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ChallengeMatchCard from './ChallengeMatchCard';

//Challenges are assumed to have a match property containing the linked match

const ChallengeMatchList = React.createClass({
    mixins: [PureRenderMixin],
    getListItem: function(challenge){
        return <ChallengeMatchCard key={challenge.Id} challenge={challenge} activeUser={this.props.activeUser} />
    },
    render: function(){
        return <div>
           {this.props.challenges.map((challenge) => this.getListItem(challenge))}
        </div>;
    }
});


export default ChallengeMatchList;