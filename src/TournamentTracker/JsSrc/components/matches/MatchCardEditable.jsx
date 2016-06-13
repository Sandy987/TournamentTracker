import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import * as matchActions from '../../actions/match_actions';
import {reduxForm} from 'redux-form';

const submit = (values, dispatch) =>{
    return new Promise((resolve, reject) => {
        dispatch(matchActions.initiateMatchScoreUpdate(
            values.matchId,
            values.playerOneId,
            values.playerOneScore,
            values.playerTwoId,
            values.playerTwoScore
        ));
        resolve();
    });
};

const MatchCardEditable = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        const { fields: {matchId, playerOneId, playerOneScore, playerTwoId, playerTwoScore}, handleSubmit, submitting} = this.props;
        return  <Paper className="tt-match-summary" >
                    <form onSubmit={handleSubmit(submit)}>
                        <input type="hidden" {...matchId}></input>
                        <div>
                            <input type="hidden" {...playerOneId}></input>
                            <label>{this.props.PlayerOneName}</label>
                            <TextField hintText="Score" {...playerOneScore} />
                        </div>
                        <div>
                            <input type="hidden" {...playerTwoId}></input>
                            <label>{this.props.PlayerTwoName}</label>
                            <TextField hintText="Score" {...playerTwoScore} />
                        </div>
                        <div className="match-status">
                            {this.props.MatchStatus}
                        </div>
                        <div className="match-completion">
                            {this.props.MatchCompletion}
                        </div>

                        <FlatButton onClick={handleSubmit(submit)} disabled={submitting}>Save</FlatButton>
                    </form>
                </Paper>;
    }
});


//Wire up the redux form
export default reduxForm({
    form: 'matchCardForm',
    fields: ['matchId', 'playerOneId', 'playerOneScore', 'playerTwoId', 'playerTwoScore']
})(MatchCardEditable);