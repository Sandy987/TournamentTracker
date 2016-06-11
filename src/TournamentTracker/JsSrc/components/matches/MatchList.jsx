import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Paper from 'material-ui/Paper';
import MatchCard from './MatchCard';

const MatchList = React.createClass({
    mixins: [PureRenderMixin],
    getMatchCard: function(match){
        return <MatchCard 
            key={match.id}
            {...match}
        />;
    },
    render: function(){
        return <Paper zDepth={1}>
            {this.props.matches.map((m) => this.getMatchCard(m))}
        </Paper>;
    }
});


export default MatchList;